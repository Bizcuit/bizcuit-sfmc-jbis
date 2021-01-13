import Utils from "./utils";

export default class InteractionStudioResponse {
	segments: string = "";
	recommendation: string = "";
	attribute: string = "";

	constructor(apiResponse: any) {
		this.segments = Math.floor(Math.random() * 10).toString();
		Utils.log("API Response:", apiResponse.data);
	}
}