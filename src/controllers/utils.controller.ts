import * as express from 'express'
import { Request, Response } from 'express'
import Utils from '../classes/utils'
import InteractionStudio from '../classes/interactionstudio'

class UtilsController {
	public path = '/utils'
	public router = express.Router()

	constructor() {
		this.router.post('/datasets', this.getDatasets)
		this.router.post('/test', this.getDatasets)
    }

    public async test(req: Request, res: Response){
        res.json({})
    }

	public async getDatasets(req: Request, res: Response) {
        Utils.log("getDatasets", req.body)

        let result: any = {};
        const isValidated = await Utils.validateTenant(req.body)

        if(isValidated){
            const p13n = new InteractionStudio()
            result = await p13n.callDatasetApi()
        }

        res.json(result)
	}
}

export default UtilsController