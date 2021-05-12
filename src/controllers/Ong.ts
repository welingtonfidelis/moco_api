import { Request, Response } from "express"
import { OngInterface } from "../models/Ong";
import { OngService } from "../services/Ong";
import { ResponseClientService } from "../services/ResponseClient";

const responseClientService = new ResponseClientService();
const ongService = new OngService();

class OngController {
    async save(req: Request, res: Response) {
        try {
            const data: OngInterface = req.body;
            
            const savedOng = await ongService.save(data);
            const responseHandled = responseClientService.successResponse(savedOng);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async list(req: Request, res: Response) {
        try {
            const listOngs = await ongService.list();
            const responseHandled = responseClientService.successResponse(listOngs);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }
}

export {
    OngController
}