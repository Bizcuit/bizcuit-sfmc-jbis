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
				"category": "message"
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
						{ "contactKey": "{{Contact.Key}}" },
						{ "emailAddress": "{{InteractionDefaults.Email}}" },

						{ "is_account": "" },
						{ "is_dataset": "" },
						{ "is_token": "" },
						{ "is_userid_field": "" },
						{ "is_custom_payload": "" },
						{ "is_action": "" },
						{ "is_campaign": "" }
					],
					"outArguments": [
						{ "segments": "" },
						{ "recommendations": "" },
						{ "attribute": "" },
						{ "experience": "" },
						{ "userGroup": "" }
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
				{ "label": "IS Setup", "key": "is_setup" }
			],
			"userInterfaces": {
				"configModal": {
					"url": "index.html",
					"height": 300,
					"width": 800,
					"fullscreen": false
				}
			},
			"schema": {
				"arguments": {
					"execute": {
						"inArguments": [
							{ "contactKey": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							{ "emailAddress": { "dataType": "Email", "isNullable": false, "direction": "in" } },
							{ "is_account": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							{ "is_dataset": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							{ "is_token": { "dataType": "Text", "isNullable": true, "direction": "in" } },
							{ "is_userid_field": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							{ "is_custom_payload": { "dataType": "Text", "isNullable": true, "direction": "in" } },
							{ "is_action": { "dataType": "Text", "isNullable": true, "direction": "in" } },
							{ "is_campaign": { "dataType": "Text", "isNullable": true, "direction": "in" } }
						],
						"outArguments": [
							{
								"segments": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
								"recommendations": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
								"attribute": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
								"experience": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
								"userGroup": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
							}
						]
					}
				}
			}
		})
	}
}

export default ConfigController