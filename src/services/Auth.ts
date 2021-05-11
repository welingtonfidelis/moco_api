import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TokenInterface } from '../entities/Token';
import { UserLoginInterface } from '../entities/UserLogin';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repository/User';

const userRepository = new UserRepository();

class AuthService {
    async login(user: string, password: string) {
        const jwtSecret: string = process.env.SECRET!;
        const selectedUser = await userRepository.findOneByUser(user);

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
            )
        }

        const token = jwt.sign(
            { userId: selectedUser.id, ongId: selectedUser.OngId, userIsAdmin: selectedUser.isAdm }, 
            jwtSecret, 
            { expiresIn: '10h' }
        );

        const logedUser: UserLoginInterface = {
            email: selectedUser.email,
            isAdm: selectedUser.isAdm,
            name: selectedUser.name,
            user: selectedUser.user,
            createdAt: selectedUser.createdAt,
            token
        }

        return logedUser;
    }
}

export {
    AuthService
}