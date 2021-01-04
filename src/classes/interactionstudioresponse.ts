export default class InteractionStudioResponse {
	segments: string = "";

	recommendation_1: string = "";
	recommendation_2: string = "";
	recommendation_3: string = "";

	attribute_1: string = "";
	attribute_2: string = "";
	attribute_3: string = "";

	constructor(apiResponse: any) {
		this.segments = Math.floor(Math.random() * 10).toString();
	}
}