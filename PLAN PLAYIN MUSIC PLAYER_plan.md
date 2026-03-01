# Rancangan Pengembangan: SaaS Music Player (Open Source)

## Tujuan Utama
Membuat aplikasi web pemutar musik SaaS (Software as a Service) yang sekelas dengan YouTube Music. Aplikasi akan dibangun menggunakan Next.js, di-deploy di Vercel, sumber musik dari YouTube/sumber open-source lainnya, dan bersifat open-source di GitHub untuk kolaborasi bersama. Pengguna dapat mendengarkan musik secara gratis, namun login diwajibkan khusus untuk fitur menyimpan dan membuat playlist pribadi.

## 1. Arsitektur & Tech Stack (Masa Depan & Anti-Fragile)
- **Framework Core**: Next.js (App Router) untuk performa optimal (Server Components + Client Components).
- **Database & ORM**: Vercel Postgres untuk data relasional (User, Playlist) + Prisma ORM.
- **Storage**: Vercel Blob/Storage untuk aset utama, dan **Cloudinary** sebagai *backup* media/image storage.
- **Authentication**: NextAuth.js v5 (Auth.js) dengan Social Login (Google & GitHub) – *Tanpa password, lebih aman*.
- **State Management**: **Zustand** (Sangat ringan dan sempurna untuk mengelola *global state* dari Music Player seperti current track, queue, volume).
- **Animasi & Motion (UI/UX)**: **Framer Motion** untuk transisi perpindahan halaman yang *seamless* antar lagu, animasi *mini-player* ke *full-screen*, dan micro-interactions yang sangat mulus layaknya *native app*.

## 2. Struktur Database (Prisma Schema Pattern)
- **User**: Menyimpan data profil user dari NextAuth.
- **Playlist**: Relasi *one-to-many* dengan User. Atribut: Name, Description, Cover Image, Public/Private status.
- **PlaylistTrack**: Relasi *many-to-many* menyimpan metadata track dari YouTube (Track ID asal, Title, Artist, Thumbnail URL, Duration) sehingga tidak membebani limit API saat memuat playlist.

## 3. UI/UX Standard (Visual Sovereignty Standard)
Mematuhi **"The 320px Law"** dan pencegahan *overflow* secara absolut (`truncate`, `overflow-x-auto`).
- **Layout**: 
  - *Sidebar* (Navigasi Kiri: Home, Explore, Library).
  - *Main Content* (Feed Grid, Playlist detail).
  - *Persistent Bottom Player* (Pemutar musik yang selalu menggantung di bawah, tidak ter-refresh saat pindah rute).
- **Aesthetic**: 
  - Mode Gelap (Dark Mode) yang mendalam (seperti warna `#030303` YouTube Music / `#121212` Spotify) sebagai default dengan warna aksen neon/gradient yang dinamis mengikuti warna cover album musik (*glassmorphism extraction*).
- **Micro-interactions**: 
  - Tombol yang memiliki *state complete* (`hover`, `active`, `loading`, `disabled`).
  - *Skeleton Loading* untuk semua daftar lagu dan gambar (Zero Zombie State).

## 4. Eksekusi Fitur Inti
### A. Tanpa Login (Guest Mode)
- Pencarian cerdas (Search) untuk track, album, atau artis (menggunakan YT Data API / Piped API).
- Memutar lagu apa saja, memajukan/memundurkan (*seek*), mengatur volume.
- Mengelola antrean (*queue*) sesi saat ini dan *shuffle*/*repeat*.

### B. Dengan Login (Authenticated)
- Membuat *Playlist* baru, menambahkan lagu terpilih ke dalam *Playlist*.
- Menyimpan *Playlist* favorit buatan pengguna lain.
- *Library/Koleksi* pribadi untuk akses daftar putar yang disimpan.

## 5. Deployment & Open Source (Kolaborasi GitHub)
- **GitHub Repository Setup** (https://github.com/SIRAJcrypto11/playin.git):
  - `README.md` komprehensif dengan panduan *quickstart*, environment variables, dan link ke dokumentasi.
  - `CONTRIBUTING.md` untuk aturan standar penulisan *commit* dan struktur pembuatan Pull Request.
  - Setup CI/CD menggunakan *GitHub Actions* untuk otomatisasi ESLint, Prettier, dan Type Checking.
- **Vercel Deployment**: 
  - Vercel akan diatur agar setiap Push/PR memicu *Preview Deployments* otomatis untuk memudahkan testing kolaborator.

---

## Rincian Langkah Implementasi (Task Breakdown)
Kami akan mengeksekusi ini dalam kerangka [task.md](file:///c:/Users/Siraj%20Nur%20Ihrom/.gemini/antigravity/brain/235b4366-36d7-40b2-84a6-38a19ebbb1ac/task.md) secara bertahap:
1. **Fase 1: Setup Proyek & Struktur Infrastruktur** (Inisialisasi Next.js, Tailwind/Style, Linter, GitHub Push).
2. **Fase 2: Pembuatan Global Layout & Basic UI** (Sidebar, Main Content, Persistent Bottom Player Skeleton).
3. **Fase 3: Integrasi API Pencarian Musik** (Koneksi ke sistem API musik untuk pencarian & display daftar lagu).
4. **Fase 4: Core Audio Player & Zustand State** (Pembuatan logika inti pemutar musik, audio play/pause, durasi).
5. **Fase 5: Database & Authentication** (Integrasi NextAuth.js dan Prisma PostgreSQL untuk fungsi Playlist).
6. **Fase 6: Playlist Management** (CRUD Backend Server Actions + Fitur interaktif *Add to Playlist*).
7. **Fase 7: Animasi & Final Polish (The Singularity Check)** (Optimasi Framer Motion, Responsivitas mobile 320px, state error/loading, dan dokumentasi).
