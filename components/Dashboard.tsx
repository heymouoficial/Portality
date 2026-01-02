import React from 'react';
import { Wallet, TrendingUp, Check, Radar, MoreHorizontal, CalendarClock, FileText, ArrowUpRight, Database, Zap, MessageCircle, Send, CreditCard, Mail, Activity, Hourglass, AlertTriangle } from 'lucide-react';
import { Task, Lead, NotionPage, UserProfile } from '../types';

interface DashboardProps {
    user: UserProfile;
    tasks: Task[];
    leads: Lead[];
    notionDocs: NotionPage[];
    trainingMode?: { active: boolean; reason: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user, tasks, leads, notionDocs, trainingMode }) => {
    return (
        <main className="px-4 sm:px-6 lg:px-8 pb-28 max-w-7xl mx-auto">

            {/* Training Mode Alert - Full Width */}
            {trainingMode?.active && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500 rounded-2xl p-4 bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 mb-6">
                    <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-amber-400">Sistema en Fase de Entrenamiento</h4>
                        <p className="text-xs text-gray-400 mt-1">{trainingMode.reason || 'Conecta fuentes de datos (Notion, Supabase) para ver información real en tiempo real.'}</p>
                    </div>
                </div>
            )}

            {/* Responsive Grid: 1 col mobile, 2 cols tablet+, 3 cols desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* F1: Financial Pulse / System Pulse (Context Aware) */}
                {/* Domino: Delay 0 */}
                {/* Elevat Ecosystem / System Pulse */}
                {/* Domino: Delay 0 */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-0 relative overflow-hidden rounded-[30px] p-6 liquid-glass group md:col-span-2 xl:col-span-2">

                    {/* Liquid Background Gradient (Subtle) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] to-transparent opacity-100 pointer-events-none"></div>

                    {/* GRAPHIC ENGINE: Background Icon */}
                    <div className="absolute -right-6 -bottom-12 text-emerald-500 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none rotate-[-12deg]">
                        <Radar size={220} strokeWidth={1} />
                    </div>

                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500 opacity-20 blur-[50px] rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 shadow-glass-inset">
                                    <Database size={22} strokeWidth={1.5} className="icon-duotone" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-white tracking-tight">
                                        Ecosistema Elevat
                                    </h2>
                                    <p className="text-xs text-emerald-500/80 font-medium tracking-wide">Sincronización Neural</p>
                                </div>
                            </div>
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                <Check size={14} strokeWidth={2} />
                                ONLINE
                            </span>
                        </div>

                        {/* Integration Grid - Logic based on notionDocs */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                            {[
                                { id: 'hub', label: 'Hub Operativo', icon: '🎯', key: 'HUB' },
                                { id: 'clients', label: 'Clientes 2026', icon: '👥', key: 'Clientes' },
                                { id: 'tasks', label: 'Tareas Ops', icon: '✅', key: 'Tareas' },
                                { id: 'team', label: 'Equipo', icon: '🧠', key: 'Equipo' }
                            ].map((item) => {
                                // Check if this db exists in notionDocs
                                const isActive = notionDocs.some(doc => doc.title.includes(item.key));
                                return (
                                    <div key={item.id} className={`p-4 rounded-2xl border transition-all duration-500 ${isActive ? 'bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'bg-white/5 border-white/5 opacity-50 grayscale'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xl">{item.icon}</span>
                                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`}></div>
                                        </div>
                                        <h4 className="text-xs font-bold text-gray-200">{item.label}</h4>
                                        <p className="text-[10px] text-gray-500 mt-1">{isActive ? 'Sincronizado' : 'Pendiente'}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Elevat Intelligence (RAG) */}
                {/* Domino: Delay 100ms */}
                <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-lg font-semibold text-white">Portality Intelligence</h3>
                        <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/5 flex items-center gap-1">
                            <Database size={12} className="text-emerald-500 icon-duotone" />
                            RAG Vectorial
                        </span>
                    </div>

                    <div className="grid gap-3">
                        {!trainingMode?.active && notionDocs.length === 0 && (
                            <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-[24px]">
                                <p className="text-sm text-gray-500 font-medium">No documents synchronized yet.</p>
                                <p className="text-xs text-gray-600 mt-1">Connect Notion or ingest files to see them here.</p>
                            </div>
                        )}

                        {notionDocs.map(doc => (
                            <div key={doc.id} className="group relative p-4 rounded-[24px] liquid-glass hover:bg-white/[0.05] transition-all cursor-pointer overflow-hidden border-transparent hover:border-white/10">
                                {/* Internal Shine */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl filter drop-shadow-md grayscale group-hover:grayscale-0 transition-all duration-300">{doc.icon}</span>
                                            <h4 className="text-base font-medium text-gray-200 group-hover:text-theme-primary transition-colors">{doc.title}</h4>
                                        </div>
                                        <ArrowUpRight size={16} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300" />
                                    </div>
                                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed pl-1 font-light">
                                        {doc.summary}
                                    </p>
                                    <div className="flex items-center gap-2 mt-3 pl-1">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                                            {doc.tag}
                                        </span>
                                        <span className="text-[10px] text-gray-500 ml-auto">
                                            Actualizado {doc.lastEdited}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Neural Links / Integrations */}
                {/* Domino: Delay 200ms */}
                <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-lg font-semibold text-white">Neural Links</h3>
                        <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/5 flex items-center gap-1">
                            <Zap size={12} className="text-amber-500 icon-duotone" />
                            1-Click Connect
                        </span>
                    </div>

                    <div className="rounded-[30px] p-5 liquid-glass relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 blur-[80px]"></div>

                        <div className="flex flex-col gap-5 relative z-10">
                            {[
                                { id: 'sb', name: 'Supabase Database', icon: <Database size={18} className="icon-duotone" />, color: 'bg-[#3ECF8E]', status: 'Active', toggled: true },
                                { id: 'nt', name: 'Notion Workspace', icon: <FileText size={18} className="icon-duotone" />, color: 'bg-white text-black', status: 'Active', toggled: true },
                                { id: 'wa', name: 'WhatsApp Business', icon: <MessageCircle size={18} className="icon-duotone" />, color: 'bg-gray-700 opacity-50', status: 'Próximamente', toggled: false },
                                { id: 'st', name: 'Stripe Payments', icon: <CreditCard size={18} className="icon-duotone" />, color: 'bg-gray-700 opacity-50', status: 'Próximamente', toggled: false },
                                { id: 'gm', name: 'Google Workspace', icon: <Mail size={18} className="icon-duotone" />, color: 'bg-gray-700 opacity-50', status: 'Próximamente', toggled: false },
                            ].map((app, i) => (
                                <div key={app.id} className={`group flex items-center justify-between ${!app.toggled ? 'opacity-60 grayscale' : ''}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg ${app.color} transition-transform group-hover:scale-110`}>
                                            {app.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-200">{app.name}</span>
                                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'Active' ? 'bg-green-500' : 'bg-gray-600'} shadow-[0_0_5px_currentColor]`}></span>
                                                {app.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Toggle Switch Liquid */}
                                    <div className={`w-11 h-6 rounded-full relative transition-all border ${app.toggled ? 'bg-theme-primary/20 border-theme-primary/50' : 'bg-white/5 border-white/10'}`}>
                                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${app.toggled ? 'right-1 bg-theme-primary shadow-[0_0_8px_var(--primary)]' : 'left-1 bg-gray-500'}`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* F3: Chronos View (Agenda) */}
                {/* Domino: Delay 300ms */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 group rounded-[30px] p-6 liquid-glass relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity"></div>

                    {/* GRAPHIC ENGINE: Chronos Icon */}
                    <div className="absolute -right-8 -bottom-8 text-indigo-400 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none rotate-[15deg]">
                        <Hourglass size={180} strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <CalendarClock size={20} className="text-gray-400 icon-duotone" />
                                <h3 className="text-lg font-semibold text-white">Chronos</h3>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-primary bg-theme-primary/10 px-2.5 py-1 rounded-full border border-theme-primary/20 shadow-[0_0_10px_var(--primary-dim)]">
                                Ahora
                            </span>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="flex flex-col items-center pt-1">
                                <span className="text-sm font-bold text-white">10:00</span>
                                <div className="w-0.5 h-16 bg-gradient-to-b from-white/20 to-transparent my-2 rounded-full"></div>
                            </div>

                            <div className="flex-1">
                                <h4 className="text-xl font-medium text-white leading-snug">Review Q1 con Equipo</h4>
                                <p className="text-sm text-gray-400 mt-1 leading-relaxed font-light">Sincronización de objetivos y bloqueos.</p>

                                <div className="flex gap-3 mt-5">
                                    {/* Shining Button */}
                                    <div className="relative group/btn w-full">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-500 rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-200"></div>
                                        <button className="relative w-full bg-white text-black font-semibold text-sm py-3 px-4 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                                            <span>Unirse (Meet)</span>
                                            <ArrowUpRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* F2: Task Focus */}
                {/* Domino: Delay 400ms */}
                <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-lg font-semibold text-white">Foco Vital</h3>
                        <span className="text-xs font-bold text-gray-400 bg-white/5 px-3 py-1 rounded-full">{tasks.filter(t => !t.completed).length} pendientes</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {tasks.slice(0, 3).map((task, i) => (
                            <div key={task.id} className={`group relative flex items-center gap-4 p-4 rounded-[20px] liquid-glass hover:bg-white/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`} style={{ animationDelay: `${500 + (i * 100)}ms` }}>
                                <div className="relative flex-shrink-0">
                                    <input
                                        type="checkbox"
                                        defaultChecked={task.completed}
                                        className={`peer appearance-none w-6 h-6 border-2 rounded-full transition-all cursor-pointer ${task.priority === 'high' ? 'border-theme-primary/70' : 'border-gray-600'} checked:bg-theme-primary checked:border-transparent checked:shadow-neon`}
                                    />
                                    <Check className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={3} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium text-gray-200 truncate group-hover:text-theme-primary transition-colors">{task.title}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        {task.priority === 'high' && <span className="text-[10px] font-bold text-amber-400 tracking-wide">ALTA PRIORIDAD</span>}
                                        {task.tags?.map(tag => (
                                            <span key={tag} className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Lead Radar (Only for Andres/Christian) */}
                {(user.id === 'andrea' || user.id === 'christian') && (
                    <section className="mt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700">
                        <div className="flex items-center justify-between px-1 mb-3">
                            <h3 className="text-lg font-semibold text-white">Lead Radar (CRM)</h3>
                            <Radar className="w-5 h-5 text-theme-primary animate-spin-slow icon-duotone" strokeWidth={1.5} style={{ animationDuration: '4s' }} />
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 pl-1">
                            {leads.map(lead => (
                                <div key={lead.id} className="min-w-[170px] p-4 rounded-[24px] liquid-glass flex flex-col gap-3 transition-all hover:translate-y-[-4px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] group cursor-pointer border-transparent hover:border-white/10">
                                    <div className="flex items-start justify-between">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold text-white shadow-lg ${lead.color} group-hover:scale-110 transition-transform`}>
                                            {lead.initials}
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-theme-secondary bg-theme-secondary/10 px-2 py-0.5 rounded-full border border-theme-secondary/10">{lead.status}</span>
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-white leading-tight">{lead.name}</p>
                                        <p className="text-xs text-gray-500 mt-1 truncate">{lead.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Branding Footer - Full Width */}
            </div>{/* End Responsive Grid */}

            <div className="mt-12 mb-6 flex flex-col items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity animate-in fade-in duration-1000 delay-1000">
                <div className="liquid-glass flex items-center gap-2 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse shadow-[0_0_8px_var(--primary)]"></span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Beta v.1.0</span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium tracking-wide flex items-center gap-1.5">
                    Elevat, LLC <span className="w-0.5 h-2.5 bg-gray-700 rounded-full"></span> Powered by <span className="text-gray-300 font-semibold">Multiversa</span>
                </p>
            </div>

            <div className="h-6"></div>
        </main>
    );
};

export default Dashboard;