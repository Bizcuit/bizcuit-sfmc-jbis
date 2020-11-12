import axios, { AxiosRequestConfig } from 'axios';
import Utils from './utils';
import InteractionStudioConfig from './interactionstudioconfig'

export default class InteractionStudio {
	private config: InteractionStudioConfig;

	constructor(config: InteractionStudioConfig) {
		this.config = config
	}

	public get getUserId(): string {
		return this.config.userField === 'SubscriberKey' ? this.config.contactKey : this.config.emailAddress;
	}

	public executeApi(payload: any) {
		const request: AxiosRequestConfig = {
			method: 'POST',
			url: `https://${this.config.account}.evergage.com/api2/event/${this.config.dataset}`,
			data: payload
		};

		if (this.config.token !== '') request.headers = {
			"Authorization": `Basic ${this.config.token}`
		};

		Utils.log("AxiosRequestConfig", this.config);

		return axios(request)
	}

	public getDefaultPayload(): any {
		return {
			"action": this.config.action,
			"source": {
				"channel": "Server"
			},
			"user": {
				"id": this.getUserId
			}
		};
	}
}
