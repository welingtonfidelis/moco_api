import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserLoginInterface } from '../entities/User';
import { AppError } from '../errors/AppError';
import { TokenInterface } from '../entities/Token';
import { UserRepository } from '../repository/User';

const userRepository = new UserRepository();
const JWTSECRET: string = process.env.SECRET!;

class AuthService {
    async login(user: string, password: string): Promise<UserLoginInterface> {
        const selectedUser = await userRepository.findOneByUserOrEmail(user);

        if (!selectedUser) {
            throw new AppError(
                'Invalid email or password',
                401
            );
        }

        const isValid = bcrypt.compareSync(password, selectedUser.password);

        if (!isValid) {
            throw new AppError(
                'Invalid email or password',
                401
            );
        }

        const contentToken: TokenInterface = {
            userId: selectedUser.id, ongId: selectedUser.ong_id
        }
        const token = this.createToken(contentToken, 10*60);

        const logedUser: UserLoginInterface = {
            name: selectedUser.name,
            email: selectedUser.email,
            token
        }

        return logedUser;
    }

    createToken(content: any, expiresMinutes: number) {
        return jwt.sign(content, JWTSECRET, { expiresIn: `${expiresMinutes}m` });
    }
}

export {
    AuthService
}