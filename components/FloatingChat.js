import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, MicOff, Loader2, ExternalLink, Database } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { geminiService } from '../services/geminiService';
import { getCurrentBrand } from '../config/branding';
import ClientSummaryCard from './ClientSummaryCard';
import TaskCard from './TaskCard';
import DataTable from './DataTable';
import TaskActionCard from './TaskActionCard';
import TeamAvailabilitySnippet from './TeamAvailabilitySnippet';
import ServiceDetailCard from './ServiceDetailCard';
import { notionService } from '../services/notionService';
const ClientSummaryLoader = ({ clientId, activeTasks }) => {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetch = async () => {
            // For demo/alpha, we fetch all and find. In prod, fetch specific.
            try {
                const clients = await notionService.getClients();
                // Improved fuzzy matching for demo
                const found = clients.find(c => c.id === clientId ||
                    c.name.toLowerCase().includes(clientId.toLowerCase()) ||
                    (c.notion_id && c.notion_id === clientId));
                setClient(found || null);
            }
            catch (e) {
                console.error("Error fetching client for summary:", e);
            }
            finally {
                setLoading(false);
            }
        };
        fetch();
    }, [clientId]);
    if (loading)
        return _jsx("div", { className: "p-4 flex justify-center", children: _jsx(Loader2, { className: "animate-spin text-emerald-400", size: 24 }) });
    if (!client)
        return (_jsxs("div", { className: "p-4 text-xs text-rose-400 bg-rose-500/10 rounded-lg border border-rose-500/20", children: ["Cliente \"", clientId, "\" no encontrado en Notion.", _jsx("br", {}), _jsx("span", { className: "opacity-50", children: "Intenta con el nombre exacto." })] }));
    // Filter tasks for this client
    // We assume tasks passed to FloatingChat are all active tasks. 
    // We need to match task.clientId to client.id or client.notion_id
    const clientTasks = activeTasks.filter(t => t.clientId === client.id || t.clientId === client.notion_id);
    return _jsx("div", { className: "mt-4", children: _jsx(ClientSummaryCard, { client: client, activeTasks: clientTasks }) });
};
const FloatingChat = ({ tasks = [], onNavigate, onAddTask, userName = 'Usuario', pendingTaskCount = 0, organizationId, organizationName, integrations }) => {
    const brand = getCurrentBrand();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const messagesEndRef = useRef(null);
    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // Welcome message on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                    role: 'assistant',
                    content: `¡Hola ${userName}! Soy **Aureon**, la Superinteligencia de **Multiversa Lab**.\nUtilizo la tecnología de mis creadores para asistirte con la Inteligencia de Portality en **[${organizationName || 'esta organización'}]**.\n\n¿En qué puedo ayudarte hoy?\n\n💡 Prueba: *"¿Tengo tareas pendientes?"* o *"¿Cómo está conectada mi organización?"*`,
                    timestamp: new Date(),
                }]);
        }
    }, [isOpen, userName]);
    const handleSend = async () => {
        if (!inputValue.trim() || isLoading)
            return;
        const userMessage = {
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        try {
            const { ragService } = await import('../services/ragService');
            const ragContext = await ragService.retrieveContext(inputValue, 'user', organizationId);
            const context = {
                userName,
                pendingTasks: pendingTaskCount,
                currentView: 'home',
                ragContext: ragContext,
                currentOrgName: organizationName,
                integrations: integrations
            };
            const response = await geminiService.chat(inputValue, context);
            console.log('🤖 [Aureon] Response:', response);
            if (response.actions && response.actions.length > 0) {
                console.log('⚡ [Aureon] Actions detected:', response.actions);
            }
            setMessages(prev => [...prev, response]);
        }
        catch (error) {
            setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: '❌ Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.',
                    timestamp: new Date(),
                }]);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Render UI actions
    const renderAction = (action) => {
        switch (action.type) {
            case 'task_list':
                const filteredTasks = action.data?.filter === 'pending'
                    ? tasks.filter(t => !t.completed)
                    : tasks;
                return (_jsxs("div", { className: "mt-3 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between px-1", children: [_jsx("span", { className: "text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]", children: "Sincronizaci\u00F3n Notion" }), _jsxs("span", { className: "text-[10px] font-bold text-emerald-400/70", children: [filteredTasks.length, " ITEMS"] })] }), filteredTasks.slice(0, 3).map(task => (_jsx(TaskCard, { task: task, onToggle: (id) => {
                                // Handle task toggle if passed through props, or just use notionService
                                console.log('Toggling task', id);
                            } }, task.id))), filteredTasks.length > 3 && (_jsxs("button", { onClick: () => onNavigate?.('agency'), className: "w-full py-2.5 text-[10px] font-black uppercase tracking-widest text-center rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-white", children: ["Ver todas las tareas (", filteredTasks.length, ")"] }))] }));
            case 'data_table':
                return (_jsx(DataTable, { title: action.data?.title, headers: action.data?.headers || [], rows: action.data?.rows || [], icon: _jsx(Database, { size: 14 }) }));
            case 'confirm_task':
                const newTask = action.data;
                return (_jsxs("div", { className: "mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20", children: [_jsx("p", { className: "text-sm text-emerald-300 mb-2", children: "\u00BFCrear esta tarea?" }), _jsxs("div", { className: "p-2 rounded-lg bg-black/30", children: [_jsx("p", { className: "text-sm text-white font-medium", children: newTask?.title }), _jsxs("div", { className: "flex gap-2 mt-1", children: [_jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded ${newTask?.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                                newTask?.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                                    'bg-blue-500/20 text-blue-400'}`, children: newTask?.priority }), _jsxs("span", { className: "text-[10px] text-gray-500", children: ["\u2192 ", newTask?.assignedTo] })] })] }), _jsxs("div", { className: "flex gap-2 mt-3", children: [_jsx("button", { onClick: () => {
                                        onAddTask?.(newTask);
                                        setMessages(prev => [...prev, {
                                                role: 'assistant',
                                                content: '✅ ¡Tarea creada exitosamente!',
                                                timestamp: new Date(),
                                            }]);
                                    }, className: "flex-1 py-2 rounded-lg text-sm font-medium bg-emerald-500 text-black hover:bg-emerald-400 transition-colors", children: "Confirmar" }), _jsx("button", { className: "flex-1 py-2 rounded-lg text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors", children: "Cancelar" })] })] }));
            case 'quick_stats':
                return (_jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2", children: [_jsxs("div", { className: "p-2 rounded-lg bg-white/5 text-center", children: [_jsx("p", { className: "text-lg font-bold text-white", children: pendingTaskCount }), _jsx("p", { className: "text-[10px] text-gray-500", children: "Pendientes" })] }), _jsxs("div", { className: "p-2 rounded-lg bg-white/5 text-center", children: [_jsx("p", { className: "text-lg font-bold text-emerald-400", children: tasks.filter(t => t.completed).length }), _jsx("p", { className: "text-[10px] text-gray-500", children: "Completadas" })] }), _jsxs("div", { className: "p-2 rounded-lg bg-white/5 text-center", children: [_jsx("p", { className: "text-lg font-bold text-amber-400", children: tasks.filter(t => t.priority === 'high' && !t.completed).length }), _jsx("p", { className: "text-[10px] text-gray-500", children: "Urgentes" })] })] }));
            case 'connect_notion':
                return (_jsxs("div", { className: "mt-3 p-4 rounded-xl border border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center text-center", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3", children: _jsx(Database, { size: 20, className: "text-white" }) }), _jsx("p", { className: "text-xs text-white font-bold mb-1", children: "Sin espacio en Notion" }), _jsx("p", { className: "text-[10px] text-gray-500 mb-4", children: "A\u00FAn no has conectado un espacio de trabajo para esta organizaci\u00F3n." }), _jsxs("button", { onClick: () => onNavigate?.('connections'), className: "w-full py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2", children: ["Conectar Notion ", _jsx(ExternalLink, { size: 12 })] })] }));
            case 'client_summary':
                console.log('📦 [FloatingChat] Rendering ClientSummary for:', action.data?.clientId);
                return _jsx(ClientSummaryLoader, { clientId: action.data?.clientId || '', activeTasks: tasks });
            case 'task_action':
                const actionTask = tasks.find(t => t.id === action.data?.taskId || t.title.toLowerCase().includes(action.data?.taskId?.toLowerCase()));
                if (!actionTask)
                    return _jsxs("p", { className: "text-[10px] text-gray-500 p-2 italic", children: ["Tarea \"", action.data?.taskId, "\" no identificada."] });
                return (_jsx(TaskActionCard, { task: actionTask, onComplete: (id) => console.log('✅ [Chat] Completing task:', id), onDelete: (id) => console.log('🗑️ [Chat] Deleting task:', id) }));
            case 'team_availability':
                return (_jsx(TeamAvailabilitySnippet, { name: action.data?.name || 'Miembro', role: action.data?.role || 'Especialista', taskCount: action.data?.taskCount || 0, status: action.data?.status || 'offline' }));
            case 'service_detail':
                // For demo, we create a temporary service object if not found
                const service = {
                    id: action.data?.serviceId || 's1',
                    name: action.data?.serviceId || 'Servicio Desconocido',
                    clientId: '',
                    responsibleId: 'CM',
                    frequency: 'monthly'
                };
                return _jsx(ServiceDetailCard, { service: service, clientName: "Cliente Vinculado" });
            default:
                return null;
        }
    };
    return (_jsxs(_Fragment, { children: [!isOpen && (_jsx("button", { onClick: () => setIsOpen(true), className: "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 overflow-hidden border-2 border-white/20", style: {
                    boxShadow: `0 8px 32px ${brand.colors.primary}40, 0 0 60px ${brand.colors.accent}20`
                }, children: _jsx("img", { src: "/aureon.webp", alt: "Aureon", className: "w-full h-full object-cover" }) })), isOpen && (_jsxs("div", { className: "fixed bottom-6 right-6 z-50 w-[360px] md:w-[420px] bg-[#0a0a0b]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 max-h-[70vh]", children: [_jsxs("div", { className: "p-4 flex items-center justify-between border-b border-white/5 shrink-0", style: { background: `linear-gradient(135deg, ${brand.colors.primary}10, ${brand.colors.accent}10)` }, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0", children: _jsx("img", { src: "/aureon.webp", alt: "Aureon", className: "w-full h-full object-cover" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold text-white", children: "Aureon" }), _jsxs("p", { className: "text-[10px] text-emerald-400 flex items-center gap-1", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }), isLoading ? 'Pensando...' : 'Online'] })] })] }), _jsx("button", { onClick: () => setIsOpen(false), className: "p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "flex-1 p-4 space-y-4 overflow-y-auto min-h-[200px]", children: [messages.map((msg, i) => (_jsx("div", { className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsx("div", { className: `max-w-[85%] ${msg.role === 'user'
                                        ? 'bg-white/10 rounded-2xl rounded-br-md px-4 py-2.5'
                                        : 'bg-transparent'}`, children: msg.role === 'user' ? (_jsx("p", { className: "text-sm text-white", children: msg.content })) : (_jsxs("div", { className: "prose prose-sm prose-invert max-w-none", children: [_jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], components: {
                                                    p: ({ children }) => _jsx("p", { className: "text-sm text-gray-300 mb-2 last:mb-0", children: children }),
                                                    strong: ({ children }) => _jsx("strong", { className: "text-white font-semibold", children: children }),
                                                    em: ({ children }) => _jsx("em", { className: "text-gray-400", children: children }),
                                                    code: ({ children }) => _jsx("code", { className: "text-xs bg-white/10 px-1 py-0.5 rounded text-cyan-300", children: children }),
                                                    ul: ({ children }) => _jsx("ul", { className: "text-sm text-gray-300 list-disc list-inside space-y-1 my-2", children: children }),
                                                    li: ({ children }) => _jsx("li", { children: children }),
                                                }, children: msg.content }), msg.actions?.map((action, j) => (_jsx("div", { children: renderAction(action) }, j)))] })) }) }, i))), isLoading && (_jsxs("div", { className: "flex items-center gap-2 text-gray-400", children: [_jsx(Loader2, { size: 16, className: "animate-spin" }), _jsx("span", { className: "text-xs", children: "Aureon est\u00E1 escribiendo..." })] })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "px-3 pb-2 flex gap-2 overflow-x-auto shrink-0", children: ['Mis tareas', 'Agregar tarea', 'Estado del día'].map((action, i) => (_jsx("button", { onClick: () => setInputValue(action), className: "px-3 py-1.5 text-xs rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap border border-white/5", children: action }, i))) }), _jsx("div", { className: "p-3 border-t border-white/5 shrink-0", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSend(), placeholder: "Escribe un mensaje...", className: "flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-white/20 text-white placeholder-gray-500", disabled: isLoading }), _jsx("button", { onClick: () => setIsVoiceActive(!isVoiceActive), className: `p-2.5 rounded-xl transition-all ${isVoiceActive
                                        ? 'bg-red-500/20 text-red-400'
                                        : 'bg-white/5 text-gray-500 hover:text-white'}`, title: "Voz (pr\u00F3ximamente)", children: isVoiceActive ? _jsx(MicOff, { size: 18 }) : _jsx(Mic, { size: 18 }) }), _jsx("button", { onClick: handleSend, disabled: isLoading || !inputValue.trim(), className: "p-2.5 rounded-xl transition-all disabled:opacity-50", style: { backgroundColor: brand.colors.primary, color: '#000' }, children: isLoading ? _jsx(Loader2, { size: 18, className: "animate-spin" }) : _jsx(Send, { size: 18 }) })] }) })] }))] }));
};
export default FloatingChat;
