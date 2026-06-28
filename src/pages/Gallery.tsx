import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { Camera, Image as ImageIcon, Loader } from 'lucide-react';

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

export default function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  // Before/After toggle state per project ID
  const [toggledProjects, setToggledProjects] = useState<Record<string, 'before' | 'after'>>({});

  useEffect(() => {
    document.title = "Our Projects & Before/After Gallery | Weldon Excavating LLC";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'See our local excavation, land clearing, and site prep projects in Munford, AL. Proof of our rugged, high-quality, and reliable work.');
    }
    
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);

      // Initialize all toggle states to 'after' (the finished project)
      const initialToggles: Record<string, 'before' | 'after'> = {};
      data?.forEach((proj: Project) => {
        initialToggles[proj.id] = 'after';
      });
      setToggledProjects(initialToggles);
    } catch (err: any) {
      console.error(err);
      toast.error('Error fetching gallery projects.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (id: string, state: 'before' | 'after') => {
    setToggledProjects(prev => ({ ...prev, [id]: state }));
  };

  const filtersList = ['All', 'Land Clearing', 'Grading & Site Prep', 'Demolition'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.service_type === activeFilter);

  return (
    <div>
      {/* Header */}
      <section className="bg-brand-charcoal py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-brand-yellow font-black text-xs uppercase tracking-widest block mb-2">
            Work Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-wide mb-4">
            Before & After Transformations
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A visual showcase of our land clearing, stump grinding, grading, and structural demolition work.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-brand-border/40 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {filtersList.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider border transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-brand-yellow text-brand-black border-brand-yellow font-black shadow-brand'
                  : 'bg-transparent text-gray-400 border-brand-border hover:text-white hover:border-gray-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-10 h-10 text-brand-yellow animate-spin mb-4" />
            <p className="text-gray-500 text-sm">Loading portfolio database...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 font-bold text-base mb-1">No Projects Found</p>
            <p className="text-gray-500 text-sm">Check back later or log in to the admin panel to add images.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredProjects.map((project) => {
              const currentState = toggledProjects[project.id] || 'after';
              const displayImage = currentState === 'after'
                ? project.after_image_url
                : project.before_image_url;

              return (
                <div key={project.id} className="glass-card border-brand-border hover:border-brand-border/80 flex flex-col justify-between h-full bg-brand-charcoal/40 p-4 transition duration-300">
                  <div>
                    {/* Before / After Interactive Viewport */}
                    <div className="relative h-80 w-full rounded overflow-hidden border border-brand-border/60 bg-black">
                      <img
                        src={displayImage || '/equipment-hero.png'}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                      
                      {/* State Tags */}
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        {project.before_image_url && (
                          <button
                            onClick={() => handleToggle(project.id, 'before')}
                            className={`px-3 py-1 text-[10px] uppercase font-black tracking-widest rounded transition-all ${
                              currentState === 'before'
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'bg-brand-black/80 text-gray-400 hover:text-white'
                            }`}
                          >
                            Before
                          </button>
                        )}
                        {project.after_image_url && (
                          <button
                            onClick={() => handleToggle(project.id, 'after')}
                            className={`px-3 py-1 text-[10px] uppercase font-black tracking-widest rounded transition-all ${
                              currentState === 'after'
                                ? 'bg-green-600 text-white shadow-lg'
                                : 'bg-brand-black/80 text-gray-400 hover:text-white'
                            }`}
                          >
                            After
                          </button>
                        )}
                      </div>

                      {/* Service Category Tag */}
                      <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-brand-black/80 border border-brand-border text-brand-yellow font-bold text-xs uppercase tracking-wider rounded">
                        {project.service_type}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-5 mb-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="text-[10px] text-gray-600 font-bold uppercase border-t border-brand-border/30 pt-3 flex justify-between items-center">
                    <span>Weldon Excavating LLC</span>
                    <span>{new Date(project.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
