import mongoose, { Schema } from 'mongoose';

export interface IUser {
	username: string;
	hashedPassword: string;
	admin?: boolean;
}

const UserSchema = new mongoose.Schema({
	username: { type: Schema.Types.String, required: true },
	hashedPassword: { type: Schema.Types.String, required: true },
	admin: { type: Schema.Types.Boolean, required: false, default: false },
});

export const User = mongoose.model<IUser>('User', UserSchema);