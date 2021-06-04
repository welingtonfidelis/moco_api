import { Op } from "sequelize";
import bcrypt from 'bcryptjs';
import { UserModel } from "../models/User";
import { UserInterface, UserUpdatePasswordInterface, UserUpdateProfileInterface } from "../entities/User";
import { OngModel } from "../models/Ong";

const saltRounds = 10;
class UserRepository {
    async save(data: UserInterface) {
        data.password = bcrypt.hashSync(data.password, saltRounds);

        const savedUser = await UserModel.create(data);

        return savedUser;
    }

    async findOneByUserOrEmail(user: string, email = user) {
        const selectedUser = await UserModel.findOne({
            where: {
                [Op.or]: [{ user }, { email }]
            },
            include: [
                {
                    model: OngModel,
                    as: 'ong',
                    required: true,
                    attributes: ['name']
                }
            ]
        });

        return selectedUser;
    }

    async showProfile(id: string, ong_id:string) {
        const selectedUser = await UserModel.findOne({
            where: {
                id, ong_id
            },
            attributes: ['name', 'email', 'user', 'birth', 'address', 'phone'],
            include: [
                {
                    model: OngModel,
                    as: 'ong',
                    required: true,
                }
            ]
        });

        return selectedUser;
    }

    async updateProfile(data: UserUpdateProfileInterface) {
        const { id, ong_id } = data;

        const updatedUser = await UserModel.update(
            data,
            {
                where: { id, ong_id }
            }
        );

        return updatedUser;
    }

    async updatePassword(data: UserUpdatePasswordInterface) {
        const { id, ong_id } = data;
        const password = bcrypt.hashSync(data.password, saltRounds);

        const updatedUser = await UserModel.update(
            {
                password
            },
            {
                where: { id, ong_id }
            }
        );

        return updatedUser;
    }
}

export {
    UserRepository
}