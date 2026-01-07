import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Clock, CheckCircle2, Circle, Plus, Target, Activity } from 'lucide-react';
const TEAM = [
    {
        id: 'andrea',
        name: 'Andrea Chimaras',
        role: 'CEO (Strategic)',
        avatar: 'AC',
        color: 'from-emerald-500 to-teal-600',
        focus: ['Clientes', 'Estrategia', 'Ventas'],
        organization: 'ELEVAT'
    },
    {
        id: 'christian',
        name: 'Christian Moreno',
        role: 'Ops Lead',
        avatar: 'CM',
        color: 'from-blue-500 to-indigo-600',
        focus: ['Operaciones', 'Entregas', 'QA'],
        organization: 'ELEVAT'
    },
    {
        id: 'moises',
        name: 'Moisés D Vera',
        role: 'Tech Lead',
        avatar: 'MV',
        color: 'from-purple-500 to-pink-600',
        focus: ['Desarrollo', 'Automatización', 'AI'],
        organization: 'ELEVAT'
    }
];
const AdminPanel = ({ tasks, currentUser, onNavigate, onAddTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskAssignee, setNewTaskAssignee] = useState('moises');
    const getTasksForMember = (memberId) => {
        const avatar = TEAM.find(m => m.id === memberId)?.avatar || memberId.toUpperCase().slice(0, 2);
        return tasks.filter(t => t.assignedTo === avatar);
    };
    const getCompletedCount = (memberId) => {
        return getTasksForMember(memberId).filter(t => t.completed).length;
    };
    const getPendingCount = (memberId) => {
        return getTasksForMember(memberId).filter(t => !t.completed).length;
    };
    const handleQuickAddTask = () => {
        if (!newTaskTitle.trim())
            return;
        onAddTask(newTaskTitle, 'medium', newTaskAssignee);
        setNewTaskTitle('');
    };
    const recentActivity = [
        { id: 1, user: 'MV', action: 'creó', item: 'Configurar n8n en VPS', time: 'hace 5 min', type: 'task' },
        { id: 2, user: 'AC', action: 'completó', item: 'Llamada Clínica Pro Salud', time: 'hace 1h', type: 'call' },
        { id: 3, user: 'CM', action: 'actualizó', item: 'Dashboard QA', time: 'hace 2h', type: 'update' },
        { id: 4, user: 'MV', action: 'vectorizó', item: 'Elevat DNA', time: 'hace 3h', type: 'ai' }
    ];
    return (_jsxs("div", { className: "p-4 md:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("div", { className: "px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full", children: _jsx("span", { className: "text-[10px] font-black text-purple-400 uppercase tracking-widest", children: "ADMIN PANEL" }) }) }), _jsxs("h1", { className: "text-4xl md:text-5xl font-black text-white tracking-tighter italic", children: ["Equipo ", _jsx("span", { className: "text-purple-500", children: "Elevat" })] }), _jsx("p", { className: "text-gray-500 font-medium max-w-lg", children: "Vista global del equipo. Asigna tareas, monitorea actividad y mant\u00E9n el pulso operativo." })] }), _jsxs("button", { onClick: () => onNavigate('board'), className: "px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-2xl text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all active:scale-95", children: [_jsx(Target, { size: 16 }), "Ver Kanban"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10", children: TEAM.map((member) => (_jsxs("div", { className: "liquid-glass bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group hover:bg-white/[0.04] transition-all", children: [_jsx("div", { className: `absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${member.color} opacity-10 blur-[60px] group-hover:opacity-20 transition-all` }), _jsxs("div", { className: "relative z-10 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-12 h-12 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-sm shadow-lg`, children: member.avatar }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-black text-white", children: member.name }), _jsx("p", { className: "text-[10px] text-gray-500 uppercase tracking-widest font-bold", children: member.role })] })] }), _jsxs("div", { className: `px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getPendingCount(member.id) > 0
                                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`, children: [getPendingCount(member.id), " pendientes"] })] }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: member.focus.map((area, i) => (_jsx("span", { className: "px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-bold text-gray-400", children: area }, i))) }), _jsxs("div", { className: "pt-3 border-t border-white/5 space-y-2", children: [getTasksForMember(member.id).slice(0, 3).map((task) => (_jsxs("div", { className: "flex items-center gap-2 text-[11px]", children: [task.completed ? (_jsx(CheckCircle2, { size: 12, className: "text-emerald-500" })) : (_jsx(Circle, { size: 12, className: "text-gray-600" })), _jsx("span", { className: task.completed ? 'text-gray-500 line-through' : 'text-gray-300', children: task.title })] }, task.id))), getTasksForMember(member.id).length === 0 && (_jsx("div", { className: "text-[10px] text-gray-600 italic", children: "Sin tareas asignadas" }))] })] })] }, member.id))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [_jsxs("div", { className: "lg:col-span-5 liquid-glass bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 space-y-4", children: [_jsx("h4", { className: "text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]", children: "Asignaci\u00F3n R\u00E1pida" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: newTaskTitle, onChange: (e) => setNewTaskTitle(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleQuickAddTask(), placeholder: "Nueva tarea...", className: "flex-1 px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50" }), _jsx("select", { value: newTaskAssignee, onChange: (e) => setNewTaskAssignee(e.target.value), className: "px-3 py-3 bg-white/5 rounded-xl border border-white/10 text-sm text-gray-300 focus:outline-none", children: TEAM.map(m => (_jsx("option", { value: m.id, children: m.avatar }, m.id))) }), _jsx("button", { onClick: handleQuickAddTask, className: "p-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-white transition-all active:scale-95", children: _jsx(Plus, { size: 18 }) })] }), _jsx("div", { className: "flex gap-2", children: ['Alta Prioridad', 'Seguimiento', 'Reunión'].map((tag) => (_jsx("button", { onClick: () => setNewTaskTitle(prev => prev ? `${prev} - ${tag}` : tag), className: "px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-500 hover:text-white hover:bg-white/10 transition-all", children: tag }, tag))) })] }), _jsxs("div", { className: "lg:col-span-7 liquid-glass bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h4", { className: "text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]", children: "Actividad Reciente" }), _jsx(Activity, { size: 14, className: "text-gray-600" })] }), _jsx("div", { className: "space-y-3", children: recentActivity.map((activity) => (_jsxs("div", { className: "flex items-center gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl", children: [_jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${activity.user === 'AC' ? 'bg-emerald-500/20 text-emerald-400' :
                                                activity.user === 'CM' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-purple-500/20 text-purple-400'}`, children: activity.user }), _jsx("div", { className: "flex-1", children: _jsxs("p", { className: "text-xs text-gray-300", children: [_jsx("span", { className: "font-bold", children: activity.user }), " ", activity.action, " ", _jsx("span", { className: "text-white font-medium", children: activity.item })] }) }), _jsxs("div", { className: "flex items-center gap-2 text-[10px] text-gray-600", children: [_jsx(Clock, { size: 10 }), activity.time] })] }, activity.id))) })] })] })] }));
};
export default AdminPanel;
