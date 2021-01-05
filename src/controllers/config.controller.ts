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
						{ "contactKey": "{{Contact.Key}}" },
						{ "emailAddress": "{{InteractionDefaults.Email}}" },

						{ "is_account": "" },
						{ "is_dataset": "" },
						{ "is_token": "" },
						{ "is_userid_field": "" },
						{ "is_custom_payload": "" },
						{ "is_action": "" },

						// { "is_field_mapping": "" },
						// { "mc_dataextension": "" },
						// { "mc_authurl": "" },
						// { "mc_mid": "" },
						// { "mc_client_id": "" },
						// { "mc_client_secret": "" },
						// { "mc_multirow": false }
					],
					"outArguments": [
						{
							"segments": "",
							"recommendation": "",
							"attribute1": "",
							"attribute2": "",
							"attribute3": ""
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
				{ "label": "IS Setup", "key": "is_setup" },
				// { "label": "MC Setup", "key": "mc_setup" },
				// { "label": "Data Mapping", "key": "mapping" }
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
							// { "is_field_mapping": { "dataType": "Text", "isNullable": true, "direction": "in" } },
							// { "mc_dataextension": { "dataType": "Text", "isNullable": true, "direction": "in" } },
							// { "mc_multirow": { "dataType": "Boolean", "isNullable": true, "direction": "in" } },
							// { "mc_authurl": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							// { "mc_mid": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							// { "mc_client_id": { "dataType": "Text", "isNullable": false, "direction": "in" } },
							// { "mc_client_secret": { "dataType": "Text", "isNullable": false, "direction": "in" } }
						],
						"outArguments": [
							{
								"segments": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
								"recommendation": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
								"attribute1": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
								"attribute2": {
									"dataType": "Text",
									"direction": "out",
									"access": "visible"
								},
								"attribute3": {
									"dataType": "Text",
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

export default ConfigController