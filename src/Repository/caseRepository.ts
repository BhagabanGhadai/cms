import { CaseModel }  from '../models/caseMode';

export class CaseRepository {
    async getAggregatedCase(pipeline:any) {
        try {
            const caseDeatils = await CaseModel.aggregate(pipeline);
            return caseDeatils;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
    async createBulkCase(data:any) {
        try {
            const caseDeatils = await CaseModel.insertMany(data);
            return caseDeatils;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}