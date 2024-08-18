# Referral Program dengan Next.js dan Prisma

## Skema Database (MySQL)
- User
  - id => integer, primary key, auto increment
  - name => string
  - email => string, unique
  - password => string
  - referralCode => string, unique (6 karakter set di logic aplikasi)
  - points => integer, default 0
  - referredById => integer, terdapat relasi ke id user yang mereferensikan, nullable

- Referral
   - id => integer, primary key, auto increment
   - referrerId => integer, terdapat foreign key ke id user yang mereferensikan
   - referredId => integer, terdapat foreign key ke id user yang direferensikan
   - date => datetime, default now

## ERD
![ERD](https://raw.githubusercontent.com/ApocalCrk/referral-program/main/public/erd-ref.png)

## Fungsionalitas
- Register
   - Pengguna dapat mendaftar dengan memberikan nama, email, password, dan kode_referensi (opsional).
   - Kode referensi harus valid, jika tidak maka akan muncul pesan error.
   - Jika kode referensi valid, maka akan terdapat relasi antara pengguna yang mereferensikan dan pengguna yang direferensikan.

- Login
   - Pengguna dapat login dengan email dan password.

- Profil
   - Pengguna dapat melihat profilnya sendiri, termasuk melihat management referal dan point yang dimiliki.

- Referal
   - Setiap kode referal terdiri dari 6 karakter acak.
   - Pengguna yang mereferensikan akan mendapatkan 50 point setiap kali ada pengguna yang mendaftar menggunakan kode referalnya.
   - Pengguna yang direferensikan akan mendapatkan 50 point setiap kali mendaftar menggunakan kode referal.

- Endpoint API
   - `/api/auth/register` => untuk mendaftar
   - `/api/auth/login` => untuk login
   - `/api/user/data` => untuk mendapatkan data user yang sedang login
   - `/api/user/referal?userId={id}` => untuk mendapatkan data referal user yang sedang login

## Setup

1. Clone repository:
   ```bash
   git clone https://github.com/ApocalCrk/referral-program.git
   cd referral-program

2. Install dependencies:
   ```bash
   npm install

3. buat file `.env`, isi dengan konfigurasi database dan jwt secret key:
   ```bash
   DATABASE_URL="mysql://username:password@localhost:3306/referral_program"
   JWT_SECRET="your-secret-key"

4. Jalankan migrasi database dan buat prisma client:
    ```bash
    npx prisma migrate dev
    npx prisma generate

5. Jalankan aplikasi:
    ```bash
    npm run dev
    ```

# Demo Aplikasi
- Akun 1
   - email: `test@gmail.com`
   - password: `test`
   - kode referral: `1MXPOD`

- Akun 2
   - email: `test2@gmail.com`
   - password: `test`
   - kode referral: `9KFAPY`

[Demo Aplikasi](https://referral-program-gci-msib.vercel.app/)