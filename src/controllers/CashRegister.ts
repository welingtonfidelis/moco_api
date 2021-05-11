import { Request, Response } from "express"
import { CashRegisterInterface } from "../entities/CashRegister";
import { CashRegisterService } from "../services/CashRegister";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const cashRegisterService = new CashRegisterService();

class CashRegisterController {
    async save(req: Request, res: Response) {
        try {
            const data: CashRegisterInterface = {
                OngId: 1,
                UserId: 1,
                description: 'teste1',
                observation: '',
                paidIn: new Date(),
                type: 'in',
                value: 25.50
            }

            const savedCashRegister = await cashRegisterService.save(data)
            const responseHandled = responseClientService.successResponse(savedCashRegister);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }
}

export {
    CashRegisterController
}