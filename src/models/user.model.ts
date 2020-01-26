import { model, Schema } from 'mongoose';
import { User } from '../interfaces/user';

const schema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    }
});

export const UserModel = model<User>('User', schema);