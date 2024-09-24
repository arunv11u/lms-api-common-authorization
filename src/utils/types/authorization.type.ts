import { JWTPayload } from "../../jwt-payload";


export interface Authorization {
	validate(bearerAuthToken: string): Promise<JWTPayload>;
};