# Weldon Excavating LLC — Website

A high-converting, production-ready, lead-generating website for **Weldon Excavating LLC** based in Munford, Alabama.

## 🌐 Live Pages

| Page | Route |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Services | `/services` |
| Land Clearing | `/services/land-clearing` |
| Grading & Site Prep | `/services/grading-prep` |
| Demolition | `/services/demolition` |
| Project Gallery | `/gallery` |
| Contact Us | `/contact` |
| Admin Dashboard | `/admin` |

## 🛠️ Tech Stack

- **React 18** + **TypeScript** + **Vite 8**
- **Tailwind CSS v3** — Industrial yellow/black design system
- **Supabase** — Database, Auth, Storage (with local mock fallback)
- **React Router DOM v6** — Client-side routing
- **Lucide React** — Icons

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ⚙️ Environment Setup

Create a `.env` file (see `.env.example`):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Without real credentials, the site runs in **Sandbox Demo Mode** with a local mock database.

## 🔑 Admin Portal

Visit `/admin` and log in with:

| Mode | Email | Password |
|---|---|---|
| Sandbox Demo | `admin@weldon.com` | `weldon123` |
| Live (Supabase) | Your Supabase Auth user | Your password |

## 📋 Database Setup

Run the SQL in `supabase/migrations/20260628000000_init.sql` in your Supabase SQL editor to create:

- `leads` — Form submissions / quote requests
- `gallery_projects` — Before & After portfolio photos
- `site_settings` — CMS content (slogan, phone, address, etc.)

## 📞 Business Info

**Weldon Excavating LLC**  
1485 Stockdale Rd, Munford, AL 36268  
📞 (256) 223-7541 | 📧 weldonmatt@yahoo.com  
*"Your Site. Our Strength."*
