import prisma from '../utils/prisma';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/AppError';
import { generateToken } from '../utils/jwt';

export class AuthService {
  async register(data: any) {
    const { email, password, name } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new AppError('Email is already in use', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: 'CUSTOMER'
      }
    });

    const token = generateToken({ id: user.id, role: user.role });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
  }

  async login(data: any) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = generateToken({ id: user.id, role: user.role });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
  }

  async getCurrentUser(id: string) {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }
}

export const authService = new AuthService();

