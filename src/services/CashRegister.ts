import { CashRegisterCreatedInterface, CashRegisterFilterInterface, CashRegisterInterface } from "../entities/CashRegister";
import { CashRegisterRepository } from "../repository/CashRegister";

const cashRegisterRepository = new CashRegisterRepository();

class CashRegisterService {
    async save(data: CashRegisterInterface) {
        const paidIntHandled = new Date(data.paid_in);
        
        paidIntHandled.setHours(0);
        paidIntHandled.setMinutes(0);
        paidIntHandled.setSeconds(0);
        data.paid_in = paidIntHandled;

        const savedCashRegister = await cashRegisterRepository.save(data);
        const savedCashRegisterHandled: CashRegisterCreatedInterface = {
            id: savedCashRegister.id
        }
        
        return savedCashRegisterHandled;
    }

    async list(
        page: number, limit: number, ongId: string, filter: CashRegisterFilterInterface
    ) {
        const skip = limit * (page - 1);

        const listCashRegisters = await cashRegisterRepository
            .list(skip, limit, ongId, filter);

        return listCashRegisters;
    }

    async show(id: string, ongId: string) {
        const selectedCashRegister = await cashRegisterRepository.show(id, ongId);
        
        return selectedCashRegister;
    }

    async update(id: string, ongId: string, data: CashRegisterInterface) {
        const updatedCashRegister = await cashRegisterRepository.update(id, ongId, data);
        
        return updatedCashRegister;
    }

    async delete(id: string, ongId: string) {
        const deletedCashRegister = await cashRegisterRepository.delete(id, ongId);
        
        return deletedCashRegister;
    }
}

export {
    CashRegisterService
}