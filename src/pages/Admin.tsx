import React, { useState, useEffect } from 'react';
import { supabase, isMockMode } from '../lib/supabase';
import { toast } from 'sonner';
import {
  LogIn, LogOut, CheckCircle, XCircle, Clock, Trash2, Calendar,
  User, Phone, Mail, MapPin, Sparkles, Plus, Image as ImageIcon,
  FolderOpen, Settings as SettingsIcon, AlertCircle, RefreshCw,
  ChevronRight, BarChart2, TrendingUp, Users
} from 'lucide-react';

interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  message: string;
  status: string;
  notes: string;
}

interface Project {
  id: string;
  created_at: string;
  title: string;
  description: string;
  service_type: string;
  before_image_url: string;
  after_image_url: string;
  is_featured: boolean;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  New:       { label: 'New',       bg: 'bg-blue-950',   text: 'text-blue-400',   border: 'border-blue-900/40' },
  Contacted: { label: 'Contacted', bg: 'bg-amber-950',  text: 'text-amber-400',  border: 'border-amber-900/40' },
  Quoted:    { label: 'Quoted',    bg: 'bg-purple-950', text: 'text-purple-400', border: 'border-purple-900/40' },
  Completed: { label: 'Completed', bg: 'bg-green-950',  text: 'text-green-400',  border: 'border-green-900/40' },
  Archived:  { label: 'Archived',  bg: 'bg-gray-900',   text: 'text-gray-500',   border: 'border-gray-800' },
};

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'leads' | 'gallery' | 'settings'>('leads');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [leadStatus, setLeadStatus] = useState('');
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Gallery state
  const [projects, setProjects] = useState<Project[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    service_type: 'Land Clearing',
    before_image_url: '',
    after_image_url: '',
    is_featured: false
  });
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);

  // Site Settings state
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [settingsLoading, setSettingsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Admin CRM | Weldon Excavating LLC';

    // Check persisted session on mount
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
      if (session) loadData();
      setLoading(false);
    });

    // Subscribe to auth changes — fires on login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
      if (session) {
        loadData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadData = () => {
    fetchLeads();
    fetchProjects();
    fetchSettings();
  };

  // ─── Auth ─────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // session is set via onAuthStateChange — just show success
      toast.success('Welcome to the dashboard!');
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setLeads([]);
    setProjects([]);
    toast.success('Signed out successfully.');
  };

  // ─── Leads ────────────────────────────────────────────────────────────────
  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      toast.error('Error loading leads.');
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setLeadNotes(lead.notes || '');
    setLeadStatus(lead.status || 'New');
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: leadStatus, notes: leadNotes })
        .eq('id', selectedLead.id);
      if (error) throw error;
      toast.success('Lead updated!');
      setSelectedLead(prev => prev ? { ...prev, status: leadStatus, notes: leadNotes } : null);
      fetchLeads();
    } catch (err: any) {
      toast.error('Error updating lead.');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Delete this lead permanently?')) return;
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
      toast.success('Lead deleted.');
      if (selectedLead?.id === id) setSelectedLead(null);
      fetchLeads();
    } catch (err: any) {
      toast.error('Error deleting lead.');
    }
  };

  // ─── Gallery ──────────────────────────────────────────────────────────────
  const fetchProjects = async () => {
    setGalleryLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      toast.error('Error loading gallery.');
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === 'before') setUploadingBefore(true);
    else setUploadingAfter(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;
      const { error } = await supabase.storage.from('portfolio').upload(filePath, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      setNewProject(prev => ({ ...prev, [type === 'before' ? 'before_image_url' : 'after_image_url']: urlData.publicUrl }));
      toast.success(`${type === 'before' ? 'Before' : 'After'} photo uploaded!`);
    } catch {
      const localUrl = URL.createObjectURL(file);
      setNewProject(prev => ({ ...prev, [type === 'before' ? 'before_image_url' : 'after_image_url']: localUrl }));
      toast.info('Photo loaded locally (sandbox mode).');
    } finally {
      if (type === 'before') setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.after_image_url) {
      toast.error('Title and After photo are required.');
      return;
    }
    try {
      const { error } = await supabase.from('gallery_projects').insert(newProject);
      if (error) throw error;
      toast.success('Project published to gallery!');
      setNewProject({ title: '', description: '', service_type: 'Land Clearing', before_image_url: '', after_image_url: '', is_featured: false });
      fetchProjects();
    } catch (err: any) {
      toast.error('Failed to publish project.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Remove this project from the gallery?')) return;
    try {
      const { error } = await supabase.from('gallery_projects').delete().eq('id', id);
      if (error) throw error;
      toast.success('Project removed.');
      fetchProjects();
    } catch {
      toast.error('Error removing project.');
    }
  };

  // ─── Settings ─────────────────────────────────────────────────────────────
  const fetchSettings = async () => {
    setSettingsLoading(true);
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((s: any) => { map[s.key] = s.value; });
      setSettings(map);
    } catch {
      /* silent */
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleUpdateSetting = async (key: string, value: string) => {
    try {
      const { error } = await supabase.from('site_settings').update({ value }).eq('key', key);
      if (error) {
        const { error: insError } = await supabase.from('site_settings').insert({ key, value });
        if (insError) throw insError;
      }
      setSettings(prev => ({ ...prev, [key]: value }));
      toast.success(`"${key}" updated`);
    } catch {
      toast.error(`Error saving ${key}`);
    }
  };

  // ─── Computed Stats ───────────────────────────────────────────────────────
  const totalLeads   = leads.length;
  const newLeads     = leads.filter(l => l.status === 'New').length;
  const activeLeads  = leads.filter(l => ['Contacted', 'Quoted'].includes(l.status)).length;
  const closedLeads  = leads.filter(l => l.status === 'Completed').length;

  const filteredLeads = statusFilter === 'All'
    ? leads
    : leads.filter(l => l.status === statusFilter);

  // ─── Loading State ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-brand-yellow" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Loading...</span>
        </div>
      </div>
    );
  }

  // ─── Login Screen ─────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className="min-h-screen bg-brand-black industrial-grid flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo + Brand */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-brand-yellow/40 bg-white flex items-center justify-center p-1 mx-auto mb-5 shadow-[0_0_30px_rgba(234,179,8,0.15)]">
              <img src="/logo.jpg" alt="Weldon Excavating" className="object-contain w-full h-full" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-widest">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Weldon Excavating LLC — CRM & Site Manager</p>
          </div>

          {/* Sandbox Notice */}
          {isMockMode && (
            <div className="mb-5 p-4 rounded-lg bg-brand-yellow/10 border border-brand-yellow/30 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
              <div className="text-xs text-brand-yellow leading-relaxed">
                <span className="font-bold block mb-1">Sandbox Demo Mode</span>
                Email: <span className="font-mono font-bold text-white">admin@weldon.com</span><br />
                Password: <span className="font-mono font-bold text-white">weldon123</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <div className="bg-brand-charcoal border border-brand-border rounded-xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-yellow to-brand-yellowDark" />

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label htmlFor="admin-email" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Email Address
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@weldon.com"
                  className="glass-input"
                />
              </div>

              <div>
                <label htmlFor="admin-password" className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full py-4 mt-2 justify-center text-sm"
              >
                {authLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" /> Sign In to Dashboard
                  </span>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-600 mt-5">
            <a href="/" className="hover:text-gray-400 transition">← Back to Website</a>
          </p>
        </div>
      </div>
    );
  }

  // ─── Dashboard CRM ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-black flex flex-col text-gray-100">

      {/* CRM Top Bar */}
      <header className="bg-brand-charcoal border-b border-brand-border sticky top-0 z-50 shadow-lg">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded overflow-hidden bg-white border border-brand-border p-0.5 shrink-0">
              <img src="/logo.jpg" alt="Weldon" className="object-contain w-full h-full" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-black text-sm uppercase tracking-wider leading-none block">Weldon Excavating</span>
              <span className="text-brand-yellow text-[9px] font-bold uppercase tracking-widest">Admin Control Center</span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1">
            {[
              { id: 'leads', icon: FolderOpen, label: 'Leads', badge: newLeads > 0 ? newLeads : null },
              { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
              { id: 'settings', icon: SettingsIcon, label: 'Settings' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === tab.id
                    ? 'bg-brand-yellow text-brand-black shadow'
                    : 'text-gray-400 hover:text-white hover:bg-brand-slate/40'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {isMockMode && (
              <span className="hidden md:flex items-center gap-1.5 text-[9px] font-bold uppercase text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Sandbox
              </span>
            )}
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition font-semibold">
              View Site <ChevronRight className="w-3 h-3" />
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 hover:bg-red-950/30 px-3 py-2 rounded-md transition border border-transparent hover:border-red-900/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sandbox Warning Banner */}
      {isMockMode && (
        <div className="bg-brand-yellow/8 border-b border-brand-yellow/20 px-4 py-2.5 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-brand-yellow shrink-0" />
          <p className="text-xs text-brand-yellow">
            <span className="font-bold">Sandbox Mode:</span> Data is stored in this browser's localStorage. Connect real Supabase keys in <code className="font-mono bg-brand-black/40 px-1.5 py-0.5 rounded">.env</code> to go live.
          </p>
        </div>
      )}

      {/* Dashboard Body */}
      <main className="flex-1 max-w-screen-2xl w-full mx-auto px-4 sm:px-6 py-6">

        {/* ── TAB: LEADS ──────────────────────────────────────────────────── */}
        {activeTab === 'leads' && (
          <div className="flex flex-col gap-6">

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Leads',    value: totalLeads,  icon: Users,      color: 'text-blue-400' },
                { label: 'New / Unread',   value: newLeads,    icon: AlertCircle, color: 'text-red-400' },
                { label: 'Active Pipeline',value: activeLeads, icon: TrendingUp,  color: 'text-amber-400' },
                { label: 'Completed',      value: closedLeads, icon: CheckCircle, color: 'text-green-400' },
              ].map(stat => (
                <div key={stat.label} className="bg-brand-charcoal border border-brand-border rounded-xl p-4 flex items-center gap-4">
                  <div className={`${stat.color} bg-current/10 p-2.5 rounded-lg`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Leads Table + Detail Panel */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

              {/* Table */}
              <div className="xl:col-span-7 bg-brand-charcoal border border-brand-border rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="px-5 py-4 border-b border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-brand-yellow" /> Quote Submissions
                  </h2>
                  <div className="flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="text-xs bg-brand-black border border-brand-border text-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                    >
                      <option value="All">All Status</option>
                      {Object.keys(STATUS_CONFIG).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button onClick={fetchLeads} className="p-1.5 text-gray-500 hover:text-brand-yellow rounded-md hover:bg-brand-black transition">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {leadsLoading ? (
                  <div className="py-16 text-center text-gray-500 text-sm">Loading leads...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className="py-16 text-center text-gray-600">
                    <FolderOpen className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-semibold">No leads found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-[10px] uppercase tracking-widest text-gray-600 border-b border-brand-border/60 bg-brand-black/30">
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-2 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/30">
                        {filteredLeads.map(lead => {
                          const cfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.New;
                          const isSelected = selectedLead?.id === lead.id;
                          return (
                            <tr
                              key={lead.id}
                              onClick={() => handleSelectLead(lead)}
                              className={`cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-brand-yellow/8 border-l-2 border-brand-yellow'
                                  : 'hover:bg-brand-slate/20'
                              }`}
                            >
                              <td className="py-3 px-4 text-[11px] text-gray-500 whitespace-nowrap">
                                {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-white font-bold text-xs">{lead.name}</span>
                                {lead.phone && (
                                  <span className="block text-[10px] text-gray-500">{lead.phone}</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-[11px] text-brand-yellow font-semibold whitespace-nowrap">
                                {lead.service}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                                  {cfg.label}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-right" onClick={e => e.stopPropagation()}>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-1 text-gray-600 hover:text-red-500 rounded transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Lead Detail Panel */}
              <div className="xl:col-span-5">
                {selectedLead ? (
                  <div className="bg-brand-charcoal border border-brand-yellow/25 rounded-xl overflow-hidden">
                    {/* Panel Header */}
                    <div className="px-5 py-4 border-b border-brand-border/60 flex items-center justify-between gap-2">
                      <div>
                        <h2 className="text-sm font-black uppercase tracking-wider text-white">Lead Details</h2>
                        <p className="text-[10px] text-gray-600 font-mono mt-0.5">#{selectedLead.id.slice(0, 8)}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-brand-black/50 px-3 py-1.5 rounded-lg border border-brand-border">
                        <Calendar className="w-3 h-3" />
                        {new Date(selectedLead.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col gap-5">
                      {/* Client Info */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Client Information</p>
                        <div className="flex flex-col gap-2">
                          {[
                            { icon: User,   value: selectedLead.name,              href: null },
                            { icon: Phone,  value: selectedLead.phone,             href: `tel:${selectedLead.phone}` },
                            { icon: Mail,   value: selectedLead.email || '—',      href: selectedLead.email ? `mailto:${selectedLead.email}` : null },
                            { icon: MapPin, value: selectedLead.address,            href: null },
                          ].map(({ icon: Icon, value, href }) => (
                            <div key={value} className="flex items-start gap-3 p-3 bg-brand-black/40 rounded-lg border border-brand-border/40 text-sm">
                              <Icon className="w-3.5 h-3.5 text-brand-yellow shrink-0 mt-0.5" />
                              {href ? (
                                <a href={href} className="text-white hover:text-brand-yellow transition font-medium text-xs">{value}</a>
                              ) : (
                                <span className="text-gray-300 text-xs leading-snug">{value}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Service Request */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Service Requested</p>
                        <div className="p-3 bg-brand-black/40 rounded-lg border border-brand-border/40">
                          <span className="text-[10px] font-black uppercase text-brand-yellow tracking-wider block mb-1.5">{selectedLead.service}</span>
                          <p className="text-xs text-gray-400 leading-relaxed">{selectedLead.message || 'No additional details provided.'}</p>
                        </div>
                      </div>

                      {/* Admin Controls */}
                      <div className="border-t border-brand-border/40 pt-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-3">Manage Lead</p>
                        <div className="flex flex-col gap-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5">Pipeline Status</label>
                            <select
                              value={leadStatus}
                              onChange={e => setLeadStatus(e.target.value)}
                              className="glass-input text-xs"
                            >
                              {Object.keys(STATUS_CONFIG).map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5">Internal Notes</label>
                            <textarea
                              rows={3}
                              value={leadNotes}
                              onChange={e => setLeadNotes(e.target.value)}
                              placeholder="e.g. Called back, scheduled visit Thurs 2pm. Quoted $3,200."
                              className="glass-input text-xs resize-none"
                            />
                          </div>
                          <button onClick={handleUpdateLead} className="btn-primary py-2.5 justify-center text-xs font-bold uppercase">
                            <CheckCircle className="w-3.5 h-3.5" /> Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-brand-charcoal/50 border border-dashed border-brand-border rounded-xl py-16 text-center">
                    <FolderOpen className="w-8 h-8 mx-auto mb-3 text-gray-700" />
                    <p className="text-sm text-gray-600 font-semibold">Select a lead to view details</p>
                    <p className="text-xs text-gray-700 mt-1">Click any row in the table</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: GALLERY ────────────────────────────────────────────────── */}
        {activeTab === 'gallery' && (
          <div className="flex flex-col gap-6">

            {/* Add Project Form */}
            <div className="bg-brand-charcoal border border-brand-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-brand-border">
                <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-brand-yellow" /> Add Project to Gallery
                </h2>
              </div>
              <div className="p-5">
                <form onSubmit={handleAddProject} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Meta */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Project Title *</label>
                      <input
                        type="text" required
                        value={newProject.title}
                        onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))}
                        placeholder="e.g. 5-Acre Land Clearing & Stump Grinding"
                        className="glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Service Type</label>
                      <select
                        value={newProject.service_type}
                        onChange={e => setNewProject(p => ({ ...p, service_type: e.target.value }))}
                        className="glass-input text-xs"
                      >
                        <option value="Land Clearing">Land Clearing</option>
                        <option value="Grading & Site Prep">Grading & Site Prep</option>
                        <option value="Demolition">Demolition</option>
                        <option value="Driveways">Driveways</option>
                        <option value="Stump Grinding">Stump Grinding</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Description</label>
                      <textarea
                        rows={3}
                        value={newProject.description}
                        onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))}
                        placeholder="Brief summary of the job scope and outcome."
                        className="glass-input text-xs resize-none"
                      />
                    </div>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newProject.is_featured}
                        onChange={e => setNewProject(p => ({ ...p, is_featured: e.target.checked }))}
                        className="w-4 h-4 rounded border-brand-border bg-brand-black text-brand-yellow focus:ring-0"
                      />
                      <span className="text-xs text-gray-400 font-semibold">Feature on Homepage</span>
                    </label>
                  </div>

                  {/* Right: Photos */}
                  <div className="flex flex-col gap-5 border-l border-brand-border/40 pl-6">
                    {[
                      { type: 'before' as const, label: 'Before Photo', uploading: uploadingBefore, url: newProject.before_image_url, required: false },
                      { type: 'after' as const, label: 'After Photo *', uploading: uploadingAfter, url: newProject.after_image_url, required: true },
                    ].map(({ type, label, uploading, url }) => (
                      <div key={type}>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</label>
                        <input
                          type="file" accept="image/*"
                          onChange={e => handleImageUpload(e, type)}
                          className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-brand-black file:text-brand-yellow hover:file:bg-brand-slate/60 file:cursor-pointer"
                        />
                        {uploading && <p className="text-[10px] text-brand-yellow mt-1 font-semibold">Uploading...</p>}
                        {url && (
                          <div className="mt-2 h-24 w-36 rounded-lg overflow-hidden border border-brand-border shadow">
                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    ))}

                    <button type="submit" className="btn-primary py-3 justify-center text-xs font-black uppercase mt-auto">
                      <ImageIcon className="w-4 h-4" /> Publish to Gallery
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="bg-brand-charcoal border border-brand-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-brand-border flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  Published Projects ({projects.length})
                </h2>
                <button onClick={fetchProjects} className="p-1.5 text-gray-500 hover:text-brand-yellow rounded-md hover:bg-brand-black transition">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-5">
                {galleryLoading ? (
                  <div className="py-12 text-center text-sm text-gray-500">Loading gallery...</div>
                ) : projects.length === 0 ? (
                  <div className="py-12 text-center">
                    <ImageIcon className="w-8 h-8 mx-auto mb-3 text-gray-700" />
                    <p className="text-sm text-gray-600 font-semibold">No projects yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {projects.map(project => (
                      <div key={project.id} className="bg-brand-black/50 border border-brand-border rounded-xl overflow-hidden group relative flex flex-col">
                        {/* Delete Btn */}
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="absolute top-2 right-2 z-10 p-1.5 bg-red-950/90 text-red-400 hover:text-red-300 rounded-lg border border-red-900/40 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* After image */}
                        <div className="h-36 bg-brand-charcoal relative overflow-hidden">
                          {project.after_image_url ? (
                            <img src={project.after_image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-gray-700" />
                            </div>
                          )}
                          {project.before_image_url && (
                            <span className="absolute bottom-2 left-2 bg-brand-black/80 text-brand-yellow text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                              B/A Pair
                            </span>
                          )}
                          {project.is_featured && (
                            <span className="absolute top-2 left-2 bg-brand-yellow text-brand-black text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="p-3 flex flex-col gap-1.5 flex-1">
                          <p className="text-white font-bold text-xs leading-snug line-clamp-2">{project.title}</p>
                          {project.description && (
                            <p className="text-gray-600 text-[10px] line-clamp-2 leading-relaxed">{project.description}</p>
                          )}
                          <div className="mt-auto pt-2 border-t border-brand-border/30">
                            <span className="text-brand-yellow text-[9px] font-black uppercase tracking-wider">{project.service_type}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: SETTINGS ───────────────────────────────────────────────── */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl">
            <div className="bg-brand-charcoal border border-brand-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-brand-border">
                <h2 className="text-sm font-black uppercase tracking-wider text-white">Website NAP & Content Settings</h2>
                <p className="text-[10px] text-gray-500 mt-1">Changes auto-save on blur. Live Supabase required for persistent save.</p>
              </div>

              {settingsLoading ? (
                <div className="py-16 text-center text-sm text-gray-500">Loading settings...</div>
              ) : (
                <div className="p-5 flex flex-col gap-5">
                  {[
                    { key: 'slogan',       label: 'Main Slogan',         placeholder: 'Your Site. Our Strength.',                                        type: 'text' },
                    { key: 'tagline',      label: 'Support Tagline',     placeholder: 'Serving the area with reliable work',                             type: 'text' },
                    { key: 'phone',        label: 'Business Phone',      placeholder: '+1 256-223-7541',                                                  type: 'tel' },
                    { key: 'email',        label: 'Contact Email',       placeholder: 'weldonmatt@yahoo.com',                                             type: 'email' },
                    { key: 'address',      label: 'Business Address (NAP)', placeholder: '1485 Stockdale Rd, Munford, AL, United States',               type: 'text' },
                    { key: 'facebook_url', label: 'Facebook Page URL',   placeholder: 'https://www.facebook.com/people/Weldon-Excavating-LLC/...',        type: 'url' },
                  ].map(field => (
                    <div key={field.key} className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{field.label}</label>
                      <input
                        type={field.type}
                        defaultValue={settings[field.key] || ''}
                        placeholder={field.placeholder}
                        onBlur={e => handleUpdateSetting(field.key, e.target.value)}
                        className="glass-input text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
