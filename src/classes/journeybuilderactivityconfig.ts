import Utils from './utils'
import { Request } from 'express'

export default class JourneyBuilderActivityConfig {
    public dataset: string = ""
    public action: string = "JBIS"
    public identityAttributeName: string = "sfmcContactKey"
    public identityAttributeValue: string = ""

    public isEmpty(){
        return !(this.dataset && this.action && this.identityAttributeName && this.identityAttributeValue)
    }

    public static getFromRequest(request: Request): JourneyBuilderActivityConfig {
        const result = new JourneyBuilderActivityConfig()

        try{
            const data: any = Utils.getRequestBody(request)

            data?.inArguments?.forEach((a: any) => {
                for (const p of Object.keys(a)) {
                    if (p === 'is_dataset') result.dataset = a[p]
                    if (p === 'is_action') result.action = a[p]
                    if (p === 'is_identity_attribute_name') result.identityAttributeName = a[p]
                    if (p === 'is_identity_attribute_value') result.identityAttributeValue = a[p]
                }
            });
        }
        catch(err: any){
            Utils.log("ERROR: Failed to parse request data. ", err?.message)
        }

        return result
    }
}
