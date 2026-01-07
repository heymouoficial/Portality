import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Activity, Cpu, Monitor, HardDrive, Network, Globe, ChevronDown, Bell } from 'lucide-react';
import { getCurrentBrand } from '../config/branding';
import { vpsService } from '../services/vpsService';
const VIEW_LABELS = {
    'home': 'Inicio',
    'agency': 'Agencia',
    'flow': 'Flow (RAG)',
    'connections': 'Conexiones',
    'team': 'Equipos',
};
const Header = ({ user, onMobileMenuToggle, isMobileMenuOpen, activeView }) => {
    const brand = getCurrentBrand();
    const [time, setTime] = useState(new Date());
    const [metrics, setMetrics] = useState(null);
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        const fetchMetrics = async () => {
            const data = await vpsService.getStatus();
            setMetrics(data);
        };
        const isDev = import.meta.env.DEV;
        fetchMetrics();
        // Only poll metrics in production or with long interval in dev to avoid CORS noise
        const metricsInterval = setInterval(fetchMetrics, isDev ? 60000 : 5000);
        return () => {
            clearInterval(timer);
            clearInterval(metricsInterval);
        };
    }, []);
    const formatTime = (date) => {
        return date.toLocaleTimeString('es-VE', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toUpperCase();
    };
    return (_jsxs("header", { className: "fixed top-0 right-0 left-0 md:left-[72px] h-12 z-40 px-6 flex justify-between items-center bg-white/[0.01] backdrop-blur-[40px] border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)] select-none overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { className: "md:hidden p-2 text-white/70 hover:text-white z-50 mr-2", onClick: () => onMobileMenuToggle?.(), children: _jsx(ChevronDown, { className: `transform transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}` }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" }), _jsx("span", { className: "text-[10px] font-black text-white/40 uppercase tracking-widest hidden lg:inline", children: "AUREON OS" })] }), _jsx("div", { className: "h-4 w-[1px] bg-white/10 hidden lg:block" }), _jsxs("div", { className: "text-[11px] font-bold text-white/80 flex items-center gap-2 overflow-hidden whitespace-nowrap", children: [_jsx("span", { className: "text-white/40", children: "/" }), _jsx("span", { className: "uppercase tracking-wider", children: VIEW_LABELS[activeView] || activeView })] })] }), _jsxs("div", { className: "hidden md:flex items-center gap-6", children: [_jsxs("div", { className: "text-[10px] font-bold text-white/50 flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5", children: [_jsx(Monitor, { size: 10, className: "text-indigo-400" }), _jsx("span", { children: "VPS FIN-01" })] }), _jsxs("div", { className: "flex items-center gap-4 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5", children: [_jsxs("div", { className: "flex items-center gap-1.5 group cursor-help", title: `CPU: ${metrics?.cpu.toFixed(1)}%`, children: [_jsx(Cpu, { size: 13, className: metrics && metrics.cpu > 80 ? 'text-red-400' : 'text-emerald-400/70' }), _jsx("span", { className: "text-[9px] font-mono text-white/60", children: metrics ? `${Math.round(metrics.cpu)}%` : '--' })] }), _jsxs("div", { className: "flex items-center gap-1.5 group cursor-help", title: `RAM: ${metrics?.ram.toFixed(1)}%`, children: [_jsx(Activity, { size: 13, className: "text-purple-400/70" }), _jsx("span", { className: "text-[9px] font-mono text-white/60", children: metrics ? `${Math.round(metrics.ram)}%` : '--' })] }), _jsxs("div", { className: "flex items-center gap-1.5 group cursor-help", title: `Disk: ${metrics?.disk}%`, children: [_jsx(HardDrive, { size: 13, className: "text-blue-400/70" }), _jsx("span", { className: "text-[9px] font-mono text-white/60", children: metrics ? `${metrics.disk}%` : '--' })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md", children: _jsx("span", { className: "text-[8px] font-black text-emerald-400 uppercase tracking-widest", children: "ONLINE" }) }), _jsxs("div", { className: "flex items-center gap-2 group cursor-pointer", children: [_jsx(Network, { size: 14, className: "text-white/30 group-hover:text-emerald-400 transition-colors" }), _jsx(Globe, { size: 14, className: "text-white/30 group-hover:text-indigo-400 transition-colors" })] }), _jsx("div", { className: "h-4 w-[1px] bg-white/10" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Bell, { size: 14, className: "text-white/40 hover:text-white transition-colors cursor-pointer" }), _jsx("div", { className: "flex items-center gap-2 text-[10px] font-black text-white/90 tracking-tighter", children: _jsx("span", { children: formatTime(time) }) })] })] }), _jsx("div", { className: "flex items-center gap-2 pl-2 border-l border-white/10 ml-2", children: _jsx("div", { className: "w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-black shadow-lg shadow-indigo-500/20", children: user.avatar }) })] })] }));
};
export default Header;
