import mongoose, { Schema, Document, Types } from 'mongoose';

interface IUser extends Document<Types.ObjectId> {
    username: string;
    admin: boolean;
}

const UserSchema: Schema = new Schema({
    username: { type: String, default: '', required: true },
    admin: { type: Boolean, default: false, required: true }
});

export const User = mongoose.model<IUser>('User', UserSchema);