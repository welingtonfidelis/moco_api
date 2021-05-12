import { UserCreatedInterface, UserInterface, UserModel } from "../models/User";

class UserRepository {
    async save (data: UserInterface) {
        const savedUser = await UserModel.create(data);
        const savedUserHandled: UserCreatedInterface = {
            id: savedUser.id
        }

        return savedUserHandled;
    }

    async findOneByUser(user: string) {
        // const repository = getRepository<UserInterface>(UserModel);

        // const selectedUser = await repository.findOne({
        //     where: { user, "deletedAt": IsNull() }
        // });

        return 'selectedUser';
    }
}

export {
    UserRepository
}