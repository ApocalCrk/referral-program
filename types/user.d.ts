export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    referralCode: string;
    referredById: number;
    points: number;
}