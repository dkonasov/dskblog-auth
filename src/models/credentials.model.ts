import { SHA256 } from 'crypto-js';
import { Credentials } from '../interfaces/credentials';
import { model, Schema } from 'mongoose';

const encryptPassword = (password: string): string => {
    const salt = process.env.DSKBLOG_PASSWORD_SALT || '';
    return SHA256(password + salt).toString();
};

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: encryptPassword
    }
});

export const CredentialsModel = model<Credentials>('Credentials', schema);



