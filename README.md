# Referral Program dengan Next.js dan Prisma

## Skema Database ()

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