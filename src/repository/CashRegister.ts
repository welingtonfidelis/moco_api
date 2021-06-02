import { Op, QueryTypes } from "sequelize";
import { CashOnHandReport, CashRegisterDeleteInterface, CashRegisterFilterInterface, CashRegisterInterface, CashRegisterUpdateInterface } from "../entities/CashRegister";
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

    async reportCashOnHand(ongId: string) {
        const [resultQuery]: any = await CashRegisterModel.sequelize?.query(
            `SELECT 
                round(
                    SUM(
                        CASE WHEN cr.type = 'out' 
                        THEN (cr.value * -1) 
                        ELSE cr.value 
                        END
                    )::numeric, 2
                ) AS total
            FROM cash_registers cr
            WHERE ong_id = ?`,
            {
                replacements: [ongId],
                type: QueryTypes.SELECT
            }
        );

        const resultQueryHandled: CashOnHandReport = { 
            total: resultQuery && resultQuery.total 
                ? parseFloat(resultQuery.total) 
                : 0
        }

        return resultQueryHandled;
    }

    async reportList(ongId: string, filter: CashRegisterFilterInterface) {
        const where: any = {
            ong_id: ongId
        };

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

    async update(data: CashRegisterUpdateInterface) {
        const { id, ong_id } = data;
        const updatedCashRegister = await CashRegisterModel.update(
            data,
            {
                where: { id, ong_id }
            });

        return updatedCashRegister;
    }

    async delete(data: CashRegisterDeleteInterface) {
        const { id, ong_id } = data;
        const deletedCashRegister = await CashRegisterModel.destroy({
            where: { id, ong_id }
        });

        return deletedCashRegister;
    }
}

export {
    CashRegisterRepository
}