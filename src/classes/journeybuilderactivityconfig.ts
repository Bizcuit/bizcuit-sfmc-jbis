export default class JourneyBuilderActivityConfig {
    public dataset: string = ""
    public action: string = "JBIS"
    public is_identity_attribute_name: string = "sfmcContactKey"
    public is_identity_attribute_value: string = ""
    
    public static getFromRequest(request: any): JourneyBuilderActivityConfig {
        const result = new JourneyBuilderActivityConfig();

        request?.inArguments?.forEach((a: any) => {
            for (const p of Object.keys(a)) {
                if (p === 'is_dataset') result.dataset = a[p];
                if (p === 'is_action') result.action = a[p];
                if (p === 'is_identity_attribute_name') result.is_identity_attribute_name = a[p];
                if (p === 'is_identity_attribute_value') result.is_identity_attribute_name = a[p];
            }
        });

        return result;
    }
}
