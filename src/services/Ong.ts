import { OngCreatedInterface, OngInterface } from "../entities/Ong";
import { OngRepository } from "../repository/Ong";

const ongRepository = new OngRepository();

class OngService {
    async save(data: OngInterface) {
        const savedOng = await ongRepository.save(data);
        const savedOngHandled: OngCreatedInterface = {
            id: savedOng.id
        }
        
        return savedOngHandled;
    }

    async list() {
        const listOngs = await ongRepository.list();

        return listOngs;
    }
}

export {
    OngService
}