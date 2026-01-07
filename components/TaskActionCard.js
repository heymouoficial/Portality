import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, Trash2, Clock, AlertTriangle } from 'lucide-react';
const TaskActionCard = ({ task, onComplete, onDelete }) => {
    const getPriorityColor = () => {
        switch (task.priority) {
            case 'high': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        }
    };
    return (_jsxs("div", { className: "mt-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-xl animate-in fade-in zoom-in-95 duration-300", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("div", { className: `p-1 rounded bg-white/5 ${task.priority === 'high' ? 'text-rose-400' : 'text-gray-400'}`, children: _jsx(AlertTriangle, { size: 12 }) }), _jsx("span", { className: "text-[10px] font-black text-gray-500 uppercase tracking-widest", children: "Acci\u00F3n Requerida" })] }), _jsx("h4", { className: "text-sm font-bold text-white mb-1", children: task.title }), _jsxs("div", { className: "flex items-center gap-3 text-[10px] mb-5", children: [_jsx("span", { className: `px-2 py-0.5 rounded border uppercase font-bold ${getPriorityColor()}`, children: task.priority }), task.deadline && (_jsxs("span", { className: "text-gray-500 flex items-center gap-1", children: [_jsx(Clock, { size: 10 }), new Date(task.deadline).toLocaleDateString()] }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: () => onComplete(task.id), className: "flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all flex items-center justify-center gap-2", children: [_jsx(CheckCircle2, { size: 14, strokeWidth: 3 }), "Completar"] }), _jsx("button", { onClick: () => onDelete(task.id), className: "p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all", children: _jsx(Trash2, { size: 16 }) })] })] }));
};
export default TaskActionCard;
