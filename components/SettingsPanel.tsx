import React, { useState } from 'react';
import { Sun, Moon, Monitor, X, Users, Shield, Key, Copy, Plus, Building2 } from 'lucide-react';
import { THEMES } from '../constants';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    currentTheme: string;
    onThemeChange: (theme: string) => void;
    currentColor: string;
    onColorChange: (colorKey: string) => void;
    currentProfileId: string;
    onProfileChange: (id: string) => void;
}

type Tab = 'general' | 'organization';

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
    isOpen, onClose, currentTheme, onThemeChange, currentColor, onColorChange, currentProfileId, onProfileChange
}) => {
    const [activeTab, setActiveTab] = useState<Tab>('general');

    const teamMembers = [
        { id: 'andrea', name: 'Andrea', role: 'CEO & Strategy', email: 'andrea@elevat.com', status: 'Active', avatar: 'A' },
        { id: 'moises', name: 'Moisés (Mou)', role: 'Head of Tech & AI', email: 'moshequantum@gmail.com', status: 'Active', avatar: 'M' },
        { id: 'christian', name: 'Christian', role: 'Head of Digital & Ecom', email: 'christian@elevat.com', status: 'Active', avatar: 'C' },
        { id: 'nae', name: 'Nae', role: 'Community Manager', email: 'nae@elevat.com', status: 'Pending', avatar: 'N' },
        { id: 'zabdiel', name: 'Zabdiel', role: 'CRM Specialist (Ext)', email: 'zabdiel@partner.com', status: 'Active', avatar: 'Z' },
    ];

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 backdrop-blur-sm ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Panel */}
            <div className={`fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-white/10 rounded-t-[30px] z-[70] transition-transform duration-300 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] h-[85vh] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Shield size={20} className="text-theme-primary" />
                        Configuración Aureon
                    </h3>
                    <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 mb-8">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-center gap-2 ${activeTab === 'general' ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Monitor size={16} />
                        General
                    </button>
                    <button
                        onClick={() => setActiveTab('organization')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-center gap-2 ${activeTab === 'organization' ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Building2 size={16} />
                        Organización
                    </button>
                </div>

                <div className="overflow-y-auto h-[calc(100%-180px)] pr-2 space-y-8">

                    {activeTab === 'general' && (
                        <>
                            {/* Theme Toggle */}
                            <div>
                                <span className="text-xs font-bold text-gray-500 mb-3 block uppercase tracking-wider">Apariencia</span>
                                <div className="flex p-1 bg-black rounded-xl border border-white/10">
                                    {(['light', 'dark', 'system'] as const).map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => onThemeChange(mode)}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex justify-center gap-2 ${currentTheme === mode ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:bg-white/5'}`}
                                        >
                                            {mode === 'light' && <Sun size={16} />}
                                            {mode === 'dark' && <Moon size={16} />}
                                            {mode === 'system' && <Monitor size={16} />}
                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Accents */}
                            <div>
                                <span className="text-xs font-bold text-gray-500 mb-3 block uppercase tracking-wider">Acento Visual</span>
                                <div className="grid grid-cols-4 gap-3">
                                    {Object.keys(THEMES).map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => onColorChange(key)}
                                            style={{ backgroundColor: THEMES[key].primary }}
                                            className={`h-12 rounded-full border-2 border-transparent hover:scale-105 active:scale-95 transition-transform relative ring-offset-2 ring-offset-[#0A0A0A] focus:ring-2 ${currentColor === key ? 'ring-2 ring-white' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'organization' && (
                        <>
                            {/* Organization Banner */}
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-theme-primary/20 flex items-center justify-center text-theme-primary border border-theme-primary/30">
                                        <Building2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">Elevat Inc.</h4>
                                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-theme-primary/10 text-theme-primary border border-theme-primary/20">PRO PLAN</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">ID: org_elevat_...</p>
                                </div>
                            </div>

                            {/* Team Members */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Miembros del Equipo</span>
                                    <button className="text-xs flex items-center gap-1 text-theme-primary hover:text-white transition-colors">
                                        <Plus size={14} /> Invitar
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {teamMembers.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold text-white border border-white/10">
                                                    {member.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{member.name} {member.id === 'moises' && <span className="text-xs text-gray-500">(Tú)</span>}</p>
                                                    <p className="text-xs text-gray-500">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${member.status === 'Active'
                                                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                    : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                    }`}>
                                                    {member.status === 'Active' ? 'Activo' : 'Pendiente'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* API Keys / Secure Enclave */}
                            <div>
                                <span className="text-xs font-bold text-gray-500 mb-3 block uppercase tracking-wider">Secure Enclave (API Keys)</span>
                                <div className="p-4 rounded-xl border border-dashed border-white/10 bg-black/40">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Key size={16} className="text-theme-primary" />
                                            <span className="text-sm font-medium">Supabase Service Role</span>
                                        </div>
                                        <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors">
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                    <div className="h-8 bg-white/5 rounded-lg w-full flex items-center px-3">
                                        <span className="text-xs text-gray-500 font-mono">sbp_live_8923...9283</span>
                                    </div>
                                    <p className="text-[10px] text-gray-600 mt-2 flex items-center gap-1">
                                        <Shield size={10} />
                                        Encriptado de extremo a extremo
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};