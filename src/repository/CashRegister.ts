import { CashRegisterInterface } from "../entities/CashRegister";

class CashRegisterRepository {
    async save(data: CashRegisterInterface) {
        // const repository = getRepository<CashRegisterInterface>(CashRegisterModel);

        // const savedCashRegister = await repository.save(data);

        return 'savedCashRegister';
    }
}

export {
    CashRegisterRepository
}