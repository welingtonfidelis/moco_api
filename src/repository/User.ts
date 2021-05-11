import { getRepository, IsNull } from "typeorm";
import { UserInterface } from "../entities/User";
import { UserModel } from "../models/User";

class UserRepository {
    async findOneByUser(user: string) {
        const repository = getRepository<UserInterface>(UserModel);

        const selectedUser = await repository.findOne({
            where: { user, "deletedAt": IsNull() }
        });

        return selectedUser;
    }
}

export {
    UserRepository
}