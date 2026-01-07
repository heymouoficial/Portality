import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Mail, Shield, ArrowRight, Loader2, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
const MemberInviteModal = ({ isOpen, onClose, organizationId }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('member');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    if (!isOpen)
        return null;
    const handleInvite = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            // 1. Encontrar ID del usuario por Email en la tabla de perfiles
            const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('id')
                .eq('email', email.toLowerCase().trim())
                .single();
            if (userError || !userData) {
                throw new Error('El usuario no está registrado en Portality. Invítalo primero a la plataforma.');
            }
            // 2. Insertar en la relación de miembros
            const { error: memberError } = await supabase
                .from('organization_members')
                .insert({
                organization_id: organizationId,
                user_id: userData.id,
                role: role
            });
            if (memberError) {
                if (memberError.code === '23505')
                    throw new Error('Este usuario ya es miembro de la organización.');
                throw memberError;
            }
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setEmail('');
            }, 3000);
        }
        catch (err) {
            console.error('[Invite] Error:', err);
            setError(err.message || 'Error al enviar invitación');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300", children: _jsxs("div", { className: "w-full max-w-md bg-[#0a0a0b] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300", children: [_jsxs("div", { className: "p-6 flex items-center justify-between border-b border-white/5", children: [_jsx("h2", { className: "text-xl font-black text-white tracking-tight", children: "Invitar Compa\u00F1ero" }), _jsx("button", { onClick: onClose, className: "p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all", children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "p-8", children: isSuccess ? (_jsxs("div", { className: "py-10 flex flex-col items-center text-center animate-in scale-in duration-500", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6", children: _jsx(Check, { size: 32, className: "text-emerald-400" }) }), _jsx("h3", { className: "text-lg font-bold text-white mb-2", children: "Invitaci\u00F3n Enviada" }), _jsxs("p", { className: "text-sm text-gray-500 leading-relaxed", children: ["Hemos enviado un enlace de acceso a ", _jsx("br", {}), _jsx("span", { className: "text-white font-mono", children: email })] })] })) : (_jsxs("form", { onSubmit: handleInvite, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1", children: "Email del Invitado" }), _jsxs("div", { className: "relative group", children: [_jsx(Mail, { size: 18, className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" }), _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "compa\u00F1ero@organizacion.com", className: "w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1", children: "Nivel de Acceso" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("button", { type: "button", onClick: () => setRole('member'), className: `p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${role === 'member' ? 'bg-violet-500/10 border-violet-500/50 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'}`, children: [_jsx(Mail, { size: 16 }), _jsx("span", { className: "text-[10px] font-bold uppercase", children: "Member" })] }), _jsxs("button", { type: "button", onClick: () => setRole('admin'), className: `p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${role === 'admin' ? 'bg-violet-500/10 border-violet-500/50 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'}`, children: [_jsx(Shield, { size: 16 }), _jsx("span", { className: "text-[10px] font-bold uppercase", children: "Admin" })] })] })] }), error && (_jsxs("div", { className: "p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-[11px] text-red-400 animate-in shake duration-300", children: [_jsx(X, { size: 14, className: "shrink-0" }), error] })), _jsxs("div", { className: "pt-4", children: [_jsx("button", { type: "submit", disabled: isLoading || !email, className: "w-full py-4 rounded-xl bg-violet-600 text-white font-black text-sm tracking-wide hover:bg-violet-500 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20", children: isLoading ? _jsx(Loader2, { size: 18, className: "animate-spin" }) : (_jsxs(_Fragment, { children: ["Enviar Invitaci\u00F3n", _jsx(ArrowRight, { size: 18 })] })) }), _jsxs("p", { className: "text-[10px] text-gray-600 text-center mt-4 uppercase tracking-tighter", children: ["Esta acci\u00F3n autorizar\u00E1 permanentemente al usuario en ", organizationId] })] })] })) })] }) }));
};
export default MemberInviteModal;
