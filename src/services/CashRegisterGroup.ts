import { 
    CashRegisterGroupCreatedInterface, 
    CashRegisterGroupFilterInterface,
    CashRegisterGroupUpdateInterface,
    CashRegisterGroupDeleteInterface,
    CashRegisterGroupResponseClientInterface,
    CashRegisterGroupInterface,
    CashRegisterGroupListInterface
} from "../entities/CashRegisterGroup";
import { AppError } from "../errors/AppError";
import { CashRegisterGroupRepository } from "../repository/CashRegisterGroup";

const cashRegisterGroupRepository = new CashRegisterGroupRepository();

class CashRegisterGroupService {
    async save(data: CashRegisterGroupInterface): Promise<CashRegisterGroupCreatedInterface> {
        const cashRegisterGroupAlreadyExists = await cashRegisterGroupRepository
            .findOneByDescription(data.description, data.ong_id);

        if (cashRegisterGroupAlreadyExists) {
            throw new AppError('Description already in use', 400);
        }

        const savedCashRegisterGroup = await cashRegisterGroupRepository.save(data);
        const savedCashRegisterGroupHandled: CashRegisterGroupCreatedInterface = {
            id: savedCashRegisterGroup.id
        }

        return savedCashRegisterGroupHandled;
    }

    async list(
        page: number, limit: number, ongId: string, filter: CashRegisterGroupFilterInterface
    ): Promise<CashRegisterGroupResponseClientInterface> {
        const skip = limit * (page - 1);

        const listCashRegisterGroups = await cashRegisterGroupRepository
            .list(skip, limit, ongId, filter);

        const listCashRegisterGroupHandled: CashRegisterGroupResponseClientInterface = {
            count: listCashRegisterGroups.count,
            rows: listCashRegisterGroups.rows.map(item => item.toListInterface())
        }
        
        return listCashRegisterGroupHandled;
    }

    async listSimple(ongId: string) {
        const listCashRegisterGroups = await cashRegisterGroupRepository.listSimple(ongId);

        return listCashRegisterGroups;
    }

    async show(id: string, ongId: string): Promise<CashRegisterGroupListInterface | null> {
        const selectedCashRegisterGroup = await cashRegisterGroupRepository.show(id, ongId);

        return selectedCashRegisterGroup 
            ? selectedCashRegisterGroup.toListInterface() 
            : null;
    }

    async update(data: CashRegisterGroupUpdateInterface): Promise<boolean> {
        const cashRegisterGroupAlreadyExists = await cashRegisterGroupRepository
            .findOneByDescriptionWithDifferentId(data.id, data.description, data.ong_id);

        if (cashRegisterGroupAlreadyExists) {
            throw new AppError('Description already in use', 400);
        }

        const [updatedCashRegisterGroup] = await cashRegisterGroupRepository.update(data);

        return updatedCashRegisterGroup > 0;
    }

    async delete(data: CashRegisterGroupDeleteInterface): Promise<boolean> {
        const deletedCashRegisterGroup = await cashRegisterGroupRepository.delete(data);

        return deletedCashRegisterGroup > 0;
    }
}

export {
    CashRegisterGroupService
}