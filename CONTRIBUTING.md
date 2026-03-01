# Aturan Kontribusi (Contributing to PlayIn)

Terima kasih atas minat Anda berkontribusi pada PlayIn Music! Repositori ini berjalan di atas prinsip pengembangan *Singularity Standard* guna menjamin kualitas enterprise dan skalabilitas framework Next.js.

## 1. Standar UI/UX (Visual Sovereignty)
- Patuhi **The 320px Law**: Gunakan alat pengembang browser (DevTools) untuk mengetes resolusi terkecil (320px) pada komponen yang Anda buat. Pastikan tidak ada scroll horizontal liar (*overflow-x*).
- Gunakan state komprehensif pada setiap *button*/komponen interaktif: `hover`, `active`, `disabled`, dan `loading`.
- Hindari penulisan `// TODO` terbuka sebelum melakukan Pull Request. Tuntaskan tugas Anda!

## 2. Alur Development Database
- Jika ingin melakukan mutasi skema pada `prisma/schema.prisma`, lakukan `npx prisma db push` ke *branch* lokal PostgreSQL Anda terlebih dahulu.
- Jalankan `npm run lint` untuk menghindari peringatan Strict Type check sebelum *commit*.

## 3. Format Penamaan Commit (Commit Naming Convention)
Kami menggunakan standar penulisan Semantic Commits:
*   `feat: <deskripsi singkat fitur>` (Contoh: `feat: add Google login provider`)
*   `fix: <deskripsi apa yang diperbaiki>`
*   `chore: <update dependencies/ekosistem internal>`
*   `docs: <pembaruan readme/dokumentasi>`
*   `refactor: <merapikan kode tanpa mengubah flow fitur utama>`

## 4. Proses Pull Request
1. Fork repositori ini.
2. Buat branch baru dari `main` dengan standar fitur/fix (`git checkout -b feature/audio-volume-boost`).
3. Tulis kode Anda, uji secara seksama pada Server Component dan Client Component Next.js.
4. Buat dan ajukan *Pull Request* ke branch `main`. Pastikan deskripsi PR memuat apa saja perubahan inti yang terjadi. Reviewer (SIRAJcrypto11) akan meninjau kelayakan deploy ke Vercel.
