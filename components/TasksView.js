import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, Check, Trash2, CheckSquare } from 'lucide-react';
const TasksView = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [priority, setPriority] = useState('medium');
    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim())
            return;
        onAddTask(newTaskTitle, priority);
        setNewTaskTitle('');
    };
    return (_jsxs("div", { className: "flex flex-col h-full px-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 pt-2", children: [_jsx("div", { className: "p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-theme-primary shadow-sm", children: _jsx(CheckSquare, { size: 24 }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white tracking-tight", children: "Mis Tareas" }), _jsx("p", { className: "text-xs text-gray-500 font-medium", children: "Lista Maestra \u2022 Elevat Workspace" })] })] }), _jsxs("form", { onSubmit: handleAdd, className: "mb-6 relative z-10", children: [_jsxs("div", { className: "flex gap-2 mb-3", children: [_jsx("input", { type: "text", value: newTaskTitle, onChange: (e) => setNewTaskTitle(e.target.value), placeholder: "Nueva tarea...", className: "flex-1 bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-base outline-none focus:border-theme-primary transition-colors text-white placeholder:text-gray-600 focus:bg-[#111]" }), _jsx("button", { type: "submit", disabled: !newTaskTitle.trim(), className: "bg-theme-primary text-white w-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-theme-primary/90 transition-colors flex items-center justify-center", children: _jsx(Plus, { size: 24 }) })] }), _jsx("div", { className: "flex gap-2", children: ['low', 'medium', 'high'].map(p => (_jsx("button", { type: "button", onClick: () => setPriority(p), className: `px-3 py-1 rounded-full text-[10px] font-bold border transition-all uppercase tracking-wider ${priority === p
                                ? 'bg-theme-primary text-white border-theme-primary'
                                : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'}`, children: p === 'high' ? 'Alta' : p === 'medium' ? 'Media' : 'Baja' }, p))) })] }), _jsxs("div", { className: "flex flex-col gap-3 overflow-y-auto no-scrollbar pb-10", children: [tasks.length === 0 && (_jsxs("div", { className: "text-center py-10 text-gray-600", children: [_jsx("p", { children: "No hay tareas pendientes." }), _jsx("p", { className: "text-sm mt-1", children: "Usa a Aureon o agrega una manualmente." })] })), tasks.map(task => (_jsxs("div", { className: `group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${task.completed
                            ? 'bg-[#050505] border-transparent opacity-50'
                            : 'bg-[#121212] border-white/5 hover:border-white/10 shadow-sm'}`, children: [_jsx("button", { onClick: () => onToggleTask(task.id), className: `flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed
                                    ? 'bg-theme-secondary border-theme-secondary'
                                    : 'border-gray-600 hover:border-theme-primary'}`, children: task.completed && _jsx(Check, { size: 14, className: "text-black", strokeWidth: 3 }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: `text-base font-medium transition-all ${task.completed
                                            ? 'text-gray-600 line-through'
                                            : 'text-gray-200'}`, children: task.title }), _jsx("div", { className: "flex items-center gap-2 mt-1", children: _jsx("span", { className: `text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${task.priority === 'high'
                                                ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                                                : task.priority === 'medium'
                                                    ? 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                                                    : 'text-gray-400 bg-white/5 border-white/5'}`, children: task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja' }) })] }), _jsx("button", { onClick: () => onDeleteTask(task.id), className: "p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100", children: _jsx(Trash2, { size: 18 }) })] }, task.id)))] })] }));
};
export default TasksView;
