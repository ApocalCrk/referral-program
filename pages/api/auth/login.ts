import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            if (!email || !password) return res.status(400).json({message: 'Email atau password tidak boleh kosong'});

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) return res.status(400).json({message: 'Email tidak ditemukan'});

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) return res.status(400).json({message: 'Password salah'});

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default', {expiresIn: '24h'});

            return res.status(200).json({message: 'Berhasil login', token});
            
        } catch (error) {
            return res.status(400).json({message: 'Gagal login'});
        }
    } else {
        return res.status(405).json({message: 'Metode tidak diizinkan'});
    }
}