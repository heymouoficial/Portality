import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Users, UserPlus, Mail, Shield, MoreHorizontal, Star } from 'lucide-react';
import { getCurrentBrand } from '../config/branding';
import MemberInviteModal from './MemberInviteModal';
import { supabase } from '../lib/supabase';
const MemberSkeleton = () => (_jsxs("div", { className: "flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-white/5" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "w-32 h-4 bg-white/5 rounded mb-2" }), _jsx("div", { className: "w-48 h-3 bg-white/5 rounded" })] }), _jsx("div", { className: "w-20 h-6 bg-white/5 rounded" })] }));
const TeamView = ({ organizationId }) => {
    const brand = getCurrentBrand();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                // Fetch members for this org
                // Note: organization_members usually links user_id to profiles(id)
                // We assume organization_members has: organization_id, user_id, role
                const { data, error } = await supabase
                    .from('organization_members')
                    .select(`
                        role,
                        profiles:user_id (
                            id,
                            full_name,
                            email,
                            role
                        )
                    `)
                    .eq('organization_id', organizationId);
                if (error) {
                    // Fallback or just empty if error (table might be empty or permissions issue)
                    console.error('Error loading team:', error);
                    setMembers([]);
                }
                else if (data) {
                    const mappedMembers = data.map((item) => ({
                        id: item.profiles?.id || 'unknown',
                        name: item.profiles?.full_name || 'Usuario',
                        email: item.profiles?.email || '',
                        role: (item.roles || 'Member'), // Use org role preferably
                        status: 'active',
                        avatar: item.profiles?.full_name?.charAt(0) || 'U'
                    }));
                    setMembers(mappedMembers);
                }
            }
            catch (err) {
                console.error('Failed to fetch members:', err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, [organizationId]);
    // TODO: Implement Real Invitations Table
    const invitations = [];
    return (_jsxs("div", { className: "p-6 md:p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500", children: [_jsxs("div", { className: "flex items-center justify-between mb-10", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-black text-white tracking-tighter mb-2", children: "Equipo" }), _jsxs("p", { className: "text-gray-500 text-sm", children: ["Gestiona los accesos autorizados para ", _jsx("span", { className: "text-white font-bold", children: 
                                        // Try to find org name from members or passed prop? 
                                        // Prop is ID, usually we want name. 
                                        // Simplest: just ID for now or fetch Org Name (already done in parent usually)
                                        organizationId.toUpperCase() }), "."] })] }), _jsxs("button", { onClick: () => setIsInviteModalOpen(true), className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-500 transition-all active:scale-95 shadow-lg shadow-violet-500/20", children: [_jsx(UserPlus, { size: 18 }), "Invitar Socio"] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1", children: "Miembros Activos" }), _jsx("div", { className: "grid gap-3", children: loading ? (_jsxs(_Fragment, { children: [_jsx(MemberSkeleton, {}), _jsx(MemberSkeleton, {}), _jsx(MemberSkeleton, {})] })) : members.length > 0 ? (members.map((member) => (_jsxs("div", { className: "group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300 font-black text-lg", children: member.avatar || member.name.charAt(0) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-sm font-bold text-white truncate", children: member.name }), _jsx("p", { className: "text-xs text-gray-500 truncate", children: member.email })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex flex-col items-end gap-1", children: _jsxs("div", { className: "flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/5 border border-white/5", children: [_jsx(Shield, { size: 10, className: "text-gray-400" }), _jsx("span", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider", children: member.role })] }) }), _jsx("button", { className: "p-2 rounded-lg text-gray-600 hover:text-white hover:bg-white/5 transition-all", children: _jsx(MoreHorizontal, { size: 18 }) })] })] }, member.id)))) : (_jsxs("div", { className: "p-8 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]", children: [_jsx(Users, { className: "mx-auto h-8 w-8 text-white/20 mb-3" }), _jsx("p", { className: "text-sm text-gray-500", children: "No hay miembros en esta organizaci\u00F3n." })] })) })] }), invitations.length > 0 && (_jsxs("section", { className: "pt-4", children: [_jsx("h2", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1", children: "Invitaciones Pendientes" }), _jsx("div", { className: "grid gap-3", children: invitations.map((inv) => (_jsxs("div", { className: "flex items-center gap-4 p-4 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-600", children: _jsx(Mail, { size: 20 }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-sm font-medium text-gray-400 truncate", children: inv.email }), _jsxs("p", { className: "text-[10px] text-gray-600 uppercase tracking-widest mt-1", children: ["Enviada ", inv.sentAt] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { className: "text-[10px] font-bold text-gray-500 hover:text-white transition-colors px-3 py-1", children: "Reenviar" }), _jsx("button", { className: "text-[10px] font-bold text-red-500/50 hover:text-red-500 transition-colors px-3 py-1", children: "Cancelar" })] })] }, inv.id))) })] }))] }), _jsxs("div", { className: "mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-6", children: [_jsx("div", { className: "p-4 rounded-xl bg-violet-500/10 text-violet-400", children: _jsx(Star, { size: 24 }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-bold text-white mb-1", children: "Plan Closed Beta" }), _jsx("p", { className: "text-xs text-gray-500 leading-relaxed", children: "Actualmente puedes tener hasta **2 miembros** por organizaci\u00F3n. Contacta a Multiversa Lab para escalar tu equipo corporativo." })] })] }), _jsx(MemberInviteModal, { isOpen: isInviteModalOpen, onClose: () => setIsInviteModalOpen(false), organizationId: organizationId })] }));
};
export default TeamView;
