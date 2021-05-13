import { UserCreatedInterface, UserInterface } from "../entities/User";
import { UserRepository } from "../repository/User";

const userRepository = new UserRepository();

class UserService {
    async save(data: UserInterface) {
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