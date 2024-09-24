# @arunvaradharajalu/common.learning-management-system-api.authorization

## Overview

This package provides a common authorization module for services within the Learning Management System (LMS). It allows for the validation of bearer authorization tokens using JSON Web Tokens (JWT), ensuring secure access to system resources.

## Installation

You can install this package using npm:

```bash
npm install @arunvaradharajalu/common.learning-management-system-api.authorization
```

## Usage

### Importing the Module

```bash
import {
    Authorization,
    AuthorizationImpl,
    JWTPayload
} from "@arunvaradharajalu/common.learning-management-system-api.authorization";
```

### Example: Validating Authorization Tokens

```bash
const authorization: Authorization = new AuthorizationImpl("your_jwt_private_key");

async function validateToken(bearerToken: string) {
    try {
        const payload: JWTPayload = await authorization.validate(bearerToken);
        console.log("User authenticated with session ID:", payload.sessionId);
    } catch (error) {
        console.error("Invalid token:", error.message);
    }
}
```

In this example, the AuthorizationImpl class is initialized with a JWT private key. The validate method takes a bearer token, extracts the JWT from it, verifies the signature, and returns the decoded payload.

## API Reference

### `AuthorizationImpl`

#### Constructor

```bash
constructor(jwtPrivateKey: string);
```

- jwtPrivateKey: The private key used to verify JWT tokens.

#### Methods

`validate(bearerAuthToken: string): Promise<JWTPayload>`

Validates the provided bearer authorization token.

- bearerAuthToken: A string that contains the bearer token (must start with "Bearer ").
- Returns: A Promise<JWTPayload> containing session and user data.

`JWTPayload`

A class representing the decoded JWT payload. It contains the following properties:

- sessionId: The session ID associated with the token.
- user: The user object associated with the session.
- type: The type of token (e.g., access or refresh token).

## Scripts

- clean: Cleans the build directory.
- build: Compiles the TypeScript code to JavaScript.
- test: Runs the tests using Jest and generates a test report.

## Tests

Tests can be run using:

```bash
npm run test
```

Test results will be available in an HTML format using the jest-html-reporter.

## License

This project is licensed under the ISC License.

## Issues

For any issues or bug reports, please visit the GitHub Issues Page.

## Author

Arun Varadharajalu