// Vercel API Service
// Allows Aureon to manage environment variables in production
const VERCEL_API_BASE = 'https://api.vercel.com';
class VercelService {
    constructor() {
        this.token = import.meta.env.VITE_VERCEL_TOKEN;
        this.projectId = import.meta.env.VITE_VERCEL_PROJECT_ID;
    }
    get isConfigured() {
        return !!(this.token && this.projectId);
    }
    async fetch(endpoint, options = {}) {
        if (!this.token)
            throw new Error('Vercel token not configured');
        const response = await fetch(`${VERCEL_API_BASE}${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Vercel API error');
        }
        return response.json();
    }
    /**
     * List all environment variables for the project
     */
    async listEnvVars() {
        const data = await this.fetch(`/v10/projects/${this.projectId}/env`);
        return data.envs;
    }
    /**
     * Get a specific environment variable by key
     */
    async getEnvVar(key) {
        const envs = await this.listEnvVars();
        return envs.find(e => e.key === key) || null;
    }
    /**
     * Create a new environment variable
     */
    async createEnvVar(key, value, targets = ['production', 'preview', 'development'], type = 'encrypted') {
        return this.fetch(`/v10/projects/${this.projectId}/env`, {
            method: 'POST',
            body: JSON.stringify({ key, value, target: targets, type }),
        });
    }
    /**
     * Update an existing environment variable
     */
    async updateEnvVar(envId, value, targets) {
        const body = { value };
        if (targets)
            body.target = targets;
        return this.fetch(`/v10/projects/${this.projectId}/env/${envId}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }
    /**
     * Delete an environment variable
     */
    async deleteEnvVar(envId) {
        await this.fetch(`/v10/projects/${this.projectId}/env/${envId}`, { method: 'DELETE' });
    }
    /**
     * Upsert (create or update) an environment variable
     */
    async upsertEnvVar(key, value, targets = ['production', 'preview', 'development']) {
        const existing = await this.getEnvVar(key);
        if (existing?.id) {
            const updated = await this.updateEnvVar(existing.id, value, targets);
            return { created: false, env: updated };
        }
        else {
            const created = await this.createEnvVar(key, value, targets);
            return { created: true, env: created };
        }
    }
    /**
     * Trigger a new deployment (to apply env var changes)
     */
    async triggerRedeploy() {
        const response = await this.fetch(`/v13/deployments`, {
            method: 'POST',
            body: JSON.stringify({
                name: 'portality',
                project: this.projectId,
                target: 'production',
            }),
        });
        return response;
    }
}
export const vercelService = new VercelService();
