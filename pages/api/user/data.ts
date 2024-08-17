import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if (req.method === 'GET') {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message: 'Akses ditolak'});

        const token = authHeader.split(' ')[1];

        try {
            const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET || 'default') as JwtPayload;
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });

            if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });

            return res.status(200).json(user);
            
        } catch (error) {
            return res.status(401).json({message: 'Token tidak valid'});
        }
    } else {
        return res.status(405).json({message: 'Metode tidak diizinkan'});
    }
}
