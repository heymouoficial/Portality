import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { FileText, Upload, Search, CheckCircle2, Database, Eye, X, ChevronRight, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCurrentBrand } from '../config/branding';
import { ragService } from '../services/ragService';
const RAGView = ({ organizationId }) => {
    const brand = getCurrentBrand();
    const [searchQuery, setSearchQuery] = useState('');
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const isMounted = React.useRef(true);
    const [uploadStatus, setUploadStatus] = useState('');
    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);
    // Fetch documents from Supabase (NEW TABLE)
    useEffect(() => {
        fetchDocuments();
    }, [organizationId]); // Refetch when org changes
    const fetchDocuments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Safety timeout wrapper
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));
            // Fetch with timeout
            const sources = await Promise.race([
                ragService.getSources().catch(e => {
                    console.warn('RAG service failed, using memory fallback:', e);
                    return [];
                }),
                timeoutPromise
            ]);
            if (!isMounted.current)
                return;
            const mapped = sources.map(s => ({
                id: parseInt(s.id) || Date.now() + Math.random(),
                source: s.name,
                content: s.content || '',
                tenant_id: organizationId || 'default',
                meta: s.metadata || { category: 'general' },
                created_at: s.lastSynced instanceof Date ? s.lastSynced.toISOString() : (s.lastSynced || new Date().toISOString()),
                updated_at: s.lastSynced instanceof Date ? s.lastSynced.toISOString() : (s.lastSynced || new Date().toISOString())
            }));
            setDocuments(mapped);
        }
        catch (err) {
            console.error('[RAG] Fatal Error:', err);
            if (isMounted.current)
                setError(err.message || 'Error loading documents');
            if (isMounted.current)
                setDocuments([]);
        }
        finally {
            if (isMounted.current)
                setIsLoading(false);
        }
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setUploadStatus('Iniciando carga...');
        try {
            // Import dynamically since ragService depends on geminiService
            const { ragService } = await import('../services/ragService');
            await ragService.ingestFile(file, organizationId, (status) => {
                setUploadStatus(status);
            });
            setUploadStatus('✅ Completado');
            setTimeout(() => setUploadStatus(''), 3000);
            fetchDocuments(); // Refresh list
        }
        catch (err) {
            console.error(err);
            setUploadStatus('❌ Error en vectorización');
        }
    };
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchDocuments();
        setIsRefreshing(false);
    };
    const filteredDocs = documents.filter(d => d.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.content.toLowerCase().includes(searchQuery.toLowerCase()));
    const getCategoryColor = (category) => {
        switch (category) {
            case 'identity': return brand.colors.primary;
            case 'branding': return brand.colors.accent;
            case 'system': return brand.colors.success;
            default: return '#6B7280';
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'identity': return _jsx(Sparkles, { size: 14 });
            case 'branding': return _jsx(BookOpen, { size: 14 });
            case 'system': return _jsx(Database, { size: 14 });
            default: return _jsx(FileText, { size: 14 });
        }
    };
    return (_jsxs("div", { className: "p-6 md:p-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-white tracking-tight flex items-center gap-2", children: [_jsx(Database, { size: 24, style: { color: brand.colors.primary } }), "Base de Conocimiento (RAG)"] }), _jsxs("p", { className: "text-sm text-gray-500", children: [organizationId ? `Organización: ${organizationId}` : 'Selecciona una organización', " \u2022 Vectorizaci\u00F3n Activa (Gemini)"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("label", { className: "cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center gap-2 text-sm font-medium text-white transition-all", children: [_jsx(Upload, { size: 16 }), "Subir Documento", _jsx("input", { type: "file", className: "hidden", onChange: handleFileUpload, accept: ".md,.txt,.json" })] }), _jsx("button", { onClick: handleRefresh, disabled: isRefreshing, className: "px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50", children: _jsx(RefreshCw, { size: 16, className: isRefreshing ? 'animate-spin' : '' }) })] })] }), uploadStatus && (_jsxs("div", { className: "mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-3", children: [_jsx(Sparkles, { size: 16, className: "text-blue-400 animate-pulse" }), _jsx("span", { className: "text-sm text-blue-200 font-mono", children: uploadStatus })] })), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "p-4 bg-white/[0.02] border border-white/5 rounded-xl", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Database, { size: 18, style: { color: brand.colors.primary } }), _jsx("span", { className: "text-xl font-bold text-white", children: documents.length })] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Documentos" })] }), _jsxs("div", { className: "p-4 bg-white/[0.02] border border-white/5 rounded-xl", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CheckCircle2, { size: 18, style: { color: brand.colors.success } }), _jsx("span", { className: "text-xl font-bold text-white", children: documents.filter(d => d.meta?.category === 'identity').length })] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Identidad" })] }), _jsxs("div", { className: "p-4 bg-white/[0.02] border border-white/5 rounded-xl", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Sparkles, { size: 18, style: { color: brand.colors.accent } }), _jsx("span", { className: "text-xl font-bold text-white", children: documents.filter(d => d.meta?.category === 'system').length })] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Sistemas" })] })] }), _jsxs("div", { className: "relative mb-4", children: [_jsx(Search, { size: 16, className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Buscar en el conocimiento...", className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-white/20 text-white placeholder-gray-500" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx("div", { className: "bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden", children: isLoading ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx(RefreshCw, { size: 24, className: "mx-auto mb-3 text-gray-600 animate-spin" }), _jsx("p", { className: "text-sm text-gray-500", children: "Cargando documentos..." })] })) : error ? (_jsxs("div", { className: "p-12 text-center text-red-400", children: [_jsx(Database, { size: 40, className: "mx-auto mb-4 opacity-50" }), _jsx("p", { className: "text-sm font-medium mb-2", children: "Error de Conexi\u00F3n" }), _jsx("p", { className: "text-xs opacity-70", children: error }), _jsx("button", { onClick: fetchDocuments, className: "mt-4 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs", children: "Reintentar" })] })) : filteredDocs.length > 0 ? (filteredDocs.map((doc) => (_jsxs("div", { onClick: () => setSelectedDoc(doc), className: `flex items-center gap-4 p-4 cursor-pointer transition-all border-b border-white/5 last:border-0 ${selectedDoc?.id === doc.id
                                ? 'bg-white/[0.05]'
                                : 'hover:bg-white/[0.02]'}`, children: [_jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0", style: {
                                        backgroundColor: `${getCategoryColor(doc.meta?.category)}20`,
                                        color: getCategoryColor(doc.meta?.category)
                                    }, children: getCategoryIcon(doc.meta?.category) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-white truncate", children: doc.source }), _jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [_jsx("span", { className: "text-[9px] font-bold uppercase px-1.5 py-0.5 rounded", style: {
                                                        backgroundColor: `${getCategoryColor(doc.meta?.category)}20`,
                                                        color: getCategoryColor(doc.meta?.category)
                                                    }, children: doc.meta?.category || 'general' }), _jsx("span", { className: "text-[9px] text-gray-600", children: new Date(doc.created_at).toLocaleDateString() })] })] }), _jsx(ChevronRight, { size: 16, className: "text-gray-600 shrink-0" })] }, doc.id)))) : (_jsxs("div", { className: "p-12 text-center text-gray-600", children: [_jsx(Database, { size: 40, className: "mx-auto mb-4 opacity-30" }), _jsx("p", { className: "text-sm font-medium mb-2", children: "Sin documentos" }), _jsx("p", { className: "text-xs", children: "La base de conocimiento est\u00E1 vac\u00EDa" })] })) }), _jsx("div", { className: "bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden", children: selectedDoc ? (_jsxs("div", { className: "h-full flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-white/5 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Eye, { size: 16, style: { color: brand.colors.primary } }), _jsx("span", { className: "text-sm font-medium text-white", children: selectedDoc.source })] }), _jsx("button", { onClick: () => setSelectedDoc(null), className: "p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all", children: _jsx(X, { size: 16 }) })] }), _jsx("div", { className: "flex-1 p-6 overflow-y-auto max-h-[60vh]", children: _jsx("div", { className: "prose prose-invert prose-sm max-w-none", children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], components: {
                                                h1: ({ children }) => _jsx("h1", { className: "text-xl font-bold text-white mb-4 border-b border-white/10 pb-2", children: children }),
                                                h2: ({ children }) => _jsx("h2", { className: "text-lg font-bold text-white mt-6 mb-3", children: children }),
                                                h3: ({ children }) => _jsx("h3", { className: "text-base font-semibold text-white mt-4 mb-2", children: children }),
                                                p: ({ children }) => _jsx("p", { className: "text-sm text-gray-300 mb-3 leading-relaxed", children: children }),
                                                strong: ({ children }) => _jsx("strong", { className: "text-white font-semibold", children: children }),
                                                ul: ({ children }) => _jsx("ul", { className: "text-sm text-gray-300 list-disc list-inside space-y-1 my-3", children: children }),
                                                ol: ({ children }) => _jsx("ol", { className: "text-sm text-gray-300 list-decimal list-inside space-y-1 my-3", children: children }),
                                                li: ({ children }) => _jsx("li", { className: "mb-1", children: children }),
                                                code: ({ children }) => _jsx("code", { className: "text-xs bg-white/10 px-1.5 py-0.5 rounded text-cyan-300 font-mono", children: children }),
                                                blockquote: ({ children }) => _jsx("blockquote", { className: "border-l-2 border-white/20 pl-4 my-4 text-gray-400 italic", children: children }),
                                            }, children: selectedDoc.content }) }) })] })) : (_jsx("div", { className: "h-full flex items-center justify-center p-12 text-center", children: _jsxs("div", { children: [_jsx(BookOpen, { size: 48, className: "mx-auto mb-4 text-gray-700" }), _jsx("p", { className: "text-sm text-gray-500 mb-1", children: "Selecciona un documento" }), _jsx("p", { className: "text-xs text-gray-600", children: "Vista previa estilo Notion" })] }) })) })] })] }));
};
export default RAGView;
