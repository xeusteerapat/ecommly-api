import * as jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import axios from "axios";
import { createLogger } from "./logger";

const logger = createLogger("Get-User-Profile");

export async function getUserProfile(token: string) {
  const { data } = await axios.get(
    `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`
  );

  logger.info("Check data", data);

  const pem = jwkToPem(data);

  logger.info("Check pem", pem);

  const decodedToken = jwt.verify(token, pem, { algorithms: ["RS256"] });

  return decodedToken;
}
