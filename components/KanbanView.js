import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, MoreHorizontal, Kanban, Circle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
const COLUMNS = [
    { id: 'todo', title: 'Por hacer', color: 'bg-gray-500', icon: _jsx(Circle, { size: 14 }) },
    { id: 'in-progress', title: 'En Progreso', color: 'bg-blue-500', icon: _jsx(Clock, { size: 14, className: "text-blue-500" }) },
    { id: 'review', title: 'Revisión', color: 'bg-amber-500', icon: _jsx(AlertCircle, { size: 14, className: "text-amber-500" }) },
    { id: 'done', title: 'Completado', color: 'bg-green-500', icon: _jsx(CheckCircle2, { size: 14, className: "text-green-500" }) },
];
const KanbanView = ({ tasks, onUpdateTaskStatus, onAddTask }) => {
    const [draggedTaskId, setDraggedTaskId] = useState(null);
    const handleDragStart = (e, taskId) => {
        setDraggedTaskId(taskId);
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    const handleDrop = (e, status) => {
        e.preventDefault();
        if (draggedTaskId) {
            onUpdateTaskStatus(draggedTaskId, status);
            setDraggedTaskId(null);
        }
    };
    return (_jsxs("div", { className: "flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500", children: [_jsxs("div", { className: "flex items-center justify-between px-6 mb-4 pt-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-theme-primary shadow-sm", children: _jsx(Kanban, { size: 24 }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white tracking-tight", children: "Tablero" }), _jsx("p", { className: "text-xs text-gray-500 font-medium", children: "Notion Sync \u2022 Elevat Workspace" })] })] }), _jsx("button", { className: "p-2 rounded-full hover:bg-white/10 transition-colors", children: _jsx(MoreHorizontal, { size: 20, className: "text-gray-500" }) })] }), _jsxs("div", { className: "flex-1 overflow-x-auto overflow-y-hidden px-6 pb-24 snap-x snap-mandatory flex gap-4 no-scrollbar", children: [COLUMNS.map((col) => {
                        const colTasks = tasks.filter(t => t.status === col.id);
                        return (_jsxs("div", { className: "flex-shrink-0 w-[85vw] sm:w-72 h-full flex flex-col snap-center", onDragOver: handleDragOver, onDrop: (e) => handleDrop(e, col.id), children: [_jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: `px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide bg-white/5 border border-white/5 text-gray-300 flex items-center gap-1.5`, children: [col.icon, col.title] }), _jsx("span", { className: "text-[10px] text-gray-500 font-bold bg-[#0A0A0A] px-1.5 py-0.5 rounded border border-white/5", children: colTasks.length })] }), _jsx("button", { onClick: () => onAddTask('Nueva tarea', 'medium', col.id), className: "text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded", children: _jsx(Plus, { size: 16 }) })] }), _jsxs("div", { className: `flex-1 rounded-2xl bg-[#050505]/50 border border-white/5 p-2 flex flex-col gap-2.5 overflow-y-auto no-scrollbar transition-colors ${draggedTaskId ? 'bg-white/[0.02] border-dashed border-white/10' : ''}`, children: [colTasks.length === 0 && (_jsxs("div", { className: "h-32 flex flex-col items-center justify-center text-gray-600 gap-2 opacity-50", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-white/5 flex items-center justify-center", children: _jsx(Plus, { size: 16 }) }), _jsx("span", { className: "text-xs font-medium", children: "Vac\u00EDo" })] })), colTasks.map(task => (_jsxs("div", { draggable: true, onDragStart: (e) => handleDragStart(e, task.id), className: "group relative bg-[#121212] p-3.5 rounded-xl border border-white/5 shadow-sm hover:shadow-lg hover:border-white/10 hover:bg-[#161616] transition-all cursor-grab active:cursor-grabbing animate-in zoom-in-95 duration-200", children: [_jsx("div", { className: "flex items-start justify-between mb-2", children: _jsx("h4", { className: "text-sm font-medium text-gray-200 leading-snug group-hover:text-white transition-colors", children: task.title }) }), _jsxs("div", { className: "flex items-center justify-between mt-3", children: [_jsxs("div", { className: "flex gap-1.5", children: [task.priority === 'high' && (_jsx("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20", children: "URGENTE" })), task.tags?.map(tag => (_jsx("span", { className: "text-[9px] font-medium px-1.5 py-0.5 rounded bg-white/5 text-gray-500 border border-white/5", children: tag }, tag)))] }), _jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 text-[8px] flex items-center justify-center text-white font-bold border border-[#121212] shadow-sm", children: task.assignedTo || 'ME' })] })] }, task.id)))] })] }, col.id));
                    }), _jsx("div", { className: "w-4 flex-shrink-0" })] })] }));
};
export default KanbanView;
