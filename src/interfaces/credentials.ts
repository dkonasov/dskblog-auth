import { Document } from 'mongoose';

export interface Credentials extends Document {
    user: string;
    password: string;
}