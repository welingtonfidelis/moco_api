import { Op } from "sequelize";
import { CashRegisterFilterInterface, CashRegisterInterface } from "../entities/CashRegister";
import { CashRegisterModel } from "../models/CashRegister";
import { CashRegisterGroupModel } from "../models/CashRegisterGroup";

class CashRegisterRepository {
    async save(data: CashRegisterInterface) {
        const savedCashRegister = await CashRegisterModel.create(data);

        return savedCashRegister;
    }

    async list(page: number, limit: number, ongId: string) {
        const listCashRegisters = await CashRegisterModel.findAll({
            where: { ong_id: ongId },
            offset: page,
            limit,
            include: [{
                model: CashRegisterGroupModel,
                as: 'cash_register_group'
            }]
        });

        return listCashRegisters;
    }

    async listByFilter(
        page: number, limit: number, ongId: string, filter: CashRegisterFilterInterface
    ) {
        const where: any = {
            ong_id: ongId,
            paid_in: {
                [Op.between]: [filter.date_start, filter.date_end]
            }
        };

        if (filter.cash_register_group_id) {
            where['cash_register_group_id'] = filter.cash_register_group_id;
        }
        if (filter.type) {
            where['type'] = filter.type;
        }
        if (filter.description) {
            where['description'] = {
                [Op.iLike]: `%${filter.description}%`
            };
        }

        const listCashRegisters = await CashRegisterModel.findAll({
            where,
            offset: page,
            limit,
            include: [{
                model: CashRegisterGroupModel,
                as: 'cash_register_group'
            }]
        });

        return listCashRegisters;
    }

    async show(id: string, ongId: string) {
        const selectedCashRegister = await CashRegisterModel.findOne({
            where: { id, ong_id: ongId }
        });

        return selectedCashRegister;
    }

    async update(id: string, ongId: string, data: CashRegisterInterface) {
        const updatedCashRegister = await CashRegisterModel.update(
            data,
            {
                where: { id, ong_id: ongId}
            });

        return updatedCashRegister;
    }

    async delete(id: string, ongId: string) {
        const deletedCashRegister = await CashRegisterModel.destroy({
            where: { id, ong_id: ongId }
        });

        return deletedCashRegister;
    }
}

export {
    CashRegisterRepository
}