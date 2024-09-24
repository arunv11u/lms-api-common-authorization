import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import { Authorization, AuthorizationImpl } from "../src";
import { GenericError } from "../src/utils";


describe("Authorization Module", () => {
	let authorization: Authorization;
	const id = faker.string.alphanumeric(10);
	let bearerAuthToken: string;
	let jwtPrivateKey = faker.string.alphanumeric(7);

	beforeEach(() => {
		const authToken = jwt.sign(
			{ user: id, organizations: [] },
			jwtPrivateKey
		);
		bearerAuthToken = `Bearer ${authToken}`;

		authorization = new AuthorizationImpl(jwtPrivateKey);
	});

	describe("\"validate\" method", () => {
		describe("Exception Path", () => {
			it("Invalid token provided, should throw error", () => {
				expect(
					() => authorization
						.validate(faker.string.alphanumeric(15))
				).rejects.toThrow(GenericError);
			});
		});

		describe("Happy Path", () => {
			it("Valid token provided, should return user token payload", async () => {
				const userRequestPayload =
					await authorization.validate(bearerAuthToken);

				expect(userRequestPayload.user).toBe(id);
			});
		});
	});
});
