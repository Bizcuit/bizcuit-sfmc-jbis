import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
import Utils from './utils'
import InteractionStudioConfig from './interactionstudioconfig'
import InteractionStudioResponse from './interactionstudioresponse'

export default class InteractionStudio {
	private config: InteractionStudioConfig

	constructor(config: InteractionStudioConfig) {
		this.config = config
	}

	public get userId(): string {
		return this.config.userField === 'SubscriberKey' ? this.config.contactKey : this.config.emailAddress
	}

	public async executeApi(payload: any): Promise<InteractionStudioResponse> {
		const request: AxiosRequestConfig = {
			method: 'POST',
			url: `https://${this.config.account}.evergage.com/api2/${this.config.token !== '' ? 'authevent' : 'event'}/${this.config.dataset}`,
			headers: {
				"Content-Type": "application/json"
			},
			data: payload
		}

		if (this.config.token !== '') {
			const buffer = Buffer.from(this.config.token, "utf8");
			request.headers.Authorization = `Basic ${buffer.toString("base64")}`
		}

		try {
			const response = await axios(request)
			const isResponse: InteractionStudioResponse = InteractionStudioResponse.getFromResponseBody(response?.data, this.config)
			return isResponse
		}
		catch (err) {
			const isResponse: InteractionStudioResponse = new InteractionStudioResponse();
			isResponse.status = "ERROR: IS API call failed with message: " + err.message;

			Utils.log(isResponse.status, request)

			return isResponse;
		}

		return new InteractionStudioResponse()
	}

	public getDefaultPayload(): any {
		return {
			"action": this.config.action,
			"source": {
				"channel": "Server",
				"application": "JBIS"
			},
			"user": {
				"id": this.userId
			}
		}
	}
}
