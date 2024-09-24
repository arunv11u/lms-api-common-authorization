import {
	Authorization,
	ErrorCodes,
	GenericError,
	JSONWebToken,
	JSONWebTokenImpl
} from "./utils";
import { JWTPayload } from "./jwt-payload";


export class AuthorizationImpl implements Authorization {

	private _jsonWebToken: JSONWebToken;
	private _jwtPrivateKey: string;
	constructor(jwtPrivateKey: string) {
		this._jsonWebToken = new JSONWebTokenImpl();
		this._jwtPrivateKey = jwtPrivateKey;
	}

	async validate(
		bearerAuthToken: string
	): Promise<JWTPayload> {
		const bearer = "Bearer ";

		if (!bearerAuthToken.includes(bearer))
			throw new GenericError({
				code: ErrorCodes.unauthorized,
				error: new Error("Authorization token is invalid"),
				errorCode: 401
			});

		const jwtPayload = new JWTPayload();

		try {
			const authToken = bearerAuthToken
				.substring(bearer.length);

			const payload = await this._jsonWebToken
				.verify(authToken, this._jwtPrivateKey);

			jwtPayload.sessionId = payload.sessionId;
			jwtPayload.type = payload.type;
			jwtPayload.user = payload.user;
		} catch (error) {
			throw new GenericError({
				code: ErrorCodes.unauthorized,
				error: new Error("Authorization token is invalid"),
				errorCode: 401
			});
		}

		return jwtPayload;
	}
}
