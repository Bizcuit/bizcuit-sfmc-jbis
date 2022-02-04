import { Request } from 'express'
import { verify } from 'jsonwebtoken'
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

export default class Utils {
	public static log(message: string, data: any) {
		console.log(message, data)
	}

    public static getRequestBody(request: Request){
        if(request.headers["content-type"] === "application/jwt"){
            return verify(request.body, process.env.MC_JWT_SECRET || "")
        }

        return request.body
    }

    public static async validateTenant(data: any){
        const token = data?.token?.fuel2token
        const endpoint = data?.endpoints?.fuelapiRestHost + "platform/v1/tokenContext"

        const request: AxiosRequestConfig = {
            method: 'GET',
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const response = await axios(request)

            Utils.log("response?.data?.enterprise?.id=" + response?.data?.enterprise?.id, "");
            Utils.log("process.env.MC_EID" + process.env.MC_EID, "");

            return response?.data?.enterprise?.id === process.env.MC_EID
        }
        catch(err: any){
            Utils.log("ERROR: Tenant validation failed.", err?.message)
            Utils.log("ERROR", request)
        }

        return false;
    }
}