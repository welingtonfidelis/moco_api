import { OngInterface } from "../models/Ong";
import { OngRepository } from "../repository/Ong";

const ongRepository = new OngRepository();

class OngService {
    async save(data: OngInterface) {
        const savedOng = await ongRepository.save(data);
        
        return savedOng;
    }

    async list() {
        const listOngs = await ongRepository.list();

        return listOngs;
    }
}

export {
    OngService
}