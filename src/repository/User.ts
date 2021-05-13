import { Op } from "sequelize";
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/User";
import { UserInterface } from "../entities/User";

const saltRounds = 10;
class UserRepository {
    async save(data: UserInterface) {
        data.password = bcrypt.hashSync(data.password, saltRounds);

        const savedUser = await UserModel.create(data);

        return savedUser;
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