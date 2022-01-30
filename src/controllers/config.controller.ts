import * as express from 'express'
import { Request, Response } from 'express'

class ConfigController {
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
				"icon": "icon.png",
				"category": "customer"
			},
			"type": "REST",
			"lang": {
				"en-US": {
					"name": "JBIS",
					"description": "Trigger a campaign in Interaction Studio"
				}
			},
			"arguments": {
				"execute": {
					"inArguments": [
						{ "is_identity_attribute_name": "" },
                        { "is_identity_attribute_value": ""},
                        { "is_action": "" },
						{ "is_dataset": "" }
					],
					"outArguments": [],
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
				{ "label": "IS Setup", "key": "is_setup" }
			],
			"userInterfaces": {
				"configModal": {
					"url": "index.html",
					"height": 450,
					"width": 800,
					"fullscreen": false
				}
			},
			"schema": {
				"arguments": {
					"execute": {
						"inArguments": [
                            { "is_identity_attribute_name": { "dataType": "Text", "isNullable": false, "direction": "in" } },
                            { "is_identity_attribute_value": { "dataType": "Text", "isNullable": false, "direction": "in" } },
                            { "is_action": { "dataType": "Text", "isNullable": false, "direction": "in" } },
                            { "is_dataset": { "dataType": "Text", "isNullable": false, "direction": "in" } }
						],
						"outArguments": []
					}
				}
			}
		})
	}
}

export default ConfigController