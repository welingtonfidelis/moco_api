import { CashRegisterInterface } from "../entities/CashRegister";
import { CashRegisterRepository } from "../repository/CashRegister";

const cashRegisterRepository = new CashRegisterRepository();

class CashRegisterService {
    async save(data: CashRegisterInterface) {
        const savedCashRegister = await cashRegisterRepository.save(data);
        
        return savedCashRegister;
    }
}

export {
    CashRegisterService
}