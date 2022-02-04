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
        Utils.log("test", req.body)
    }

	public async getDatasets(req: Request, res: Response) {
        Utils.log("getDatasets", req.body)

        const p13n = new InteractionStudio()
		const result = await p13n.callDatasetApi()
        res.json(result)
	}
}

export default UtilsController