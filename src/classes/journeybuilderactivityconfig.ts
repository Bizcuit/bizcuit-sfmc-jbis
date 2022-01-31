export default class JourneyBuilderActivityConfig {
    public dataset: string = ""
    public action: string = "JBIS"
    public identityAttributeName: string = "sfmcContactKey"
    public identityAttributeValue: string = ""

    public static getFromRequest(request: any): JourneyBuilderActivityConfig {
        const result = new JourneyBuilderActivityConfig();

        request?.inArguments?.forEach((a: any) => {
            for (const p of Object.keys(a)) {
                if (p === 'is_dataset') result.dataset = a[p];
                if (p === 'is_action') result.action = a[p];
                if (p === 'is_identity_attribute_name') result.identityAttributeName = a[p];
                if (p === 'is_identity_attribute_value') result.identityAttributeValue = a[p];
            }
        });

        return result;
    }
}
