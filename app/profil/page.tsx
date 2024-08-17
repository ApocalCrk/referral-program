'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { Referral } from '@/types/referral';

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfil = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Pengguna tidak terotentikasi');
                setInterval(() => {
                    router.push('/login');
                }, 3000);
                return;
            }

            try {
                const res = await fetch('/api/user/data', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) throw new Error('Gagal mengambil data pengguna');

                const data = await res.json();

                const referralsRes = await fetch(`/api/user/referral?userId=${data.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!referralsRes.ok) throw new Error('Gagal mengambil data referral');

                const referralsData = await referralsRes.json();

                setReferrals(referralsData);
                setUser(data);

            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchProfil();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <p className="text-red-500 font-semibold">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <p className="text-gray-600 font-semibold">Mengambil data pengguna...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Profil Pengguna</h1>
                <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-2">Nama: {user.name}</p>
                    <p className="text-lg text-gray-700 mb-2">Jumlah Point: {user.points}</p>
                    <p className="text-lg text-gray-700 mb-4">Kode Referral: {user.referralCode}</p>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Referral</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Referral yang anda gunakan</h3>
                        <ul className="bg-gray-50 p-4 rounded-lg shadow">
                            {referrals.filter(r => r.referred.id === user.id).map(referral => (
                                <li key={referral.id} className="text-gray-700 mb-2">
                                    {referral.referrer.name}
                                    <br />
                                    {new Date(referral.date).toLocaleDateString()}
                                    <br />
                                    Kode Referral: {referral.referrer.referralCode}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Referral yang telah digunakan oleh pengguna lain</h3>
                        <ul className="bg-gray-50 p-4 rounded-lg shadow">
                            {referrals.filter(r => r.referrer.id === user.id).map(referral => (
                                <li key={referral.id} className="text-gray-700 mb-2">
                                    {referral.referred.name}
                                    <br />
                                    {new Date(referral.date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button
                    className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {
                        localStorage.removeItem('token');
                        router.push('/login');
                    }}
                >
                    Keluar
                </button>
            </div>
        </div>
    );
}
