import App from './app'
import dotenv from 'dotenv'
import * as bodyParser from 'body-parser'

import ConfigController from './controllers/config.controller'
import ActionsController from './controllers/actions.controller'
import UtilsController from './controllers/utils.controller'

dotenv.config()

const app = new App({
	port: process.env.PORT || 8080,
	controllers: [
		new ConfigController(),
		new ActionsController(),
        new UtilsController()
	],
	middleWares: [
		bodyParser.json(),
		bodyParser.urlencoded({ extended: true }),
        bodyParser.text()
	]
});

app.listen()