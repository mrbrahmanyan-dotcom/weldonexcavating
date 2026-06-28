import React, { useState, useEffect } from 'react';
import { supabase, isMockMode } from '../lib/supabase';
import { toast } from 'sonner';
import {
  LogIn, LogOut, CheckCircle, Clock, Trash2, Calendar, FileText,
  User, Phone, Mail, MapPin, Database, Sparkles, Plus, Image as ImageIcon,
  FolderOpen, Settings as SettingsIcon, AlertCircle
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

export default function Admin() {
  const [session, setSession] = useState<any>(null);
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
    document.title = "Admin Dashboard | Weldon Excavating LLC";
    
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadData();
      }
    });

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

  // Auth Operations
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Logged in successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Login failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
      toast.success('Logged out successfully.');
    } catch (err: any) {
      console.error(err);
      toast.error('Signout failed.');
    }
  };

  // Leads Operations
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
      console.error(err);
      toast.error('Error fetching leads.');
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
      toast.success('Lead updated successfully!');
      setSelectedLead(prev => prev ? { ...prev, status: leadStatus, notes: leadNotes } : null);
      fetchLeads();
    } catch (err: any) {
      console.error(err);
      toast.error('Error updating lead.');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
      toast.success('Lead deleted successfully.');
      if (selectedLead?.id === id) setSelectedLead(null);
      fetchLeads();
    } catch (err: any) {
      console.error(err);
      toast.error('Error deleting lead.');
    }
  };

  // Gallery Operations
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
      console.error(err);
      toast.error('Error fetching gallery.');
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

      const { data, error } = await supabase.storage.from('portfolio').upload(filePath, file);
      if (error) throw error;

      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      setNewProject(prev => ({
        ...prev,
        [type === 'before' ? 'before_image_url' : 'after_image_url']: publicUrl
      }));
      toast.success(`${type === 'before' ? 'Before' : 'After'} photo uploaded successfully!`);
    } catch (err: any) {
      console.error(err);
      toast.error('Image upload failed. Real bucket uploads require Supabase setup.');
      // Inject mock object url so it works in mock mode
      const localUrl = URL.createObjectURL(file);
      setNewProject(prev => ({
        ...prev,
        [type === 'before' ? 'before_image_url' : 'after_image_url']: localUrl
      }));
      toast.info('Fallback local URL injected for sandbox testing.');
    } finally {
      if (type === 'before') setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.after_image_url) {
      toast.error('Please enter a project title and upload at least the After photo.');
      return;
    }

    try {
      const { error } = await supabase.from('gallery_projects').insert(newProject);
      if (error) throw error;
      toast.success('Project added to portfolio!');
      setNewProject({
        title: '',
        description: '',
        service_type: 'Land Clearing',
        before_image_url: '',
        after_image_url: '',
        is_featured: false
      });
      fetchProjects();
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to add project.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const { error } = await supabase.from('gallery_projects').delete().eq('id', id);
      if (error) throw error;
      toast.success('Project removed from portfolio.');
      fetchProjects();
    } catch (err: any) {
      console.error(err);
      toast.error('Error deleting project.');
    }
  };

  // Settings Operations
  const fetchSettings = async () => {
    setSettingsLoading(true);
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      const settingsMap: Record<string, string> = {};
      data?.forEach((s: any) => {
        settingsMap[s.key] = s.value;
      });
      setSettings(settingsMap);
    } catch (err: any) {
      console.error(err);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleUpdateSetting = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key);
      if (error) {
        // If update failed (e.g. key doesn't exist), try to insert
        const { error: insError } = await supabase
          .from('site_settings')
          .insert({ key, value });
        if (insError) throw insError;
      }
      setSettings(prev => ({ ...prev, [key]: value }));
      toast.success(`Updated setting: ${key}`);
    } catch (err: any) {
      console.error(err);
      toast.error(`Error saving setting ${key}`);
    }
  };

  // Secure Auth Form View
  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 dark-gradient">
        <div className="glass-card max-w-md w-full border-brand-border bg-brand-charcoal/90 relative overflow-hidden p-8 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-yellow to-brand-yellowDark"></div>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded overflow-hidden border border-brand-border bg-white flex items-center justify-center p-0.5 mx-auto mb-4">
              <img src="/logo.jpg" alt="Weldon Excavating Logo" className="object-contain w-full h-full" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide">
              Admin Portal
            </h2>
            <p className="text-sm text-gray-500 mt-1">Weldon Excavating LLC Website Backend</p>
          </div>

          {isMockMode && (
            <div className="mb-6 p-4 rounded bg-brand-yellow/10 border border-brand-yellow/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
              <div className="text-xs text-brand-yellow">
                <span className="font-bold block">Sandbox Demo Mode Active</span>
                Please log in using:<br />
                Email: <span className="font-mono font-bold text-white">admin@weldon.com</span><br />
                Password: <span className="font-mono font-bold text-white">weldon123</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@weldon.com"
                className="glass-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="glass-input"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="btn-primary w-full py-3.5 mt-4 justify-center"
            >
              {authLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-brand-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authorizing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Log In Securely
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Main View
  return (
    <div className="min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-brand-border/60">
        <div>
          <span className="text-brand-yellow font-black text-xs uppercase tracking-widest block mb-1">
            Control Center
          </span>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider">
            Owner Dashboard
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="btn-outline py-2 px-4 text-xs font-bold uppercase tracking-wider border-red-900/50 hover:bg-red-950/20 text-red-400 hover:text-red-300"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>

      {/* Database Warning in Mock mode */}
      {isMockMode && (
        <div className="mb-8 p-4 rounded bg-brand-yellow/10 border border-brand-yellow/30 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-brand-yellow shrink-0" />
          <div className="text-xs text-brand-yellow">
            <span className="font-bold">Running with Sandbox Local Storage Database.</span> All lead submissions, notes, and gallery edits are stored locally in this browser. To deploy live, hook up Supabase keys in <span className="font-mono">.env</span>.
          </div>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-3 px-4 py-3 rounded-md font-bold text-xs uppercase tracking-wider text-left transition w-full whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-brand-yellow text-brand-black font-black shadow-brand'
                : 'bg-brand-charcoal text-gray-300 hover:text-white hover:bg-brand-slate/60'
            }`}
          >
            <FolderOpen className="w-4 h-4 shrink-0" /> Leads / Inquiries
            {leads.filter(l => l.status === 'New').length > 0 && (
              <span className="ml-auto bg-red-600 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-black animate-pulse">
                {leads.filter(l => l.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-3 px-4 py-3 rounded-md font-bold text-xs uppercase tracking-wider text-left transition w-full whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-brand-yellow text-brand-black font-black shadow-brand'
                : 'bg-brand-charcoal text-gray-300 hover:text-white hover:bg-brand-slate/60'
            }`}
          >
            <ImageIcon className="w-4 h-4 shrink-0" /> Gallery Manager
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-md font-bold text-xs uppercase tracking-wider text-left transition w-full whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-brand-yellow text-brand-black font-black shadow-brand'
                : 'bg-brand-charcoal text-gray-300 hover:text-white hover:bg-brand-slate/60'
            }`}
          >
            <SettingsIcon className="w-4 h-4 shrink-0" /> Site Settings
          </button>
        </div>

        {/* Tab Panel */}
        <div className="lg:col-span-9">
          {/* TAB 1: LEADS INQUIRIES */}
          {activeTab === 'leads' && (
            <div className="flex flex-col gap-6">
              {/* Leads Table */}
              <div className="glass-card border-brand-border bg-brand-charcoal/40 p-5 overflow-hidden">
                <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-4">
                  Quote Submissions
                </h2>
                
                {leadsLoading ? (
                  <div className="py-12 text-center text-gray-500 text-sm">Loading leads database...</div>
                ) : leads.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-sm">No lead submissions found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-300">
                      <thead className="text-xs uppercase tracking-wider text-gray-500 border-b border-brand-border/60 bg-brand-black/20">
                        <tr>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">City</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/40">
                        {leads.map((lead) => (
                          <tr
                            key={lead.id}
                            onClick={() => handleSelectLead(lead)}
                            className={`hover:bg-brand-charcoal cursor-pointer transition ${
                              selectedLead?.id === lead.id ? 'bg-brand-charcoal border-l-2 border-brand-yellow' : ''
                            }`}
                          >
                            <td className="py-3 px-4 whitespace-nowrap text-xs text-gray-500">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 font-bold text-white">{lead.name}</td>
                            <td className="py-3 px-4 text-xs text-brand-yellow font-semibold">{lead.service}</td>
                            <td className="py-3 px-4 text-xs">{lead.address.split(',')[1] || lead.address}</td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded ${
                                lead.status === 'New' ? 'bg-red-950 text-red-400 border border-red-900/40' :
                                lead.status === 'Contacted' ? 'bg-amber-950 text-amber-400 border border-amber-900/40' :
                                'bg-green-950 text-green-400 border border-green-900/40'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 text-red-500 hover:text-red-400 rounded hover:bg-brand-black"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Lead Details Viewer */}
              {selectedLead && (
                <div className="glass-card border-brand-yellow/30 bg-brand-charcoal p-6 flex flex-col gap-6">
                  <div className="flex justify-between items-start border-b border-brand-border/60 pb-4">
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-1">
                        Inquiry Details
                      </h2>
                      <span className="text-xs text-gray-500 font-semibold font-mono">ID: {selectedLead.id}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-bold flex items-center gap-1.5 bg-brand-black px-3 py-1 rounded border border-brand-border">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(selectedLead.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Info */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Client NAP</h3>
                      <div className="flex items-center gap-3 text-sm text-white font-bold bg-brand-black/40 p-3 rounded border border-brand-border/50">
                        <User className="w-4 h-4 text-brand-yellow shrink-0" />
                        <span>{selectedLead.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm bg-brand-black/40 p-3 rounded border border-brand-border/50">
                        <Phone className="w-4 h-4 text-brand-yellow shrink-0" />
                        <a href={`tel:${selectedLead.phone}`} className="text-white hover:text-brand-yellow font-bold transition">
                          {selectedLead.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-sm bg-brand-black/40 p-3 rounded border border-brand-border/50">
                        <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                        <a href={`mailto:${selectedLead.email}`} className="text-gray-300 hover:text-brand-yellow transition">
                          {selectedLead.email || 'No email provided'}
                        </a>
                      </div>
                      <div className="flex items-start gap-3 text-sm bg-brand-black/40 p-3 rounded border border-brand-border/50">
                        <MapPin className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
                        <span className="text-gray-300 leading-tight">{selectedLead.address}</span>
                      </div>
                    </div>

                    {/* Service & Message */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Project Description</h3>
                      <div className="p-3 bg-brand-black/40 border border-brand-border/50 rounded text-sm min-h-[100px] leading-relaxed">
                        <span className="block text-brand-yellow text-xs font-black uppercase mb-1.5">
                          Service: {selectedLead.service}
                        </span>
                        <p className="text-gray-300">{selectedLead.message || 'No description message provided.'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Notes Panel */}
                  <div className="border-t border-brand-border/60 pt-6 flex flex-col gap-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Internal Administration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Lead Status</label>
                        <select
                          value={leadStatus}
                          onChange={(e) => setLeadStatus(e.target.value)}
                          className="glass-input text-xs"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Completed">Completed</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Office Notes</label>
                        <input
                          type="text"
                          value={leadNotes}
                          onChange={(e) => setLeadNotes(e.target.value)}
                          placeholder="e.g. Scheduled quote visit for next Friday, quoted $2,400."
                          className="glass-input text-xs"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleUpdateLead}
                      className="btn-primary py-2.5 px-6 self-end text-xs font-bold uppercase mt-2"
                    >
                      Save Lead Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GALLERY MANAGER */}
          {activeTab === 'gallery' && (
            <div className="flex flex-col gap-8">
              {/* Add Project Form */}
              <div className="glass-card border-brand-border bg-brand-charcoal/40 p-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-brand-yellow" /> Add Project To Gallery
                </h2>

                <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Project Title
                      </label>
                      <input
                        type="text"
                        required
                        value={newProject.title}
                        onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. 5-Acre Stump Grinding & Clearing"
                        className="glass-input text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Service Type
                      </label>
                      <select
                        value={newProject.service_type}
                        onChange={(e) => setNewProject(prev => ({ ...prev, service_type: e.target.value }))}
                        className="glass-input text-xs"
                      >
                        <option value="Land Clearing">Land Clearing</option>
                        <option value="Grading & Site Prep">Grading & Site Prep</option>
                        <option value="Demolition">Demolition</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Description / Work Summary
                      </label>
                      <textarea
                        rows={3}
                        value={newProject.description}
                        onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Briefly summarize soil compaction, thickness of timber, or grading levels."
                        className="glass-input text-xs resize-none"
                      ></textarea>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        id="is_featured"
                        checked={newProject.is_featured}
                        onChange={(e) => setNewProject(prev => ({ ...prev, is_featured: e.target.checked }))}
                        className="w-4 h-4 text-brand-yellow bg-brand-black border-brand-border focus:ring-0 rounded"
                      />
                      <label htmlFor="is_featured" className="text-xs text-gray-400 font-bold uppercase">
                        Feature on Homepage Slider
                      </label>
                    </div>
                  </div>

                  {/* Photo Uploaders */}
                  <div className="flex flex-col gap-6 border-l border-brand-border/40 pl-6">
                    {/* Before Photo */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Before Photo
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'before')}
                          className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-brand-charcoal file:text-brand-yellow hover:file:bg-brand-slate"
                        />
                        {uploadingBefore && <span className="text-xs text-brand-yellow font-semibold">Uploading...</span>}
                      </div>
                      {newProject.before_image_url && (
                        <div className="mt-2 h-20 w-32 rounded overflow-hidden border border-brand-border">
                          <img src={newProject.before_image_url} alt="Before preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    {/* After Photo */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        After Photo (Required)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'after')}
                          className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-brand-charcoal file:text-brand-yellow hover:file:bg-brand-slate"
                        />
                        {uploadingAfter && <span className="text-xs text-brand-yellow font-semibold">Uploading...</span>}
                      </div>
                      {newProject.after_image_url && (
                        <div className="mt-2 h-20 w-32 rounded overflow-hidden border border-brand-border">
                          <img src={newProject.after_image_url} alt="After preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-3 text-xs uppercase font-extrabold mt-auto justify-center"
                    >
                      Publish Project
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Items list */}
              <div className="glass-card border-brand-border bg-brand-charcoal/40 p-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">
                  Published Gallery List
                </h2>

                {galleryLoading ? (
                  <div className="text-center py-10 text-sm text-gray-500">Loading gallery portfolio...</div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-10 text-sm text-gray-500">No project pictures uploaded yet.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="p-3 bg-brand-black/40 border border-brand-border rounded-lg flex flex-col justify-between h-full relative group">
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="absolute top-2 right-2 p-1.5 bg-red-950 text-red-500 hover:text-red-400 rounded-md border border-red-900/30 opacity-0 group-hover:opacity-100 transition z-10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        
                        <div>
                          <div className="h-32 rounded overflow-hidden border border-brand-border/60 bg-black relative">
                            <img src={project.after_image_url} alt={project.title} className="w-full h-full object-cover" />
                            {project.before_image_url && (
                              <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-brand-black/90 text-brand-yellow font-bold text-[8px] uppercase rounded">
                                B/A Pair
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-white text-sm mt-3 leading-tight">{project.title}</h3>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                        </div>

                        <div className="text-[9px] font-bold uppercase tracking-wider text-brand-yellow mt-3 border-t border-brand-border/30 pt-2.5">
                          {project.service_type}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="glass-card border-brand-border bg-brand-charcoal/40 p-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">
                Website Meta & NAP Settings
              </h2>

              {settingsLoading ? (
                <div className="py-12 text-center text-gray-500 text-sm">Loading global settings...</div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Slogan */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Main Slogan
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        defaultValue={settings.slogan || 'Your Site. Our Strength.'}
                        onBlur={(e) => handleUpdateSetting('slogan', e.target.value)}
                        className="glass-input text-xs"
                      />
                    </div>
                  </div>

                  {/* Slogan details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Tagline / Support line
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        defaultValue={settings.tagline || 'Serving the area with reliable work'}
                        onBlur={(e) => handleUpdateSetting('tagline', e.target.value)}
                        className="glass-input text-xs"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Contact Phone
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        defaultValue={settings.phone || '+1 256-223-7541'}
                        onBlur={(e) => handleUpdateSetting('phone', e.target.value)}
                        className="glass-input text-xs"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Contact Email
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        defaultValue={settings.email || 'weldonmatt@yahoo.com'}
                        onBlur={(e) => handleUpdateSetting('email', e.target.value)}
                        className="glass-input text-xs"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      NAP Address
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        defaultValue={settings.address || '1485 Stockdale Rd, Munford, AL, United States'}
                        onBlur={(e) => handleUpdateSetting('address', e.target.value)}
                        className="glass-input text-xs"
                      />
                    </div>
                  </div>

                  {/* Facebook URL */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Facebook Page link
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        defaultValue={settings.facebook_url || 'https://www.facebook.com/people/Weldon-Excavating-LLC/61556214349918/'}
                        onBlur={(e) => handleUpdateSetting('facebook_url', e.target.value)}
                        className="glass-input text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
