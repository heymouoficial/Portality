import React, { useState } from 'react';
import { ArrowRight, Loader2, Sparkles, Fingerprint, Mail, Lock, Eye, EyeOff, ArrowLeft, Check, Command, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginViewProps {
  onLoginSuccess: (email: string) => void;
}

type AuthMode = 'landing' | 'login' | 'signup' | 'reset' | 'reset-sent';

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('landing');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data?.user?.email) {
        onLoginSuccess(data.user.email);
      }
    } catch (err: any) {
        // Fallback for demo users without Supabase Auth
        if (email.includes('elevat.io') || email.includes('multiversa.io')) {
             onLoginSuccess(email);
             return;
        }
      console.error('Login error:', err);
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Invite-Only Check Logic (Mocked for now, implies DB check in future)
    const normalizedEmail = email.toLowerCase();
    const isAllowed = 
        normalizedEmail.includes('@elevat.io') || 
        normalizedEmail.includes('multiversa') || 
        normalizedEmail.includes('runa') ||
        normalizedEmail === 'moshequantum@gmail.com' ||
        normalizedEmail === 'multiversagroup@gmail.com';

    if (!isAllowed) {
        setTimeout(() => {
            setError('Acceso restringido. Portality está en Closed Beta. Solicita una invitación a Multiversa Lab.');
            setLoading(false);
        }, 800);
        return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;

      if (data?.user?.email && !data.user.identities?.length) {
        setError('Este email ya está registrado. Intenta iniciar sesión.');
      } else if (data?.user) {
        setMode('reset-sent');
        setError(null);
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    // ... existing reset logic ...
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
      if (error) throw error;
      setMode('reset-sent');
    } catch (err: any) {
      setError(err.message || 'Error al enviar email');
    } finally {
        setLoading(false);
    }
  };

  const renderLanding = () => (
      <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-700">
          <div className="relative w-32 h-32 mb-8 group cursor-default">
              <div className="absolute inset-0 bg-violet-500 rounded-full blur-[60px] opacity-40 animate-pulse"></div>
              <div className="relative w-full h-full bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.1)] transition-transform duration-700 hover:scale-105">
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500/20 to-transparent opacity-50"></div>
                 <Sparkles size={48} className="text-violet-200 relative z-10 drop-shadow-[0_0_15px_rgba(167,139,250,0.8)]" strokeWidth={1} />
              </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/60 tracking-tighter mb-4 drop-shadow-sm">
              PORTALITY
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-medium tracking-[0.2em] mb-8 uppercase">
              By <span className="text-violet-400 font-bold">Multiversa Lab</span>
          </p>
          
          <div className="max-w-md space-y-4 mb-10 text-gray-400 text-sm leading-relaxed">
              <p>
                 El Sistema Operativo para Agencias Ágiles. 
                 Gestión de proyectos, inteligencia artificial y conocimiento centralizado.
              </p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs">
              <button 
                  onClick={() => setMode('login')}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-gray-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                  Member Access <ArrowRight size={16} />
              </button>
              <button 
                  onClick={() => window.open('https://multiversa.io', '_blank')}
                  className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm tracking-wide hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                  Explore Multiversa
              </button>
          </div>
      </div>
  );

  const renderForm = () => {
    if (mode === 'reset-sent') {
      return (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check size={32} className="text-emerald-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2">Revisa tu correo</h3>
            <p className="text-sm text-gray-400">Enlace enviado a <span className="text-emerald-400">{email}</span></p>
          </div>
          <button onClick={() => setMode('login')} className="text-sm text-emerald-400 hover:underline flex items-center gap-1">
            <ArrowLeft size={14} /> Volver
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={mode === 'login' ? handleLogin : mode === 'signup' ? handleSignup : handlePasswordReset} className="flex flex-col gap-5 w-full max-w-sm animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">{mode === 'login' ? 'Bienvenido' : mode === 'signup' ? 'Solicitar Acceso' : 'Recuperar'}</h2>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                {mode === 'login' ? 'Identifícate para continuar' : 'Closed Beta Invitation'}
            </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Corporativo</label>
                <div className="relative group">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@organizacion.com"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all font-mono"
                    />
                </div>
            </div>

            {mode !== 'reset' && (
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Contraseña</label>
                <div className="relative group">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all font-mono"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>
            )}
        </div>

        {error && (
          <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
            <Fingerprint size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {mode === 'login' && (
          <button type="button" onClick={() => { setMode('reset'); setError(null); }} className="text-xs text-gray-500 hover:text-violet-400 transition-colors text-right">
            ¿Olvidaste tu contraseña?
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="relative group w-full rounded-xl p-[1px] overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          <div className="absolute inset-[-100%] bg-conic from-violet-600 via-pink-400 to-violet-600 animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative h-full w-full bg-[#050505] rounded-xl flex items-center justify-center gap-2 py-3.5 group-hover:bg-[#0A0A0A] transition-colors">
            {loading ? <Loader2 size={18} className="animate-spin text-white" /> : (
              <span className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                {mode === 'login' ? 'Entrar al Portal' : mode === 'signup' ? 'Verificar Invitación' : 'Enviar'}
                {!loading && <ArrowRight size={14} />}
              </span>
            )}
          </div>
        </button>

        <div className="flex justify-center gap-1 text-xs mt-4">
          {mode === 'login' ? (
            <div className="text-gray-500">
               ¿Nueva organización? <button type="button" onClick={() => { setMode('signup'); setError(null); }} className="text-violet-400 hover:underline font-bold ml-1">Solicitar Beta</button>
            </div>
          ) : (
            <button type="button" onClick={() => { setMode('login'); setError(null); }} className="text-gray-400 hover:text-white flex items-center gap-1">
              <ArrowLeft size={12} /> Cancelar y volver
            </button>
          )}
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#020202] selection:bg-violet-500/30 font-sans">
      {/* BACKGROUND FX */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-violet-900/10 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {mode === 'landing' ? renderLanding() : renderForm()}
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-[10px] text-gray-700 font-mono flex items-center gap-4">
          <span className="flex items-center gap-1"><Command size={10} /> MULTIVERSA LAB</span>
          <span className="w-1 h-1 rounded-full bg-gray-800"></span>
          <span>SECURE GATEWAY v2.0</span>
      </div>
    </div>
  );
};

export default LoginView;