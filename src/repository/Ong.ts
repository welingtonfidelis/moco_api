import { OngCreatedInterface, OngInterface, OngModel } from "../models/Ong";
import { UserModel } from "../models/User";

class OngRepository {
    async save(data: OngInterface) {
        const savedOng = await OngModel.create(data);
        const savedOngHandled: OngCreatedInterface = {
            id: savedOng.id
        }

        return savedOngHandled;
    }

    async list() {
        const listOngs: OngInterface[] = await await OngModel.findAll();

        return listOngs;
    }

    async listWithUsers() {
        const listOngs: OngInterface[] = await await OngModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: 'users'
                }
            ]
        });

        return listOngs;
    }
}

export {
    OngRepository
}