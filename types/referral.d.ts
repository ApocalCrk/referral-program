import { User } from './user';

export interface Referral {
    id: number;
    referrer: User;
    referred: User;
    date: Date;
}