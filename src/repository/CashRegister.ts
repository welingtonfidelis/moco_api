import { Op } from "sequelize";
import { CashRegisterFilterInterface, CashRegisterInterface } from "../entities/CashRegister";
import { CashRegisterModel } from "../models/CashRegister";
import { CashRegisterGroupModel } from "../models/CashRegisterGroup";

class CashRegisterRepository {
    async save(data: CashRegisterInterface) {
        const savedCashRegister = await CashRegisterModel.create(data);

        return savedCashRegister;
    }

    async list(
        page: number, limit: number, ongId: string, filter: CashRegisterFilterInterface
    ) {
        const where: any = {
            ong_id: ongId
        };

        if (filter.date_start && filter.date_end) {
            const start = new Date(filter.date_start);
            const end = new Date(filter.date_end);
            
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);
            end.setHours(0);
            end.setMinutes(0);
            end.setSeconds(0);

            where['paid_in'] = {
                [Op.between]: [start, end]
            }
        }
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

        const listCashRegisters = await CashRegisterModel.findAndCountAll({
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