import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserLoginInterface } from '../entities/User';
import { AppError } from '../errors/AppError';
import { TokenInterface } from '../entities/Token';
import { UserRepository } from '../repository/User';

const userRepository = new UserRepository();

class AuthService {
    async login(user: string, password: string) {
        const jwtSecret: string = process.env.SECRET!;
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
        const token = jwt.sign(contentToken, jwtSecret, { expiresIn: '10h' });


        const logedUser: UserLoginInterface = {
            name: selectedUser.name,
            email: selectedUser.email,
            token
        }

        return logedUser;
    }
}

export {
    AuthService
}