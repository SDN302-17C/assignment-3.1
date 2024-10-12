import mongoose, { Schema } from 'mongoose';

export interface IUser {
	fullName: string;
	username: string;
	hashedPassword: string;
	admin?: boolean;
}

const UserSchema = new mongoose.Schema({
	fullName: { type: Schema.Types.String, required: true },
	username: { type: Schema.Types.String, required: true },
	hashedPassword: { type: Schema.Types.String, required: true },
	admin: { type: Schema.Types.Boolean, required: false, default: false },
});

export const User = mongoose.model<IUser>('User', UserSchema);