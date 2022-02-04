import * as express from 'express'
import { Request, Response } from 'express'
import Utils from '../classes/utils'
import InteractionStudio from '../classes/interactionstudio'
import JourneyBuilderActivityConfig from '../classes/journeybuilderactivityconfig'
import KeyValuePairs from '../classes/keyvaluepairs'

class UtilsController {
	public path = '/utils'
	public router = express.Router()

	constructor() {
		this.router.post('/datasets', this.getDatasets)
		this.router.post('/test', this.getDatasets)
    }

    public async test(req: Request, res: Response){
        let result: KeyValuePairs = {};
        const isValidated = await Utils.validateTenant(req.body)

        if(isValidated){
            const p13n = new InteractionStudio()
            const config = JourneyBuilderActivityConfig.getFromRequest(req)
            result = await p13n.callEventApi(config.dataset, p13n.getEventApiPayload(config))
        }

        res.json(result)
    }

	public async getDatasets(req: Request, res: Response) {
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