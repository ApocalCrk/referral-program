'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Selamat Datang</h2>
                <p className="text-center text-gray-600 mb-4">Silakan masuk atau daftar untuk melanjutkan</p>
                <div className="flex justify-center">
                    <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                        Masuk
                    </Link>
                    <Link href="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Daftar
                    </Link>
                </div>
            </div>
        </div>
    );
}