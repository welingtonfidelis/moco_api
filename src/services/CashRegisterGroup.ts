import { CashRegisterGroupInterface } from "../entities/CashRegisterGroup";
import { CashRegisterGroupRepository } from "../repository/CashRegisterGroup";

const cashRegisterGroupRepository = new CashRegisterGroupRepository();

class CashRegisterGroupService {
    async save(data: CashRegisterGroupInterface) {
        const savedCashRegisterGroup = await cashRegisterGroupRepository.save(data);
        
        return savedCashRegisterGroup;
    }

    async list(page: number, limit: number, ongId: number) {
        const skip = limit * (page - 1);

        const listCashRegisterGroups = await cashRegisterGroupRepository.list(skip, limit, ongId);
        
        return listCashRegisterGroups;
    }

    async show(id: number, ongId: number) {
        const selectedCashRegisterGroup = await cashRegisterGroupRepository.show(id, ongId);
        
        return selectedCashRegisterGroup;
    }

    async update(id: number, data: CashRegisterGroupInterface) {
        const updatedCashRegisterGroup = await cashRegisterGroupRepository.update(id, data);
        
        return updatedCashRegisterGroup;
    }

    async delete(id: number, ongId: number) {
        const deletedCashRegisterGroup = await cashRegisterGroupRepository.delete(id, ongId);
        
        return deletedCashRegisterGroup;
    }
}

export {
    CashRegisterGroupService
}