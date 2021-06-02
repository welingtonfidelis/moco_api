import { randomHash, removeSpecialCharacters } from "../util";
import { OngCreatedInterface, OngInterface, OngResponseClientInterface } from "../entities/Ong";
import { UserInterface } from "../entities/User";
import { OngRepository } from "../repository/Ong";
import { UserRepository } from "../repository/User";
import { AppError } from "../errors/AppError";

const ongRepository = new OngRepository();
const userRepository = new UserRepository();

class OngService {
    async save(data: OngInterface): Promise<OngCreatedInterface> {
        data.cnpj = removeSpecialCharacters(data.cnpj);

        const ongAlreadyExists = await ongRepository.findOneByEmailOrCnpj(data.email, data.cnpj);

        if(ongAlreadyExists) {
            let message = 'CNPJ already in use';

            if(ongAlreadyExists.email === data.email) message = 'Email already in use';

            throw new AppError(message, 400);
        }

        const savedOng = await ongRepository.save(data);
        
        const starterUserPassword = randomHash(8);
        const starterOngUser: UserInterface = {
            name: savedOng.name,
            email: savedOng.email,
            user: (savedOng.email.split('@'))[0],
            birth: new Date(),
            password: starterUserPassword,
            ong_id: savedOng.id
        }
        const savedUser = await userRepository.save(starterOngUser);

        const savedOngHandled: OngCreatedInterface = {
            id: savedOng.id,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                user: savedUser.user,
                password: starterUserPassword
            }
        }
        
        return savedOngHandled;
    }

    async list(): Promise<OngResponseClientInterface> {
        const listOngs = await ongRepository.list();

        const listOngHandled: OngResponseClientInterface = {
            count: listOngs.count,
            rows: listOngs.rows.map(item => item.toListInterface())
        }

        return listOngHandled;
    }
}

export {
    OngService
}