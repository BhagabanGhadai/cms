import { Router,Request,Response } from 'express';
import { get } from '../controllers/caseController';
const router = Router();

router.get('/aggregate', get);

router.get('/health-check',async(req:Request,res:Response)=>{
    try{
        return res.status(200).send({
            success:true,
            msg:"Health Check Is Successful",
        })
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
})


export default router;
