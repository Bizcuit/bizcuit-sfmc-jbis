import { Request } from 'express'
import { verify } from 'jsonwebtoken'

export default class Utils {
	public static log(message: string, data: any) {
		console.log(message, data)
	}

    public static getRequestBody(request: Request){
        if(request.headers["content-type"] == "application/jwt"){
            return verify(request.body, process.env.MC_JWT_SECRET || "")
        }

        return request.body
    }
}