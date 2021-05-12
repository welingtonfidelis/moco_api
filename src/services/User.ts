import { UserInterface } from "../models/User";
import { UserRepository } from "../repository/User";

const userRepository = new UserRepository();

class UserService {
    async save(data: UserInterface) {
        const savedUser = await userRepository.save(data);
        
        return savedUser;
    }
}

export {
    UserService
}