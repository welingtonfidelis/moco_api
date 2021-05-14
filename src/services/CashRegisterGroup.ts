import { CashRegisterGroupCreatedInterface, CashRegisterGroupInterface } from "../entities/CashRegisterGroup";
import { AppError } from "../errors/AppError";
import { CashRegisterGroupRepository } from "../repository/CashRegisterGroup";

const cashRegisterGroupRepository = new CashRegisterGroupRepository();

class CashRegisterGroupService {
    async save(data: CashRegisterGroupInterface) {
        const cashRegisterGroupAlreadyExists = await cashRegisterGroupRepository
            .findOneByDescription(data.description, data.ong_id);

        if(cashRegisterGroupAlreadyExists) {
            throw new AppError('Description already in use', 400);
        }

        const savedCashRegisterGroup = await cashRegisterGroupRepository.save(data);
        const savedCashRegisterGroupHandled: CashRegisterGroupCreatedInterface = {
            id: savedCashRegisterGroup.id
        }
        
        return savedCashRegisterGroupHandled;
    }

    async list(page: number, limit: number, ongId: string) {
        const skip = limit * (page - 1);

        const listCashRegisterGroups = await cashRegisterGroupRepository.list(skip, limit, ongId);
        
        return listCashRegisterGroups;
    }

    async show(id: string, ongId: string) {
        const selectedCashRegisterGroup = await cashRegisterGroupRepository.show(id, ongId);
        
        return selectedCashRegisterGroup;
    }

    async update(id: string, ongId: string, data: CashRegisterGroupInterface) {
        const updatedCashRegisterGroup = await cashRegisterGroupRepository.update(id, ongId, data);
        
        return updatedCashRegisterGroup;
    }

    async delete(id: string, ongId: string) {
        const deletedCashRegisterGroup = await cashRegisterGroupRepository.delete(id, ongId);
        
        return deletedCashRegisterGroup;
    }
}

export {
    CashRegisterGroupService
}