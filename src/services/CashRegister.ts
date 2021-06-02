import { 
    CashOnHandReport, CashRegisterCreatedInterface, CashRegisterDeleteInterface, 
    CashRegisterFilterInterface, CashRegisterInterface, CashRegisterListInterface, 
    CashRegisterReportItem, CashRegisterReportList, CashRegisterResponseClientInterface, 
    CashRegisterUpdateInterface 
} from "../entities/CashRegister";
import { CashRegisterRepository } from "../repository/CashRegister";

const cashRegisterRepository = new CashRegisterRepository();

class CashRegisterService {
    async save(data: CashRegisterInterface): Promise<CashRegisterCreatedInterface> {
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
    ): Promise<CashRegisterResponseClientInterface> {
        const skip = limit * (page - 1);

        const listCashRegisters = await cashRegisterRepository
            .list(skip, limit, ongId, filter);

        const listCashRegisterHandled: CashRegisterResponseClientInterface = {
            count: listCashRegisters.count,
            rows: listCashRegisters.rows.map(item => item.toListInterface())
        }

        return listCashRegisterHandled;
    }

    async reportCashOnHand(ongId: string): Promise<CashOnHandReport> {
        const total = await cashRegisterRepository.reportCashOnHand(ongId);

        return total;
    }

    async reportList(ongId: string, filter: CashRegisterFilterInterface): Promise<CashRegisterReportList> {
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

            if (item.type === 'in') listCashRegistersHandled.profit += item.value;
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

    async show(id: string, ongId: string): Promise<CashRegisterListInterface | null> {
        const selectedCashRegister = await cashRegisterRepository.show(id, ongId);

        return selectedCashRegister 
            ? selectedCashRegister.toListInterface() 
            : null;
    }

    async update(data: CashRegisterUpdateInterface): Promise<boolean> {
        const [updatedCashRegister] = await cashRegisterRepository.update(data);

        return updatedCashRegister > 0;
    }

    async delete(data: CashRegisterDeleteInterface): Promise<boolean> {
        const deletedCashRegister = await cashRegisterRepository.delete(data);

        return deletedCashRegister > 0;
    }
}

export {
    CashRegisterService
}