import * as express from 'express'
import { Request, Response } from 'express'

class HomeController {
	public path = '/config.json'
	public router = express.Router()

	constructor() {
		this.router.all('*', this.config);
	}

	public home(req: Request, res: Response) {
		res.json({ "home": "page" })
	}

	public config(req: Request, res: Response) {
		const host: string = req.headers.host || 'localhost';

		res.json({
			"workflowApiVersion": "1.1",
			"metaData": {
				"icon": "images/sms.png",
				"category": "message"
			},
			"type": "REST",
			"lang": {
				"en-US": {
					"name": "JBIS",
					"description": "Gets campaigns from Interaction Studion"
				}
			},
			"arguments": {
				"execute": {
					"inArguments": [
						{
							"emailAddress": "{{InteractionDefaults.Email}}"
						},
						{
							"phoneNumber": "{{Contact.Default.PhoneNumber}}"
						}
					],
					"outArguments": [
						{
							"foundSignupDate": ""
						}
					],
					"url": `https://${host}/actions/execute`
				}
			},
			"configurationArguments": {
				"save": {
					"url": `https://${host}/actions/save`
				},
				"publish": {
					"url": `https://${host}/actions/publish`
				},
				"validate": {
					"url": `https://${host}/actions/validate`
				},
				"stop": {
					"url": `https://${host}/actions/stop`
				}
			},
			"wizardSteps": [
				{ "label": "Step 1", "key": "step1" },
				{ "label": "Step 2", "key": "step2" },
				{ "label": "Step 3", "key": "step3" },
				{ "label": "Step 4", "key": "step4", "active": false }
			],
			"userInterfaces": {
				"configModal": {
					"url": "index.html",
					"height": 200,
					"width": 300,
					"fullscreen": true
				}
			},
			"schema": {
				"arguments": {
					"execute": {
						"inArguments": [
							{
								"phoneNumber": {
									"dataType": "Phone",
									"isNullable": false,
									"direction": "in"
								}
							},
							{
								"emailAddress": {
									"dataType": "Email",
									"isNullable": false,
									"direction": "in"
								}
							}
						],
						"outArguments": [
							{
								"foundSignupDate": {
									"dataType": "Date",
									"direction": "out",
									"access": "visible"
								}
							}
						]
					}
				}
			}
		})
	}
}

export default HomeController