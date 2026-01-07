import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getCurrentBrand } from '../config/branding';
import { Activity, AlertTriangle, Clock } from 'lucide-react';
const ClientSummaryCard = ({ client, activeTasks }) => {
    const brand = getCurrentBrand();
    // Calculate stats
    const highPriorityTasks = activeTasks.filter(t => t.priority === 'high').length;
    const completedTasks = activeTasks.filter(t => t.completed).length;
    const totalTasks = activeTasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return brand.colors.success;
            case 'risk': return brand.colors.accent; // Usually pink/red for risk
            case 'paused': return '#fbbf24'; // Amber
            default: return '#9ca3af';
        }
    };
    return (_jsxs("div", { className: "relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-white/20", children: [_jsx("div", { className: "absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-black/40" }), _jsx("div", { className: "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 animate-pulse", style: { backgroundColor: getStatusColor(client.status) } }), _jsxs("div", { className: "relative p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold text-white tracking-tight mb-1", children: client.name }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/70 border border-white/5", children: client.type }), _jsxs("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1", style: {
                                                    backgroundColor: `${getStatusColor(client.status)}20`,
                                                    color: getStatusColor(client.status),
                                                    border: `1px solid ${getStatusColor(client.status)}40`
                                                }, children: [_jsx(Activity, { size: 10 }), client.status] })] })] }), _jsx("div", { className: "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white/20", children: client.name.substring(0, 2).toUpperCase() })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 mb-6", children: [_jsxs("div", { className: "p-3 rounded-2xl bg-black/20 border border-white/5 flex flex-col justify-between", children: [_jsx("span", { className: "text-xs text-gray-500 font-medium", children: "Tareas Activas" }), _jsxs("div", { className: "flex items-end gap-2 mt-1", children: [_jsx("span", { className: "text-xl font-bold text-white", children: totalTasks - completedTasks }), _jsx("span", { className: "text-[10px] text-gray-500 mb-1", children: "pendientes" })] })] }), _jsxs("div", { className: "p-3 rounded-2xl bg-black/20 border border-white/5 flex flex-col justify-between", children: [_jsx("span", { className: "text-xs text-gray-500 font-medium", children: "Prioridad Alta" }), _jsxs("div", { className: "flex items-end gap-2 mt-1", children: [_jsx("span", { className: "text-xl font-bold text-rose-400", children: highPriorityTasks }), highPriorityTasks > 0 && _jsx(AlertTriangle, { size: 14, className: "text-rose-400 mb-1 animate-bounce" })] })] })] }), _jsxs("div", { className: "mb-2 flex justify-between text-xs font-medium text-gray-400", children: [_jsx("span", { children: "Progreso del Ciclo" }), _jsxs("span", { children: [Math.round(progress), "%"] })] }), _jsx("div", { className: "h-1.5 w-full bg-white/10 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full rounded-full transition-all duration-1000 ease-out", style: {
                                width: `${progress}%`,
                                backgroundColor: getStatusColor(client.status),
                                boxShadow: `0 0 10px ${getStatusColor(client.status)}`
                            } }) }), activeTasks.length > 0 && (_jsxs("div", { className: "mt-6 pt-6 border-t border-white/5", children: [_jsx("p", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Pr\u00F3ximas Entregas" }), _jsx("div", { className: "space-y-2", children: activeTasks.slice(0, 2).map(task => (_jsxs("div", { className: "flex items-center gap-3 group/task", children: [_jsx("div", { className: `w-1.5 h-1.5 rounded-full ${task.priority === 'high' ? 'bg-rose-500' : 'bg-emerald-500'}` }), _jsx("span", { className: "text-sm text-gray-300 truncate group-hover/task:text-white transition-colors", children: task.title }), task.deadline && (_jsxs("span", { className: "ml-auto text-[10px] text-gray-600 flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded", children: [_jsx(Clock, { size: 10 }), new Date(task.deadline).getDate(), "/", new Date(task.deadline).getMonth() + 1] }))] }, task.id))) })] }))] })] }));
};
export default ClientSummaryCard;
