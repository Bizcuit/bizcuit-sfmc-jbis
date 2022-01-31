import * as express from 'express'
import { Request, Response } from 'express'
import Utils from '../classes/utils'
import InteractionStudio from '../classes/interactionstudio'
import JourneyBuilderActivityConfig from '../classes/journeybuilderactivityconfig'

class ActionsController {
    public path = '/actions'
    public router = express.Router()

    constructor() {
        this.router.all('/save', this.save)
        this.router.all('/publish', this.publish)
        this.router.all('/validate', this.validate)
        this.router.all('/stop', this.stop)
        this.router.all('/execute', this.execute)
    }

    public save(req: Request, res: Response) {
        // Utils.log('SAVE', req.body)
        res.json({ result: "success" })
    }

    public publish(req: Request, res: Response) {
        // Utils.log('PUBLISH', req.body)
        res.json({ result: "success" })
    }

    public validate(req: Request, res: Response) {
        // Utils.log('VALIDATE', req.body)
        res.json({ result: "success" })
    }

    public stop(req: Request, res: Response) {
        // Utils.log('STOP', req.body)
        res.json({ result: "success" })
    }

    public async execute(req: Request, res: Response) {
        Utils.log('EXECUTE', req.body)

        const jbConfig = JourneyBuilderActivityConfig.getFromRequest(req.body)
        const is = new InteractionStudio()
        const isResponse = await is.callEventApi(jbConfig, is.getEventApiPayload(jbConfig))

        Utils.log('RESPONSE', isResponse)

        return res.status(200).json(isResponse)
    }
}

export default ActionsController