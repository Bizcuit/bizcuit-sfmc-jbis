import InteractionStudioConfig from "./interactionstudioconfig"
import Utils from "./utils"

export default class InteractionStudioResponse {
	segments: string = ""
	recommendations: string = ""
	experience: string = ""
	userGroup: string = ""
	attribute: string = ""
	attribute2: string = ""
	attribute3: string = ""
	status: string = "OK"

	public static getFromResponseBody(body: any, config: InteractionStudioConfig) {
		const isResponse = new InteractionStudioResponse()
		const recommendationsList: Array<string> = new Array<string>()
		const campaignResponse: any = body?.campaignResponses?.find((c: any) => c.campaignName.toLowerCase().trim() === config.campaign.toLowerCase().trim())

		if (!campaignResponse) {
			isResponse.status = "ERROR: Server-Side campaign '" + config.campaign + "' was not found"
			Utils.log(isResponse.status, body)
			return isResponse
		}

		isResponse.experience = campaignResponse?.experienceName || ""
		isResponse.userGroup = campaignResponse?.userGroup || ""

		campaignResponse?.serverSideMessages?.forEach((message: any) => {
			isResponse.attribute = message?.dataMap?.attribute || isResponse.attribute
			isResponse.attribute2 = message?.dataMap?.attribute2 || isResponse.attribute2
			isResponse.attribute2 = message?.dataMap?.attribute3 || isResponse.attribute3

			isResponse.segments = message?.dataMap?.segments || isResponse.segments

			if (message?.dataMap?.recommendations?.length) {
				recommendationsList.push(message.dataMap.recommendations.map((r: any) => r._id))
			}
		})

		isResponse.recommendations = recommendationsList.join(",")

		return isResponse
	}
}