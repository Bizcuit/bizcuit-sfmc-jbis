export default class InteractionStudioConfig {
	public account: string = ""
	public dataset: string = ""
	public token: string = ""
	public action: string = "JBIS"
	public userField: string = "SubscriberKey"
	public contactKey: string = ""
	public emailAddress: string = ""
	public campaign: string = ""

	public static getFromRequest(request: any): InteractionStudioConfig {
		const result = new InteractionStudioConfig();

		request?.inArguments?.forEach((a: any) => {
			for (const p of Object.keys(a)) {
				if (p === 'contactKey') result.contactKey = a[p];
				if (p === 'emailAddress') result.emailAddress = a[p];
				if (p === 'is_account') result.account = a[p];
				if (p === 'is_dataset') result.dataset = a[p];
				if (p === 'is_token') result.token = a[p];
				if (p === 'is_userid_field') result.userField = a[p];
				if (p === 'is_action') result.action = a[p];
				if (p === 'is_campaign') result.campaign = a[p];
			}
		});

		return result;
	}
}
