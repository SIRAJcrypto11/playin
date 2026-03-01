# PlayIn - Open Source SaaS Music Player

**PlayIn** adalah proyek pemutar musik berbasis web (SaaS) yang dibangun dengan standar *The Singularity Standard* menggunakan ekosistem *edge-ready* modern. Aplikasi ini memungkinkan pengguna memutar trek dari pustaka universal (menggunakan alternatif Piped API YouTube), menyimpan lagu kesayangan, dan mengatur playlist pribadi dengan UX semulus aplikasi *native*.

## 🚀 Fitur Utama
- **Zero Login Playback**: Dengarkan trending musik dunia secara gratis.
- **The 320px Law Design**: Desain fluid dan "anti-overflow" yang mendukung ukuran minimum *iPhone SE*.
- **Backing Player Latar Belakang**: Terus dengarkan lagu Anda selagi berpindah-pindah menu atau *Explore*.
- **Zustand Real-time Store**: Pergantian state audio, volume, *queue* tanpa *re-rendering* layout utama.
- **Persisten Playlist (Auth Required)**: Integrasi dengan PostgreSQL & NextAuth.js.

## 🛠️ Tech Stack & Infrastructure
*   **Framework**: Next.js 15+ (App Router, Server Actions)
*   **Database & ORM**: Vercel PostgreSQL + Prisma
*   **Authentication**: Auth.js / NextAuth v5 (Google & GitHub)
*   **Styling**: Tailwind CSS v4, Framer Motion
*   **Audio Engine**: React-Player (YouTube / Invidious Proxy Stream)
*   **Deployment**: Vercel (CI/CD ready)

## 📦 Quick Start Instalasi Lokal

1. **Clone Repository**
   ```bash
   git clone https://github.com/SIRAJcrypto11/playin.git
   cd "MUSIC PLAYER"
   ```

2. **Install Dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable**
   Ubah berkas `.env.example` menjadi `.env` dan isi kredensial *Vercel Postgres* serta *NextAuth* Anda.
   ```bash
   cp .env.example .env
   ```

4. **Migrasi Database Prisma**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

Buka `http://localhost:3000` di browser.

---

> Proyek ini mengikuti filosofi "Do No Harm" pada arsitektur - Logic is Sacred. Jangan pernah me-replace kode yang berfungsi murni demi kosmetik. Baca `CONTRIBUTING.md` sebelum membuat Pull Request.
