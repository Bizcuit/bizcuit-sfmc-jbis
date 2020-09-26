import express from 'express'
import { Application } from 'express'

class App {
	public app: Application
	public port: number | string

	constructor(appInit: { port: number | string; middleWares: any; controllers: any; }) {
		this.app = express()
		this.port = appInit.port

		this.middlewares(appInit.middleWares)
		this.routes(appInit.controllers)
		this.assets()
		this.template()
	}

	private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
		middleWares.forEach(middleWare => {
			this.app.use(middleWare)
		})
	}

	private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
		controllers.forEach(controller => {
			this.app.use(controller.path, controller.router)
		})
	}

	private assets() {
		this.app.use(express.static('public'))
		this.app.use(express.static('views'))
	}

	private template() {
		this.app.set('view engine', 'pug')
	}

	public listen() {
		this.app.listen(this.port, () => {
			// tslint:disable-next-line:no-console
			console.log(`App listening on the http://localhost:${this.port}`)
		})
	}
}

export default App;