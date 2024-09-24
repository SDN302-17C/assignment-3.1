import { Request, Response } from 'express';
import { getUserByUsername } from './user.controller';
import { hashPassword } from '../services/utils.service';
import { generateJWTToken } from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res
				.status(400)
				.json({ error: 'Username and password are required' });
		}

		const user = await getUserByUsername(username);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		if (user.hashedPassword !== hashPassword(password).toString()) {
			return res.status(401).json({ error: 'Incorrect password' });
		}

		let token = generateJWTToken({
			_id: user._id,
			username: user.username,
			isAdmin: user.admin || false,
		});

		if (!token) {
			return res.status(500).json({ error: 'Error generating token' });
		}

		return res.status(200).json({ token: token, message: 'Login successful' });
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
};