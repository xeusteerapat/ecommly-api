import { JWKRoot } from "./../models/JWK";
import * as jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import axios from "axios";
import { createLogger } from "./logger";

const logger = createLogger("Get-User-Profile");

export async function getUserProfile(token: string) {
  logger.info("Get user profile");

  const response = await axios.get(
    `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`
  );

  const jwk: JWKRoot[] = response.data;

  const pem = jwkToPem(jwk.keys[0]);

  const decodedToken = jwt.verify(token, pem, { algorithms: ["RS256"] });

  return decodedToken;
}
