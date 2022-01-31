import * as express from 'express'
import { Request, Response } from 'express'
import Utils from '../classes/utils'
import InteractionStudio from '../classes/interactionstudio'

class UtilsController {
	public path = '/utils'
	public router = express.Router()

	constructor() {
		this.router.all('/datasets', this.getDatasets)
	}

	public async getDatasets(req: Request, res: Response) {
        const is = new InteractionStudio()
		const result = await is.callDatasetApi()
        res.json(result)
	}
}

export default UtilsController