import * as express from 'express'
import { Request, Response } from 'express'
import Utils from '../classes/utils'

class ActionsController {
	public path = '/actions'
	public router = express.Router()
	public requestCounter: number = 0;

	constructor() {
		this.router.all('/save', this.save)
		this.router.all('/publish', this.publish)
		this.router.all('/validate', this.validate)
		this.router.all('/stop', this.stop)
		this.router.all('/execute', this.execute)
	}

	public save(req: Request, res: Response) {
		Utils.log('SAVE', req.body);

		res.json({ result: "success" })
	}

	public publish(req: Request, res: Response) {
		Utils.log('PUBLISH', req.body);

		res.json({ result: "success" })
	}

	public validate(req: Request, res: Response) {
		Utils.log('VALIDATE', req.body);

		res.json({ result: "success" })
	}

	public stop(req: Request, res: Response) {
		Utils.log('STOP', req.body);

		res.json({ result: "success" })
	}

	public execute(req: Request, res: Response) {
		Utils.log('COUNTER_NONSTATIC', this.requestCounter++)
		Utils.log('EXECUTE', req.body)

		/*
		EXECUTE {
		inArguments: [
		{ emailAddress: 'sepp@samsung.com' },
		{ contactKey: 'SFMC_TK_101' },
		{ is_account: 'interactionstudion' },
		{ is_dataset: 'sagadzhanov_sandbox' },
		{ is_token: 'NOTOKENREQUIRED' },
		{ is_userid_field: 'SubscriberKey' },
		{ is_field_mapping: '{"foo": "bar"}' }
		],
		outArguments: [ { foundSignupDate: '' } ],
		activityObjectID: '5d1bda71-665d-4705-aa1f-5568f3b84292',
		journeyId: 'c1dd0de8-ce2c-4201-9862-a5d55a946f9b',
		activityId: '5d1bda71-665d-4705-aa1f-5568f3b84292',
		definitionInstanceId: '867cd348-3956-4c12-8a15-46cca939fe7d',
		activityInstanceId: '3fad9a0e-305b-4dfe-b49f-0d1e5ff46efd',
		keyValue: 'SFMC_TK_101',
		mode: 0
		}
		*/


		res.json({ result: "success" })
	}
}

export default ActionsController