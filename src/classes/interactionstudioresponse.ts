import { isDefaultClause } from "typescript"
import { js2xml } from "xml-js"
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
	order: string = ""
	status: string = "OK"

	public static getFromResponseBody(body: any, config: InteractionStudioConfig) {
		const isResponse = new InteractionStudioResponse()
		const recommendationsList: string[] = new Array<string>()
		const campaignResponse: any = body?.campaignResponses?.find((c: any) => c.campaignName.toLowerCase().trim() === config.campaign.toLowerCase().trim())

		if (!campaignResponse) {
			isResponse.status = `WARNING: Server-Side campaign '${config.campaign}' was not found.\n\n`
				+ 'Actions will be still captured by IS, but no data will be returned back to MC.\n\n'
				+ '- Check if the campaign is published and the name is correct.\n'
				+ '- Check if all Custom User Attributes use our workaround described in the documentation.\n'
				+ '- Check if a recipe used in the campaign returns recos for test users.\n'
				+ '- Use the PREVIEW button of the Server-Side campaign to make sure that it is return for your test users.\n'

			Utils.log(isResponse.status, body)
			return isResponse
		}

		isResponse.experience = campaignResponse?.experienceName || ""
		isResponse.userGroup = campaignResponse?.userGroup || ""
		isResponse.attribute = campaignResponse?.payload?.attribute1 || ""
		isResponse.attribute2 = campaignResponse?.payload?.attribute2 || ""
		isResponse.attribute3 = campaignResponse?.payload?.attribute2 || ""
		isResponse.recommendations = campaignResponse?.payload?.recommendations || ""
		isResponse.segments = campaignResponse?.payload?.segments || ""

		if (campaignResponse?.payload?.orders?.length > 0) {
			const orders: Array<any> = campaignResponse?.payload?.orders
			let order = null

			if (campaignResponse?.payload?.orderType === "Current Cart") {
				order = orders.filter(o => o.status === "Open").pop()
			}
			else if (campaignResponse?.payload?.orderType === "Last Order") {
				order = orders.filter(o => o.status === "Purchased").sort((a, b) => a.purchaseDate - b.purchaseDate).pop()
			}

			if (order) {
				isResponse.order = campaignResponse?.payload?.orderAsXml ? js2xml(order) : JSON.stringify(order)
			}
		}

		/* Old Server-Side campaigns logic */
		if (campaignResponse?.serverSideMessages !== undefined) {
			campaignResponse.serverSideMessages.forEach((message: any) => {
				isResponse.attribute = message?.dataMap?.attribute || isResponse.attribute
				isResponse.attribute2 = message?.dataMap?.attribute2 || isResponse.attribute2
				isResponse.attribute3 = message?.dataMap?.attribute3 || isResponse.attribute3
	
				isResponse.segments = message?.dataMap?.segments || isResponse.segments
	
				if (message?.dataMap?.recommendations?.length) {
					recommendationsList.push(message.dataMap.recommendations.map((r: any) => r._id))
				}
			})
	
			isResponse.recommendations = recommendationsList.join(",")
		}

		return isResponse
	}
}