import { Op } from "sequelize";
import bcrypt from 'bcryptjs';
import { UserCreatedInterface, UserInterface, UserLoginInterface, UserModel } from "../models/User";

const saltRounds = 10;
class UserRepository {
    async save(data: UserInterface) {
        data.password = bcrypt.hashSync(data.password, saltRounds);
        
        const savedUser = await UserModel.create(data);
        const savedUserHandled: UserCreatedInterface = {
            id: savedUser.id
        }

        return savedUserHandled;
    }

    async findOneByUser(user: string) {
        const selectedUser = await UserModel.findOne({
            where: {
                [Op.or]: [{ user }, { email: user }]
            }
        });

        return selectedUser;
    }
}

export {
    UserRepository
}