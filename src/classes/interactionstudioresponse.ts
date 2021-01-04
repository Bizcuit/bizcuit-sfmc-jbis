export default class InteractionStudioResponse {
	segments: string = "";

	recommendation1: string = "";
	recommendation2: string = "";
	recommendation3: string = "";

	attribute1: string = "";
	attribute2: string = "";
	attribute3: string = "";

	constructor(apiResponse: any) {
		this.segments = Math.floor(Math.random() * 10).toString();
	}
}