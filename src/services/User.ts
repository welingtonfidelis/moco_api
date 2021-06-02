import { UserCreatedInterface, UserInterface } from "../entities/User";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repository/User";

const userRepository = new UserRepository();
class UserService {
    async save(data: UserInterface): Promise<UserCreatedInterface> {
        const userAlreadyExists = await userRepository.findOneByUserOrEmail(data.user, data.email);

        if(userAlreadyExists) {
            let message = 'User already in use';

            if(userAlreadyExists.email === data.email) message = 'Email already in use';

            throw new AppError(message, 400);
        }

        const savedUser = await userRepository.save(data);
        const savedUserHandled: UserCreatedInterface = {
            id: savedUser.id
        }
        
        return savedUserHandled;
    }
}

export {
    UserService
}