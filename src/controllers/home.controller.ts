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
						{ "emailAddress": "{{InteractionDefaults.Email}}" },
						{ "contactKey": "{{Contact.Key}}" },

						{ "is_account": "" },
						{ "is_dataset": "" },
						{ "is_token": "" },
						{ "is_userid_field": "" },
						{ "is_field_mapping": "" },
						{ "is_action": "" },
						{ "is_custom_payload": "" },
						{ "mc_dataextension": "" },
						{ "mc_authurl": "" },
						{ "mc_mid": "" },
						{ "mc_client_id": "" },
						{ "mc_client_secret": "" }
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
				{ "label": "MC Setup", "key": "mc_setup" },
				{ "label": "IS Setup", "key": "is_setup" },
				{ "label": "Data Mapping", "key": "mapping" }
			],
			"userInterfaces": {
				"configModal": {
					"url": "index.html",
					"height": 200,
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
							{ "is_userid_field": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							{ "is_field_mapping": { "dataType": "Text", "isNullable": true, "direction": "in" } },
							{ "is_action": { "dataType": "Text", "isNullable": true, "direction": "in" } },
							{ "is_custom_payload": { "dataType": "Text", "isNullable": true, "direction": "in" } },

							{ "mc_dataextension": { "dataType": "Text", "isNullable": true, "direction": "in" } },
							{ "mc_authurl": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							{ "mc_mid": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							{ "mc_client_id": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							{ "mc_client_secret": { "dataType": "Text", "isNullable": false, "direction": "in" } }
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