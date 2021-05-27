import { CashRegisterCreatedInterface, CashRegisterFilterInterface, CashRegisterInterface, CashRegisterReportItem, CashRegisterReportList } from "../entities/CashRegister";
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

    async reportCashOnHand(ongId: string) {
        const total = await cashRegisterRepository.reportCashOnHand(ongId);

        return total;
    }

    async reportList(ongId: string, filter: CashRegisterFilterInterface) {
        const listCashRegisters = await cashRegisterRepository
            .reportList(ongId, filter);

        const listCashRegistersHandled: CashRegisterReportList = {
            count: listCashRegisters.count,
            date_start: filter.date_start,
            date_end: filter.date_end,
            revenue: 0,
            expense: 0,
            profit: 0,
            rows: [],
        }

        listCashRegistersHandled.rows = listCashRegisters.rows.map(item => {
            listCashRegistersHandled.revenue += item.value;

            if(item.type === 'in') listCashRegistersHandled.profit += item.value;
            else listCashRegistersHandled.expense += item.value;

            const reportItem: CashRegisterReportItem = {
                id: item.id,
                description: item.description,
                paid_in: item.paid_in,
                value: item.value,
                type: item.type,
                cash_register_group_description: item.cash_register_group.description
            }

            return reportItem;
        });

        return listCashRegistersHandled;
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