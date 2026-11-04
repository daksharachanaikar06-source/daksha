# Franchise & Investment Summit – Event Management Platform

A reusable, full-stack Event Management Website built with **Next.js**, **Drizzle ORM**, **Neon Postgres**, and **Vercel**.

This project is designed so that **college students with little or no programming experience** can deploy it using only the GitHub website and Vercel dashboard — **no terminal commands required**.

---

## What is included

### Public Website
- Premium editorial design (deep charcoal + warm gold)
- Home, About, Agenda, Speakers, Brands, Venue, Registration pages
- Fully responsive
- Content driven from database (Event Configuration)

### Registration & Ticketing
- Configurable ticket types (General, Business Access, Investor Connect, etc.)
- Unique Registration ID + Ticket Number
- Unique QR code generation for every registration
- Ticket verification / check-in support

### Administration
- Secure login
- Role-based access (Super Admin, Event Manager, Registration Manager, Check-in Staff…)
- Event Configuration (name, tagline, dates, venue, branding colours)
- Seed data already contains the Franchise & Investment Summit content

### Email
- Resend integration ready
- Registration confirmation template included

### Database
- Complete Drizzle schema
- Seed script with summit agenda, ticket types, SPOCs, and Super Admin account

---

## Student Deployment Guide (No Terminal Required)

### Step 1 – Download
Download the `Event_Management_Platform.zip` file and extract it on your computer.

### Step 2 – Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it something like `franchise-investment-summit`.
4. Keep it **Public**.
5. Click **Create repository**.
6. On the new empty repository page, click **uploading an existing file**.
7. Drag and drop **all** the extracted project files into the browser.
8. Click **Commit changes**.

### Step 3 – Create a Neon Database
1. Go to [neon.tech](https://neon.tech) and create a free account.
2. Create a new project.
3. Copy the **connection string** (it looks like `postgresql://...@ep-xxx.../neondb?sslmode=require`).

### Step 4 – Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New… → Project**.
3. Import the GitHub repository you just created.
4. Before clicking Deploy, open **Environment Variables** and add:

| Name               | Value                                      |
|--------------------|--------------------------------------------|
| `DATABASE_URL`     | Your Neon connection string                |
| `AUTH_SECRET`      | Any long random string (e.g. 32+ characters) |
| `NEXT_PUBLIC_APP_URL` | Leave blank for now (update after first deploy) |
| `RESEND_API_KEY`   | (optional for now)                         |
| `RESEND_FROM_EMAIL`| (optional for now)                         |

5. Click **Deploy**.

### Step 5 – Run Database Setup
After the first successful deploy:
1. In Vercel → your project → **Settings → Environment Variables**, update `NEXT_PUBLIC_APP_URL` to your live Vercel URL (e.g. `https://your-project.vercel.app`).
2. Redeploy.
3. To seed the database (create tables + summit data + admin user), you will need to run the seed once.  
   Because students cannot use a terminal easily, the recommended approach is:
   - Use the Neon SQL Editor to run the generated migration SQL, **or**
   - Contact the project maintainer to help run `npm run db:push` + `npm run db:seed` once the `DATABASE_URL` is set.

**Default Super Admin login (after seed):**
- Email: `admin@franchiseinvestment.summit`
- Password: `Admin@12345`

**Change this password immediately after first login.**

---

## Local Development (for developers)

```bash
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL and AUTH_SECRET
npm run db:push
npm run db:seed
npm run dev
```

---

## Important Notes

- Event dates, venue, and final ticket prices are **To Be Announced**. Update them from the admin dashboard once confirmed.
- Do not publish unconfirmed speakers or brands.
- Never commit the real `.env` file.
- Image storage is currently placeholder-based. Cloudinary or Vercel Blob can be added later.

---

## Project Structure

```
Event_Management_Platform/
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   ├── components/          # UI components
│   ├── db/
│   │   ├── schema.ts        # Complete database schema
│   │   ├── seed.ts          # Franchise & Investment Summit seed data
│   │   └── index.ts
│   ├── lib/                 # Auth, utils, email helpers
│   └── types/
├── drizzle/                 # Migrations (generated)
├── public/
├── .env.example
├── drizzle.config.ts
├── package.json
├── vercel.json
└── README.md
```

---

## Support

This platform is built according to the detailed specification for a reusable event management system customized for the Franchise & Investment Summit in Belagavi.
