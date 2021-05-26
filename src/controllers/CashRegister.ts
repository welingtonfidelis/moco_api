import { Request, Response } from "express"
import { CashRegisterFilterInterface, CashRegisterInterface } from "../entities/CashRegister";
import { CashRegisterService } from "../services/CashRegister";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const cashRegisterService = new CashRegisterService();

class CashRegisterController {
    async save(req: Request, res: Response) {
        try {
            const {
                description, observation, paid_in, value, type, cash_register_group_id
            } = req.body;
            const { userId, ongId } = req;
            const data: CashRegisterInterface = {
                ong_id: ongId,
                user_id: userId,
                description,
                observation,
                paid_in,
                type,
                value,
                cash_register_group_id
            }

            const savedCashRegister = await cashRegisterService.save(data)
            const responseHandled = responseClientService.successResponse(savedCashRegister);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async list(req: Request, res: Response) {
        try {
            const { ongId } = req;
            const page = parseInt(req.query?.page as string ?? '1');
            const limit = parseInt(req.query?.limit as string ?? '10');
            const date_start = req.query?.date_start as string
            const date_end = req.query?.date_end as string
            const description = req.query?.description as string;
            const type = req.query?.type as string;
            const cash_register_group_id = req.query?.cash_register_group_id as string;
            const filter: CashRegisterFilterInterface = {
                date_start, date_end, description, type, cash_register_group_id
            }

            const listCashRegisters = await cashRegisterService
                .list(page, limit, ongId, filter);
            const responseHandled = responseClientService.successResponse(listCashRegisters);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async reportCashOnHand(req: Request, res: Response) {
        try {
            const { ongId } = req;

            const total = await cashRegisterService
                .reportCashOnHand(ongId);
            const responseHandled = responseClientService.successResponse(total);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async reportList(req: Request, res: Response) {
        try {
            const { ongId } = req;
            const date_start = req.query?.date_start as string
            const date_end = req.query?.date_end as string
            const description = req.query?.description as string;
            const type = req.query?.type as string;
            const cash_register_group_id = req.query?.cash_register_group_id as string;
            const filter: CashRegisterFilterInterface = {
                date_start, date_end, description, type, cash_register_group_id
            }

            const listCashRegisters = await cashRegisterService
                .reportList(ongId, filter);
            const responseHandled = responseClientService.successResponse(listCashRegisters);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { ongId } = req;

            const selectedCashRegister = await cashRegisterService.show(id, ongId);
            const responseHandled = responseClientService.successResponse(selectedCashRegister);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {
                description, observation, paid_in, value, type, cash_register_group_id
            } = req.body;
            const { id } = req.params;
            const { userId, ongId } = req;
            const data: CashRegisterInterface = {
                ong_id: ongId,
                user_id: userId,
                description,
                observation,
                paid_in,
                type,
                value,
                cash_register_group_id
            }

            const updatedCashRegister = await cashRegisterService.update(id, ongId, data);
            const responseHandled = responseClientService.successResponse(updatedCashRegister);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { ongId } = req;

            const deletedCashRegister = await cashRegisterService.delete(id, ongId);
            const responseHandled = responseClientService.successResponse(deletedCashRegister);

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