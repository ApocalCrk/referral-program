import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { name, email, password, referral_code } = req.body;

            if (!name || !email || !password) return res.status(400).json({message: 'Data tidak lengkap'});

            let referredByUser = null;
            if (referral_code) {
                referredByUser = await prisma.user.findUnique({
                    where: { referralCode: referral_code }
                });

                if (!referredByUser) return res.status(400).json({message: 'Kode referral tidak valid'});
            }

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (user) return res.status(400).json({message: 'Email sudah terdaftar'});

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
                    referredById: referredByUser ? referredByUser.id : null
                }
            });

            if (referredByUser) {
                await prisma.user.update({
                    where: { id: referredByUser.id },
                    data: { points: { increment: 50 } }
                });

                await prisma.user.update({
                    where: { id: newUser.id },
                    data: { points: { increment: 50 } }
                });

                await prisma.referral.create({
                    data: {
                        referrerId: referredByUser.id,
                        referredId: newUser.id
                    }
                });
            }

            const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || 'default', {expiresIn: '24h'});

            return res.status(200).json({message: 'User berhasil didaftarkan', token});

        } catch (error) {
            return res.status(400).json({message: 'User gagal didaftarkan'});
        }
    } else {
        return res.status(405).json({message: 'Metode tidak diizinkan'});
    }
}
