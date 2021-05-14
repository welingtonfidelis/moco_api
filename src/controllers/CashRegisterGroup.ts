import { Request, Response } from "express"
import { CashRegisterGroupInterface } from "../entities/CashRegisterGroup";
import { CashRegisterGroupService } from "../services/CashRegisterGroup";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const cashRegisterGroupService = new CashRegisterGroupService;

class CashRegisterGroupController {
    async save(req: Request, res: Response) {
        try {
            const { description, observation } = req.body;
            const { ongId } = req;
            const data: CashRegisterGroupInterface = {
                ong_id: ongId,
                description,
                observation
            }

            const savedCashRegisterGroup = await cashRegisterGroupService.save(data)
            const responseHandled = responseClientService.successResponse(savedCashRegisterGroup);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query?.page as string ?? '1');
            const limit = parseInt(req.query?.limit as string ?? '10');
            const { ongId } = req;

            const listCashRegisterGroups = await cashRegisterGroupService.list(page, limit, ongId);
            const responseHandled = responseClientService.successResponse(listCashRegisterGroups);

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

            const selectedCashRegisterGroup = await cashRegisterGroupService.show(id, ongId);
            const responseHandled = responseClientService.successResponse(selectedCashRegisterGroup);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { description, observation } = req.body;
            const { id } = req.params;
            const { ongId } = req;
            const data: CashRegisterGroupInterface = {
                ong_id: ongId,
                description, 
                observation
            }

            const updatedCashRegisterGroup = await cashRegisterGroupService.update(id, ongId, data);
            const responseHandled = responseClientService.successResponse(updatedCashRegisterGroup);

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

            const deletedCashRegisterGroup = await cashRegisterGroupService.delete(id, ongId);
            const responseHandled = responseClientService.successResponse(deletedCashRegisterGroup);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }
}

export {
    CashRegisterGroupController
}