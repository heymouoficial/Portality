import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from 'react';
import { Sun, Moon, Monitor, X, Shield, Key, Copy, Plus, Building2, Eye, EyeOff, Database, Brain, Plug, BarChart, Check, AlertCircle, Loader2, Lock } from 'lucide-react';
import { API_KEYS_CONFIG, getAPIKeyValues, maskAPIKey, API_KEY_CATEGORIES } from '../config/apiKeys';
import { getCurrentBrand } from '../config/branding';
import { supabase } from '../lib/supabase';
import MemberInviteModal from './MemberInviteModal';
export const SettingsPanel = ({ isOpen, onClose, currentTheme, onThemeChange, currentProfileId, onProfileChange, currentOrgId }) => {
    const brand = getCurrentBrand();
    const [activeTab, setActiveTab] = useState('general');
    const [visibleKeys, setVisibleKeys] = useState(new Set());
    const [copiedKey, setCopiedKey] = useState(null);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    // Real Data State
    const [teamMembers, setTeamMembers] = useState([]);
    const [loadingTeam, setLoadingTeam] = useState(false);
    // Password Update State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState(null);
    const apiKeyValues = useMemo(() => getAPIKeyValues(), []);
    // Fetch Team when tab is active
    useEffect(() => {
        if (activeTab === 'organization' && isOpen) {
            fetchTeam();
        }
    }, [activeTab, isOpen, currentOrgId]);
    const fetchTeam = async () => {
        setLoadingTeam(true);
        try {
            // Query PROFILES table directly based on organization_id
            const { data, error } = await supabase
                .from('profiles')
                .select('id, email, full_name, role, avatar_url, created_at')
                .eq('organization_id', currentOrgId);
            if (error) {
                console.error('Error fetching team:', error);
                setTeamMembers([]);
            }
            else if (data) {
                const formatted = data.map((p) => ({
                    id: p.id,
                    email: p.email || 'N/A',
                    role: p.role || 'Member',
                    status: 'active', // All profiles with org_id are considered active members
                    joined_at: p.created_at,
                    profile: {
                        name: p.full_name || p.email?.split('@')[0] || 'Usuario',
                        avatar_url: p.avatar_url
                    }
                }));
                setTeamMembers(formatted);
            }
        }
        catch (err) {
            console.error('Fetch team exception:', err);
        }
        finally {
            setLoadingTeam(false);
        }
    };
    const toggleKeyVisibility = (keyId) => {
        setVisibleKeys(prev => {
            const next = new Set(prev);
            if (next.has(keyId)) {
                next.delete(keyId);
            }
            else {
                next.add(keyId);
            }
            return next;
        });
    };
    const copyToClipboard = async (keyId, value) => {
        await navigator.clipboard.writeText(value);
        setCopiedKey(keyId);
        setTimeout(() => setCopiedKey(null), 2000);
    };
    const handleUpdatePassword = async () => {
        if (!newPassword) {
            setPasswordMessage({ type: 'error', text: 'Ingresa una contraseña' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
            return;
        }
        if (newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'Mínimo 6 caracteres' });
            return;
        }
        setLoadingPassword(true);
        setPasswordMessage(null);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error)
                throw error;
            setPasswordMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
            setNewPassword('');
            setConfirmPassword('');
        }
        catch (err) {
            console.error('Password update error:', err);
            setPasswordMessage({ type: 'error', text: err.message || 'Error al actualizar' });
        }
        finally {
            setLoadingPassword(false);
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'core': return _jsx(Database, { size: 14 });
            case 'ai': return _jsx(Brain, { size: 14 });
            case 'integration': return _jsx(Plug, { size: 14 });
            case 'analytics': return _jsx(BarChart, { size: 14 });
            default: return _jsx(Key, { size: 14 });
        }
    };
    // Group keys by category
    const keysByCategory = useMemo(() => {
        return API_KEYS_CONFIG.reduce((acc, key) => {
            if (!acc[key.category])
                acc[key.category] = [];
            acc[key.category].push(key);
            return acc;
        }, {});
    }, []);
    const getInitials = (name) => name.substring(0, 2).toUpperCase();
    return (_jsxs(_Fragment, { children: [_jsx("div", { onClick: onClose, className: `fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 backdrop-blur-sm ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}` }), _jsxs("div", { className: `fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-white/10 rounded-t-[30px] z-[70] transition-transform duration-300 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] h-[85vh] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`, children: [_jsx("div", { className: "w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" }), _jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h3", { className: "text-xl font-bold text-white flex items-center gap-2", children: [_jsx(Shield, { size: 20, style: { color: brand.colors.primary } }), "Configuraci\u00F3n Aureon"] }), _jsx("button", { onClick: onClose, className: "p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "flex p-1 bg-white/5 rounded-xl border border-white/10 mb-8", children: [_jsxs("button", { onClick: () => setActiveTab('general'), className: `flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-center gap-2 ${activeTab === 'general' ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`, children: [_jsx(Monitor, { size: 16 }), "General"] }), _jsxs("button", { onClick: () => setActiveTab('organization'), className: `flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-center gap-2 ${activeTab === 'organization' ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`, children: [_jsx(Building2, { size: 16 }), "Equipo"] }), _jsxs("button", { onClick: () => setActiveTab('apikeys'), className: `flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-center gap-2 ${activeTab === 'apikeys' ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`, children: [_jsx(Key, { size: 16 }), "API Keys"] })] }), _jsxs("div", { className: "overflow-y-auto h-[calc(100%-180px)] pr-2 space-y-8", children: [activeTab === 'general' && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("span", { className: "text-xs font-bold text-gray-500 mb-3 block uppercase tracking-wider", children: "Apariencia" }), _jsx("div", { className: "flex p-1 bg-black rounded-xl border border-white/10", children: ['light', 'dark', 'system'].map((mode) => (_jsxs("button", { onClick: () => onThemeChange(mode), className: `flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-center gap-2 ${currentTheme === mode ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:bg-white/5'}`, children: [mode === 'light' && _jsx(Sun, { size: 16 }), mode === 'dark' && _jsx(Moon, { size: 16 }), mode === 'system' && _jsx(Monitor, { size: 16 }), mode.charAt(0).toUpperCase() + mode.slice(1)] }, mode))) })] }), _jsxs("div", { className: "pt-6 border-t border-white/5", children: [_jsx("span", { className: "text-xs font-bold text-gray-500 mb-3 block uppercase tracking-wider", children: "Seguridad" }), _jsxs("div", { className: "p-4 rounded-xl bg-white/5 border border-white/5 space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3 mb-2", children: [_jsx("div", { className: "p-2 bg-indigo-500/10 rounded-lg text-indigo-400", children: _jsx(Lock, { size: 18 }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-bold text-white", children: "Contrase\u00F1a" }), _jsx("p", { className: "text-xs text-gray-500", children: "Establece o actualiza tu contrase\u00F1a de acceso." })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { children: _jsx("input", { type: "password", placeholder: "Nueva contrase\u00F1a", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors" }) }), _jsx("div", { children: _jsx("input", { type: "password", placeholder: "Confirmar contrase\u00F1a", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors" }) }), passwordMessage && (_jsx("div", { className: `text-xs px-3 py-2 rounded-lg ${passwordMessage.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`, children: passwordMessage.text })), _jsxs("button", { onClick: handleUpdatePassword, disabled: loadingPassword || !newPassword, className: "w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-colors flex justify-center items-center gap-2", children: [loadingPassword && _jsx(Loader2, { size: 14, className: "animate-spin" }), "Actualizar Contrase\u00F1a"] })] })] })] })] })), activeTab === 'organization' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center border", style: { backgroundColor: `${brand.colors.primary}20`, borderColor: `${brand.colors.primary}30`, color: brand.colors.primary }, children: _jsx(Building2, { size: 24 }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-bold text-white", children: brand.name }), _jsx("span", { className: "text-xs font-medium px-2 py-0.5 rounded-full border", style: { backgroundColor: `${brand.colors.primary}10`, color: brand.colors.primary, borderColor: `${brand.colors.primary}20` }, children: "PRO PLAN" })] })] }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider", children: "Miembros" }), _jsxs("button", { onClick: () => setIsInviteModalOpen(true), className: "text-xs flex items-center gap-1 transition-colors hover:text-white", style: { color: brand.colors.primary }, children: [_jsx(Plus, { size: 14 }), " Invitar"] })] }), _jsx("div", { className: "space-y-2", children: loadingTeam ? (_jsx("div", { className: "flex justify-center p-4", children: _jsx(Loader2, { size: 20, className: "animate-spin text-gray-500" }) })) : teamMembers.length === 0 ? (_jsx("div", { className: "text-center p-6 border border-dashed border-white/10 rounded-xl text-gray-500 text-xs", children: "No hay miembros en este equipo a\u00FAn." })) : (teamMembers.map((member) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold text-white border border-white/10 overflow-hidden", children: member.profile?.avatar_url ? (_jsx("img", { src: member.profile.avatar_url, alt: member.profile.name, className: "w-full h-full object-cover" })) : (getInitials(member.profile?.name || 'User')) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-white", children: member.profile?.name }), _jsxs("p", { className: "text-[10px] text-gray-500", children: [member.email, " \u2022 ", member.role] })] })] }), _jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${member.status === 'active'
                                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                                : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`, children: member.status === 'active' ? 'Activo' : 'Invitado' })] }, member.id)))) })] })] })), activeTab === 'apikeys' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3", children: [_jsx(AlertCircle, { size: 18, className: "text-amber-500 shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-amber-200 font-medium", children: "Secure Enclave" }), _jsx("p", { className: "text-xs text-amber-400/70 mt-1", children: "Las claves sensibles est\u00E1n enmascaradas. Usa el icono \uD83D\uDC41 para revelar temporalmente. En producci\u00F3n, Aureon puede actualizar estas claves v\u00EDa Vercel API." })] })] }), Object.entries(keysByCategory).map(([category, keys]) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("span", { style: { color: brand.colors.primary }, children: getCategoryIcon(category) }), _jsx("span", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider", children: API_KEY_CATEGORIES[category]?.label || category })] }), _jsx("div", { className: "space-y-2", children: keys.map((keyConfig) => {
                                                    const value = apiKeyValues[keyConfig.id];
                                                    const isVisible = visibleKeys.has(keyConfig.id);
                                                    const isCopied = copiedKey === keyConfig.id;
                                                    const hasValue = !!value;
                                                    return (_jsxs("div", { className: "p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Key, { size: 14, className: "text-gray-500" }), _jsx("span", { className: "text-sm font-medium text-white", children: keyConfig.name }), keyConfig.required && !hasValue && (_jsx("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400", children: "FALTA" }))] }), _jsx("div", { className: "flex items-center gap-1", children: hasValue && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => toggleKeyVisibility(keyConfig.id), className: "p-1.5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors", title: isVisible ? 'Ocultar' : 'Mostrar', children: isVisible ? _jsx(EyeOff, { size: 14 }) : _jsx(Eye, { size: 14 }) }), _jsx("button", { onClick: () => copyToClipboard(keyConfig.id, value), className: "p-1.5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors", title: "Copiar", children: isCopied ? _jsx(Check, { size: 14, className: "text-green-500" }) : _jsx(Copy, { size: 14 }) })] })) })] }), _jsx("div", { className: "h-8 bg-black/40 rounded-lg flex items-center px-3 font-mono text-xs", children: hasValue ? (_jsx("span", { className: isVisible ? 'text-white' : 'text-gray-500', children: isVisible ? value : maskAPIKey(value) })) : (_jsx("span", { className: "text-gray-600 italic", children: "No configurada" })) }), _jsx("p", { className: "text-[10px] text-gray-600 mt-1.5", children: keyConfig.description })] }, keyConfig.id));
                                                }) })] }, category))), _jsxs("div", { className: "p-4 rounded-xl border border-dashed border-white/10 bg-black/40 text-center", children: [_jsx(Shield, { size: 24, className: "mx-auto mb-2 text-gray-600" }), _jsx("p", { className: "text-xs text-gray-500", children: "Para modificar claves en producci\u00F3n, Aureon usar\u00E1 la Vercel API." })] })] }))] })] }), _jsx(MemberInviteModal, { isOpen: isInviteModalOpen, onClose: () => setIsInviteModalOpen(false), organizationId: currentOrgId })] }));
};
