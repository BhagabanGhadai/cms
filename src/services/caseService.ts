const { CaseRepository } = require('../repository/caseRepository');

export class CaseService {
    caseRepository:any
    constructor() {
        this.caseRepository = new CaseRepository();
    }

    async createCase(data:any) {
        try {
            const newCase = await this.caseRepository.createBulkCase(data);
            return newCase;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }
    async getAllCases(options:any) {
        try {
            let filter=[]
            if(options.sd&&options.ed){
                filter.push({ $match: { createdAt: { $gte: new Date(options.sd), $lte: new Date(options.ed) } } },)
            }
            filter.push(
                {
                    $group: {
                        _id: '$city',
                        totalCases: { $sum: 1 },
                    },
                }
            )
            const cases = await this.caseRepository.getAggregatedCase(filter);
            return cases;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }
};