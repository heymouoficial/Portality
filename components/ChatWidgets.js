import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, Info, XCircle, Check, FileText } from 'lucide-react';
// --- 1. Metric Widget ---
export const MetricWidget = ({ data }) => {
    const isPositive = data.status === 'positive';
    const isNegative = data.status === 'negative';
    return (_jsxs("div", { className: "inline-flex min-w-[180px] p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-lg relative overflow-hidden group hover:border-white/20 transition-all mx-1 my-2", children: [_jsx("div", { className: `absolute top-0 left-0 w-1 h-full ${isPositive ? 'bg-emerald-500' : isNegative ? 'bg-rose-500' : 'bg-blue-500'}` }), _jsxs("div", { className: "flex flex-col gap-1 z-10 relative", children: [_jsx("span", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-wider", children: data.label }), _jsxs("div", { className: "flex items-end gap-2", children: [_jsx("span", { className: "text-2xl font-bold text-white tracking-tight", children: data.value }), data.trend && (_jsxs("span", { className: `text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 mb-1 ${isPositive ? 'text-emerald-400 bg-emerald-500/10' : isNegative ? 'text-rose-400 bg-rose-500/10' : 'text-gray-400'}`, children: [isPositive ? _jsx(TrendingUp, { size: 10 }) : _jsx(TrendingDown, { size: 10 }), data.trend] }))] })] }), _jsx("div", { className: `absolute -right-4 -bottom-4 w-16 h-16 rounded-full blur-xl opacity-10 ${isPositive ? 'bg-emerald-500' : isNegative ? 'bg-rose-500' : 'bg-blue-500'}` })] }));
};
// --- 2. Task Widget ---
export const TaskWidget = ({ data }) => {
    return (_jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-[#121212] border border-white/10 my-2 max-w-sm hover:bg-[#181818] transition-colors group", children: [_jsx("div", { className: `w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${data.status === 'done' ? 'bg-emerald-500 border-emerald-500' : 'border-gray-600'}`, children: data.status === 'done' && _jsx(Check, { size: 14, className: "text-black", strokeWidth: 3 }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: `text-sm font-medium ${data.status === 'done' ? 'text-gray-500 line-through' : 'text-white'}`, children: data.title }), _jsxs("div", { className: "flex gap-2 mt-1", children: [_jsx("span", { className: `text-[9px] px-1.5 rounded border uppercase font-bold ${data.priority === 'high' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                                    'text-blue-400 border-blue-500/20 bg-blue-500/10'}`, children: data.priority }), data.assignee && _jsx("span", { className: "text-[9px] text-gray-500 border border-white/10 px-1.5 rounded bg-white/5", children: data.assignee })] })] })] }));
};
// --- 3. Alert Widget ---
export const AlertWidget = ({ data }) => {
    const styles = {
        info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        success: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        error: { icon: XCircle, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' }
    };
    const theme = styles[data.type] || styles.info;
    const Icon = theme.icon;
    return (_jsxs("div", { className: `flex gap-3 p-4 rounded-xl border ${theme.bg} ${theme.border} my-3`, children: [_jsx(Icon, { size: 20, className: `shrink-0 ${theme.color}` }), _jsxs("div", { children: [data.title && _jsx("h4", { className: `text-sm font-bold ${theme.color} mb-1`, children: data.title }), _jsx("p", { className: "text-xs text-gray-300 leading-relaxed", children: data.message })] })] }));
};
// --- 4. Citation Widget ---
export const CitationWidget = ({ data }) => {
    return (_jsxs("div", { className: "mt-2 mb-2 p-3 rounded-lg bg-[#0A0A0A] border border-white/5 hover:border-emerald-500/30 transition-colors cursor-pointer group", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [_jsx(FileText, { size: 12, className: "text-emerald-500" }), _jsxs("span", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wide group-hover:text-emerald-400 transition-colors", children: ["Fuente RAG: ", data.sourceName] })] }), _jsxs("p", { className: "text-xs text-gray-500 italic border-l-2 border-white/10 pl-2 line-clamp-2 hover:line-clamp-none transition-all", children: ["\"", data.snippet, "\""] })] }));
};
