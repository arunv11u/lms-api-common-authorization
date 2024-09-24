import { JWTPayload } from "../../json-web-token";

abstract class JSONWebToken {
	abstract verify(
		token: string,
		secret: string
	): Promise<JWTPayload>;
}

export {
	JSONWebToken
};