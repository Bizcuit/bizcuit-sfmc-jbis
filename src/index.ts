import App from './app'
import * as bodyParser from 'body-parser'

import HomeController from './controllers/home.controller'

const app = new App({
	port: process.env.PORT || 8080,
	controllers: [
		new HomeController()
	],
	middleWares: [
		bodyParser.json(),
		bodyParser.urlencoded({ extended: true })
	]
});

app.listen()