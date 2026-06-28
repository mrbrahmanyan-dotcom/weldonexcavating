import { createClient } from '@supabase/supabase-js';

// Read env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Determine if we should run in Mock mode (no credentials provided)
export const isMockMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder');

// Fallback Mock database for local testing
const getLocalStorageData = (key: string, defaultValue: any) => {
  try {
    const data = localStorage.getItem(`weldon_mock_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setLocalStorageData = (key: string, value: any) => {
  try {
    localStorage.setItem(`weldon_mock_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

// Seed initial mock data
if (isMockMode) {
  // Seed site settings
  if (!localStorage.getItem('weldon_mock_site_settings')) {
    setLocalStorageData('site_settings', [
      { key: 'slogan', value: 'Your Site. Our Strength.' },
      { key: 'tagline', value: 'Serving the area with reliable work' },
      { key: 'phone', value: '+1 256-223-7541' },
      { key: 'email', value: 'weldonmatt@yahoo.com' },
      { key: 'address', value: '1485 Stockdale Rd, Munford, AL, United States' },
      { key: 'facebook_url', value: 'https://www.facebook.com/people/Weldon-Excavating-LLC/61556214349918/' }
    ]);
  }

  // Seed gallery projects
  if (!localStorage.getItem('weldon_mock_gallery_projects')) {
    setLocalStorageData('gallery_projects', [
      {
        id: 'mock-proj-1',
        created_at: new Date().toISOString(),
        title: 'Commercial Site Prep & Grading',
        description: 'Completed site grading and preparation for a new commercial warehouse in Munford area. Leveled the ground and prepared it for concrete foundation.',
        service_type: 'Grading & Site Prep',
        before_image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
        after_image_url: '/equipment-hero.png',
        is_featured: true
      },
      {
        id: 'mock-proj-2',
        created_at: new Date().toISOString(),
        title: 'Lot Land Clearing',
        description: 'Cleared 3 acres of dense forest and underbrush for a residential building site.',
        service_type: 'Land Clearing',
        before_image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        after_image_url: 'https://images.unsplash.com/photo-1579847259074-ce4607c39ff9?auto=format&fit=crop&w=800&q=80',
        is_featured: true
      },
      {
        id: 'mock-proj-3',
        created_at: new Date().toISOString(),
        title: 'Residential Demolition & Clean Up',
        description: 'Demolished an old, unsafe structure and cleared all debris, stump grinding included.',
        service_type: 'Demolition',
        before_image_url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80',
        after_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        is_featured: false
      }
    ]);
  }

  // Seed leads
  if (!localStorage.getItem('weldon_mock_leads')) {
    setLocalStorageData('leads', [
      {
        id: 'mock-lead-1',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
        name: 'John Smith',
        phone: '256-555-0199',
        email: 'jsmith@gmail.com',
        address: '240 East St, Munford, AL',
        service: 'Land Clearing',
        message: 'Need around 2 acres cleared for a driveway and new mobile home site.',
        status: 'New',
        notes: ''
      },
      {
        id: 'mock-lead-2',
        created_at: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
        name: 'Sarah Davis',
        phone: '256-555-0143',
        email: 'sarah.d@yahoo.com',
        address: 'Oxford, AL',
        service: 'Grading & Site Prep',
        message: 'Grading needed for a backyard patio construction. Easy access.',
        status: 'Contacted',
        notes: 'Called Sarah, scheduled site visit for Tuesday.'
      }
    ]);
  }
}

// Create real Supabase client (only initialized if env vars are present)
const realSupabase = !isMockMode ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Module-level auth-state listener registry for mock mode
const mockAuthListeners: Array<(event: string, session: any) => void> = [];

// Mock database query builder interface
class MockQueryBuilder {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(_columns: string = '*') {
    const data = getLocalStorageData(this.tableName, []);
    return {
      data,
      error: null,
      order: (column: string, { ascending } = { ascending: true }) => {
        const sorted = [...data].sort((a: any, b: any) => {
          if (a[column] < b[column]) return ascending ? -1 : 1;
          if (a[column] > b[column]) return ascending ? 1 : -1;
          return 0;
        });
        return { data: sorted, error: null };
      }
    };
  }

  insert(values: any) {
    const data = getLocalStorageData(this.tableName, []);
    const newItems = Array.isArray(values) ? values : [values];
    const inserted = newItems.map(item => ({
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      status: 'New',
      ...item
    }));
    setLocalStorageData(this.tableName, [...inserted, ...data]);
    return { data: inserted, error: null };
  }

  update(values: any) {
    return {
      eq: (column: string, value: any) => {
        const data = getLocalStorageData(this.tableName, []);
        let updatedCount = 0;
        const updated = data.map((item: any) => {
          if (item[column] === value) {
            updatedCount++;
            return { ...item, ...values };
          }
          return item;
        });
        setLocalStorageData(this.tableName, updated);
        return { data: updated, error: null, count: updatedCount };
      }
    };
  }

  delete() {
    return {
      eq: (column: string, value: any) => {
        const data = getLocalStorageData(this.tableName, []);
        const filtered = data.filter((item: any) => item[column] !== value);
        setLocalStorageData(this.tableName, filtered);
        return { data: filtered, error: null };
      }
    };
  }
}

// Export mock client / real client wrapper
export const supabase = !isMockMode ? realSupabase! : {
  auth: {
    signInWithPassword: async ({ email, password }: any) => {
      if (email === 'admin@weldon.com' && password === 'weldon123') {
        const mockUser = { id: 'mock-admin', email };
        const mockSession = { access_token: 'mock-token', user: mockUser };
        setLocalStorageData('session', mockSession);
        // Fire all registered onAuthStateChange listeners so React state updates immediately
        mockAuthListeners.forEach(cb => cb('SIGNED_IN', mockSession));
        return { data: { user: mockUser, session: mockSession }, error: null };
      }
      return { data: { user: null, session: null }, error: { message: 'Invalid credentials. Use admin@weldon.com and weldon123' } };
    },
    signOut: async () => {
      localStorage.removeItem('weldon_mock_session');
      // Fire all listeners with null session
      mockAuthListeners.forEach(cb => cb('SIGNED_OUT', null));
      return { error: null };
    },
    getSession: async () => {
      const session = getLocalStorageData('session', null);
      return { data: { session }, error: null };
    },
    onAuthStateChange: (callback: any) => {
      mockAuthListeners.push(callback);
      return { data: { subscription: { unsubscribe: () => {
        const idx = mockAuthListeners.indexOf(callback);
        if (idx > -1) mockAuthListeners.splice(idx, 1);
      } } } };
    }
  },
  from: (tableName: string) => {
    return new MockQueryBuilder(tableName);
  },
  storage: {
    from: (_bucketName: string) => ({
      upload: async (path: string, file: any) => {
        const url = URL.createObjectURL(file);
        return { data: { path, fullPath: url }, error: null };
      },
      getPublicUrl: (path: string) => {
        return { data: { publicUrl: path.startsWith('blob:') ? path : 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' } };
      }
    })
  }
} as any;

