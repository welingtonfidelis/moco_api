import { CashRegisterGroupInterface } from "../entities/CashRegisterGroup";
import { CashRegisterGroupModel } from "../models/CashRegisterGroup";

class CashRegisterGroupRepository {
    async save(data: CashRegisterGroupInterface) {
        const savedCashRegisterGroup = await CashRegisterGroupModel.create(data);

        return savedCashRegisterGroup;
    }

    async list(page: number, limit: number, ongId: string) {
        const listCashRegisterGroups = await CashRegisterGroupModel.findAndCountAll({
            where: { ong_id: ongId },
            offset: page,
            limit
        });

        return listCashRegisterGroups;
    }

    async show(id: string, ongId: string) {
        const selectedCashRegisterGroup = await CashRegisterGroupModel.findOne({
            where: { id, ong_id: ongId }
        });

        return selectedCashRegisterGroup;
    }

    async findOneByDescription(description: string, ongId: string) {
        const selectedCashRegisterGroup = await CashRegisterGroupModel.findOne({
            where: { description, ong_id: ongId }
        });

        return selectedCashRegisterGroup;
    }

    async update(id: string, ongId: string, data: CashRegisterGroupInterface) {
        const updatedCashRegisterGroup = await CashRegisterGroupModel.update(
            data,
            {
                where: { id, ong_id: ongId}
            });

        return updatedCashRegisterGroup;
    }

    async delete(id: string, ongId: string) {
        const deletedCashRegisterGroup = await CashRegisterGroupModel.destroy({
            where: { id, ong_id: ongId }
        });

        return deletedCashRegisterGroup;
    }
}

export {
    CashRegisterGroupRepository
}