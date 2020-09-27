import App from './app'
import * as bodyParser from 'body-parser'

import HomeController from './controllers/home.controller'
import ActionsController from './controllers/actions.controller'

const app = new App({
	port: process.env.PORT || 8080,
	controllers: [
		new HomeController(),
		new ActionsController()
	],
	middleWares: [
		bodyParser.json(),
		bodyParser.urlencoded({ extended: true })
	]
});

app.listen()