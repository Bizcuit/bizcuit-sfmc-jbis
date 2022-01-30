import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
import Utils from './utils'
import JourneyBuilderActivityConfig from './journeybuilderactivityconfig'
import { resolveTripleslashReference } from 'typescript'
import { networkInterfaces } from 'os'

export default class InteractionStudio {
	private eventApiEndpoint: string
    private eventApiKey: string
    private eventApiSecret: string
    private eventApiToken: string

	constructor() {
		this.eventApiEndpoint = process.env.IS_API_ENDPOINT || ""
        this.eventApiKey = process.env.IS_API_KEY || ""
        this.eventApiSecret = process.env.IS_API_SECRET || ""
        
        const tokenBuffer = Buffer.from(this.eventApiKey + ":" + this.eventApiSecret, "utf8");
        this.eventApiToken = tokenBuffer.toString("base64")
	}

	public async callEventApi(jbConfig: JourneyBuilderActivityConfig, payload: any): Promise<any> {
		const request: AxiosRequestConfig = {
			method: 'POST',
			url: `${this.eventApiEndpoint}/${jbConfig.dataset}`,
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Basic ${this.eventApiToken}`
			},
			data: payload
		}

		try {
			const eventApiResponse = await axios(request)
			return this.parseEventApiResponse(eventApiResponse?.data)
		}
		catch (err) {
			let result = new Map<string, string>();
			result.set("__status",  `ERROR: IS API call failed with message: ${err?.message}`);

			Utils.log(result.get("__status") || "", request)

			return result;
		}

        return null;
	}

	public getEventApiPayload(jbConfig: JourneyBuilderActivityConfig): any {
		const payload: any = {
			"action": jbConfig.action,
			"source": {
				"channel": "Server",
				"application": "JBIS"
			},
			"user": {
				"attributes": {}
			}
		}

        payload.user.attributes[jbConfig.is_identity_attribute_name] = jbConfig.is_identity_attribute_value

        return payload
	}

    public parseEventApiResponse(eventApiResponseBody: any): Map<String, String> {
		let result = new Map<String, String>()
        let isCampaignFound = false

        eventApiResponseBody?.campaignResponses?.forEach((campaignResponse: any) => {
            if(campaignResponse.jbis){
                isCampaignFound = true;

                for(let prop in campaignResponse.jbis){
                    result.set(prop, campaignResponse.jbis[prop])
                }
            }
        });

        result.set("__status", isCampaignFound ? "OK" : "No matching Server-Side campaigns found")

        return result;
	}
}
