export default class InteractionStudioResponse {
	segments: string = "";

	recommendation: string = "";

	attribute1: string = "";
	attribute2: string = "";
	attribute3: string = "";

	constructor(apiResponse: any) {
		this.segments = Math.floor(Math.random() * 10).toString();
		this.attribute1 = JSON.stringify(apiResponse);
	}
}