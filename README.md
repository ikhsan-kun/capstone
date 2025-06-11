# Food Nutrition Analyzer

Aplikasi web untuk menganalisis nutrisi makanan, memberikan insight gizi, dan membantu pengguna memilih makanan sehat berbasis AI.

## Fitur Utama
- Analisis nutrisi makanan secara otomatis melalui foto atau input manual (Analyzer)
- Personalisasi insight gizi dan rekomendasi makanan sehat (Home)
- Feedback & rating pengguna untuk aplikasi (Home)
- Autentikasi user: Login & Register (Login, Register)
- Manajemen profil, riwayat konsumsi, dan kebutuhan harian (Profil)
- Tampilan responsif & modern berbasis Bootstrap

## Prasyarat
- Node.js & npm
- Supabase (sudah punya project dan kredensial)
- Python 3.x (untuk service machine learning)

## Instalasi
1. **Clone repository ini:**
   ```bash
   git clone <url-repo-anda>
   cd capstone
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install library tambahan:**
   ```bash
   npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge css-loader style-loader babel-loader @babel/preset-env html-webpack-plugin
   npm i --save bootstrap @popperjs/core autoprefixer
   ```

## Konfigurasi
- Buat file `.env` di root project, contoh:
  ```env
  SUPABASE_URL=xxx
  SUPABASE_KEY=xxx
  JWT_SECRET=xxx
  ```
- Pastikan Supabase sudah dikonfigurasi dan kredensial sudah benar di `.env`.

## Menjalankan Project
- **Backend (Node.js/Express):**
  ```bash
  npm run serve
  ```
- **Frontend (development):**
  ```bash
  npm run start-dev
  ```
- **Build untuk production:**
  ```bash
  npm run build
  ```

## Struktur Project
- `backend/` : kode backend (Node.js/Express untuk API, integrasi Supabase, dan ML bridge)
- `frontend/` : kode frontend (HTML, JS, CSS, Webpack)
- `docs/` : hasil build production (siap deploy)
- `python/` : service machine learning (API Python, model, utilitas)

## Catatan
- Lihat file `note.md` untuk library tambahan yang perlu di-install.
- Untuk menjalankan model ML Python, cek instruksi di `python/README.md` (jika ada).
- Jika ada error dependency, pastikan semua library sudah di-install sesuai perintah di atas.

---

Made with ❤️ by tim Capstone CC25-CF313
