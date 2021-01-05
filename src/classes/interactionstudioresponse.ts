import Utils from "./utils";

export default class InteractionStudioResponse {
	segments: string = "";

	recommendation: string = "";

	attribute1: string = "";
	attribute2: string = "";
	attribute3: string = "";

	constructor(apiResponse: any) {
		this.segments = Math.floor(Math.random() * 10).toString();
		Utils.log("AxiosRequestConfig", apiResponse.data);
	}
}