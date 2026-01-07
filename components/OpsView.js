import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, Clock, AlertTriangle, CheckCircle2, Circle, Users } from 'lucide-react';
const TEAM_FILTERS = [
    { id: 'all', label: 'Todos', avatar: null },
    { id: 'AC', label: 'Andrea', avatar: 'AC', color: 'from-emerald-500 to-teal-600' },
    { id: 'CM', label: 'Christian', avatar: 'CM', color: 'from-blue-500 to-indigo-600' },
    { id: 'MV', label: 'Moisés', avatar: 'MV', color: 'from-purple-500 to-pink-600' }
];
const OpsView = ({ tasks, onToggleTask }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const columns = [
        { id: 'todo', label: 'Por Hacer', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' },
        { id: 'inProgress', label: 'En Proceso', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        { id: 'done', label: 'Completado', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
    ];
    const filteredTasks = activeFilter === 'all'
        ? tasks
        : tasks.filter(t => t.assignedTo === activeFilter);
    const getTasksByStatus = (status) => {
        if (status === 'done')
            return filteredTasks.filter(t => t.completed);
        if (status === 'inProgress')
            return filteredTasks.filter(t => !t.completed && t.priority === 'high');
        return filteredTasks.filter(t => !t.completed && t.priority !== 'high');
    };
    const getAvatarColor = (avatar) => {
        const member = TEAM_FILTERS.find(m => m.avatar === avatar);
        return member?.color || 'from-gray-500 to-gray-600';
    };
    return (_jsxs("div", { className: "p-4 md:p-10 max-w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("div", { className: "px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full", children: _jsx("span", { className: "text-[10px] font-black text-indigo-400 uppercase tracking-widest", children: "OPERACIONES" }) }) }), _jsxs("h1", { className: "text-4xl md:text-5xl font-black text-white tracking-tighter italic", children: ["Tareas ", _jsx("span", { className: "text-amber-500", children: "Ops" })] }), _jsx("p", { className: "text-gray-500 font-medium max-w-lg", children: "Tablero Kanban sincronizado con Notion y Supabase." })] }), _jsxs("button", { className: "px-5 py-3 bg-amber-600 hover:bg-amber-500 rounded-2xl text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-amber-600/20 transition-all active:scale-95", children: [_jsx(Plus, { size: 16 }), "Nueva Tarea"] })] }), _jsx("div", { className: "flex gap-2 mb-8 overflow-x-auto pb-2", children: TEAM_FILTERS.map((filter) => (_jsxs("button", { onClick: () => setActiveFilter(filter.id), className: `flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-white/5'}`, children: [filter.avatar ? (_jsx("div", { className: `w-5 h-5 rounded-md bg-gradient-to-br ${filter.color} flex items-center justify-center text-[8px] font-black text-white`, children: filter.avatar })) : (_jsx(Users, { size: 14 })), filter.label] }, filter.id))) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[60vh]", children: columns.map((column) => (_jsxs("div", { className: "liquid-glass bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${column.bg} ${column.border} border` }), _jsx("h3", { className: `text-sm font-black uppercase tracking-widest ${column.color}`, children: column.label })] }), _jsx("span", { className: "text-[10px] font-black text-gray-600 bg-white/5 px-2.5 py-1 rounded-full", children: getTasksByStatus(column.id).length })] }), _jsxs("div", { className: "flex-1 space-y-4 overflow-y-auto", children: [getTasksByStatus(column.id).map((task) => (_jsxs("div", { className: "bg-white/[0.03] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.06] transition-all cursor-grab active:cursor-grabbing group", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "text-sm font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors", children: task.title }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [task.priority === 'high' && (_jsxs("span", { className: "px-2 py-0.5 bg-red-500/10 text-red-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-red-500/20 flex items-center gap-1", children: [_jsx(AlertTriangle, { size: 10 }), "Urgente"] })), task.assignedTo && (_jsx("div", { className: `w-5 h-5 rounded-md bg-gradient-to-br ${getAvatarColor(task.assignedTo)} flex items-center justify-center text-[8px] font-black text-white`, children: task.assignedTo }))] })] }), _jsx("button", { onClick: () => onToggleTask?.(task.id), className: "w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all active:scale-90", children: task.completed ? (_jsx(CheckCircle2, { size: 14, className: "text-emerald-500" })) : (_jsx(Circle, { size: 14, className: "text-gray-600" })) })] }), task.dueDate && (_jsxs("div", { className: "flex items-center gap-1.5 mt-3 text-gray-500", children: [_jsx(Clock, { size: 10 }), _jsx("span", { className: "text-[10px] font-bold", children: new Date(task.dueDate).toLocaleDateString('es-VE') })] }))] }, task.id))), getTasksByStatus(column.id).length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center py-10 opacity-40", children: [_jsx(Circle, { size: 24, className: "mb-2" }), _jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: "Sin tareas" })] }))] })] }, column.id))) })] }));
};
export default OpsView;
