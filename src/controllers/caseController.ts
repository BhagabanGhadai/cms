import { CaseService } from '../services/caseService';
import { Request,Response } from 'express';
const caseService = new CaseService();

export const create = async (req:Request, res:Response) => {
    try {
        const response = await caseService.createCase(req.body);
        return res.status(201).json({
            message: 'Successfully created the cases',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot create a new cases'
        })
    }
}

export const get = async (req:Request, res:Response) => {
    try {
        const response = await caseService.getAllCases(req.query);
        return res.status(201).json({
            message: 'Successfully fetched the cases',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'error while fetching cases'
        })
    }
}