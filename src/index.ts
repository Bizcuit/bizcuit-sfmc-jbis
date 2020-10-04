import App from './app'
import * as bodyParser from 'body-parser'

import ConfigController from './controllers/config.controller'
import ActionsController from './controllers/actions.controller'

const app = new App({
	port: process.env.PORT || 8080,
	controllers: [
		new ConfigController(),
		new ActionsController()
	],
	middleWares: [
		bodyParser.json(),
		bodyParser.urlencoded({ extended: true })
	]
});

app.listen()