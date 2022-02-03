import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import Utils from './utils'
import KeyValuePairs from './keyvaluepairs'
import JourneyBuilderActivityConfig from './journeybuilderactivityconfig'
import { resolveTripleslashReference } from 'typescript'
import { networkInterfaces } from 'os'

export default class InteractionStudio {
    private apiBaseUrl: string
    private apiKey: string
    private apiSecret: string
    private apiToken: string

    private statusPropertyName: string = "__status"

    constructor() {
        this.apiBaseUrl = process.env.IS_API_BASEURL       || "https://bizcuit.requestcatcher.com"
        this.apiKey = process.env.IS_API_KEY               || "__IS_API_KEY"
        this.apiSecret = process.env.IS_API_SECRET         || "__IS_API_SECRET"

        this.apiToken = Buffer.from(this.apiKey + ":" + this.apiSecret, "utf8").toString("base64");
    }

    public async callDatasetApi(): Promise<KeyValuePairs>{
        const result = new KeyValuePairs()

        const request: AxiosRequestConfig = {
            method: 'GET',
            url: `${this.apiBaseUrl}/internal/datasetSummaries`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${this.apiToken}`
            }
        }

        const response = await axios(request)

        if(response && Array.isArray(response.data)){
            response?.data?.forEach((dataset: any) => {
                result[dataset.name] = dataset.label
            })
        }

        return result
    }

    public async callEventApi(jbConfig: JourneyBuilderActivityConfig, payload: any): Promise<KeyValuePairs> {
        let result = new KeyValuePairs()

        result[this.statusPropertyName] = "OK"

        const request: AxiosRequestConfig = {
            method: 'POST',
            url: `${this.apiBaseUrl}/api2/authevent/${jbConfig.dataset}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${this.apiToken}`
            },
            data: payload
        }

        try {
            const eventApiResponse = await axios(request)
            Utils.log("request", JSON.stringify(eventApiResponse, null, 2))
            result = this.parseEventApiResponse(eventApiResponse?.data)
        }
        catch (err: any) {
            result[this.statusPropertyName] = `ERROR: IS API call failed with message: ${err?.message}`;
        }

        return result;
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

        payload.user.attributes[jbConfig.identityAttributeName] = jbConfig.identityAttributeValue

        return payload
    }

    public parseEventApiResponse(eventApiResponseBody: any): KeyValuePairs {
        const result = new KeyValuePairs()
        let isCampaignFound = false

        eventApiResponseBody?.campaignResponses?.forEach((campaignResponse: any) => {
            //console.log(JSON.stringify(campaignResponse?.payload?.jbis));
            if(campaignResponse?.payload?.jbis !== undefined){
                for(const prop of Object.keys(campaignResponse.payload.jbis)){
                    result[prop] = campaignResponse.payload.jbis[prop]
                }
                isCampaignFound = true;
            }
        });

        result[this.statusPropertyName] = isCampaignFound ? "OK" : "ERROR: No JBIS campaigns found"

        return result;
    }
}
