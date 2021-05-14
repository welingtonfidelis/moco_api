import { Op } from "sequelize";
import { OngInterface } from "../entities/Ong";
import { OngModel } from "../models/Ong";
import { UserModel } from "../models/User";

class OngRepository {
    async save(data: OngInterface) {
        const savedOng = await OngModel.create(data);

        return savedOng;
    }

    async list() {
        const listOngs: OngInterface[] = await OngModel.findAll();

        return listOngs;
    }

    async listWithUsers() {
        const listOngs: OngInterface[] = await OngModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: 'users'
                }
            ]
        });

        return listOngs;
    }

    async findOneByEmailOrCnpj(email: string, cnpj: string) {
        const selectedOng = await OngModel.findOne({
            where: {
                [Op.or]: [{ email }, { cnpj }]
            }
        });

        return selectedOng;
    }
}

export {
    OngRepository
}