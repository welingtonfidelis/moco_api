import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenInterface } from '../entities/Token';
import { ResponseClientService } from '../services/ResponseClient';

const responseClientService = new ResponseClientService();

const authMidleware = (req: Request, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.SECRET!;
    const { authorization } = req.headers;

    if (!authorization) {
        const errorHandled = responseClientService.successResponse(
            {},
            401,
            'Authorization is required'
        );

        return res.status(401).json(errorHandled);
    }

    const token = authorization.replace('Bearer', '').trim();

    let verifiedToken = {}

    try {
        verifiedToken = jwt.verify(token, jwtSecret);
    } catch (error) {
        const errorHandled = responseClientService.successResponse(
            {},
            401,
            error.message || 'Failed in authentication'
        );

        return res.status(401).json(errorHandled);
    }

    Object.assign(req, verifiedToken as TokenInterface);

    return next();
}

export {
    authMidleware
}