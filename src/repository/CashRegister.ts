import { CashRegisterInterface } from "../entities/CashRegister";
import { CashRegisterModel } from "../models/CashRegister";

class CashRegisterRepository {
    async save(data: CashRegisterInterface) {
        const savedCashRegister = await CashRegisterModel.create(data);

        return savedCashRegister;
    }

    async list(page: number, limit: number, ongId: string) {
        const listCashRegisters = await CashRegisterModel.findAll({
            where: { ong_id: ongId },
            offset: page,
            limit
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