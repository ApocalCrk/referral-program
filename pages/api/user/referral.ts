import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { userId } = req.query;

            if (!userId) {
                return res.status(400).json({ message: 'ID pengguna tidak ditemukan' });
            }

            const referrals = await prisma.referral.findMany({
                where: {
                    OR: [
                        {referrerId: Number(userId)},
                        {referredId: Number(userId)}
                    ]
                },
                include: {
                    referrer: {select: {id: true, name: true, referralCode: true}},
                    referred: {select: {id: true, name: true}}
                }
            });

            return res.status(200).json(referrals);
        } catch (error) {
            return res.status(500).json({message: 'Gagal memuat data referral'});
        }
    } else {
        return res.status(405).json({message: 'Metode tidak diizinkan'});
    }
}
