import { Op } from "sequelize";
import { 
    CashRegisterGroupInterface, CashRegisterGroupDeleteInterface, 
    CashRegisterGroupUpdateInterface 
} from "../entities/CashRegisterGroup";
import { CashRegisterGroupModel } from "../models/CashRegisterGroup";
import { CashRegisterGroupFilterInterface } from '../entities/CashRegisterGroup';

class CashRegisterGroupRepository {
    async save(data: CashRegisterGroupInterface) {
        const savedCashRegisterGroup = await CashRegisterGroupModel.create(data);

        return savedCashRegisterGroup;
    }

    async list(
        page: number, limit: number, ongId: string, filter: CashRegisterGroupFilterInterface
    ) {
        const where: any = { 
            ong_id: ongId 
        }

        if (filter.description) where.description = { [Op.iLike]: `%${filter.description}%` }

        const listCashRegisterGroups = await CashRegisterGroupModel.findAndCountAll({
            where,
            offset: page,
            limit
        });

        return listCashRegisterGroups;
    }

    async listSimple(ongId: string) {
        const listCashRegisterGroups = await CashRegisterGroupModel.findAndCountAll({
            where: { ong_id: ongId },
            attributes: ['id', 'description']
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

    async findOneByDescriptionWithDifferentId(id: string, description: string, ongId: string) {
        const selectedCashRegisterGroup = await CashRegisterGroupModel.findOne({
            where: { 
                id: { [Op.not]: id }, description, ong_id: ongId 
            }
        });

        return selectedCashRegisterGroup;
    }

    async update(data: CashRegisterGroupUpdateInterface) {
        const { id, ong_id } = data;
        const updatedCashRegisterGroup = await CashRegisterGroupModel.update(
            data,
            {
                where: { id, ong_id}
            });

        return updatedCashRegisterGroup;
    }

    async delete(data: CashRegisterGroupDeleteInterface) {
        const { id, ong_id } = data;
        const deletedCashRegisterGroup = await CashRegisterGroupModel.destroy({
            where: { id, ong_id }
        });

        return deletedCashRegisterGroup;
    }
}

export {
    CashRegisterGroupRepository
}