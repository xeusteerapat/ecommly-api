import StripeServiceWrapper from "../payment-services/stripe";
import { Charging } from "./../models/Payment";

const payment = new StripeServiceWrapper();

/**
 * Create token for charging
 * @returns token
 */
export async function createCreditCardToken() {
  const token = await payment.createToken();

  return token;
}

/**
 * Create charge
 * @returns charge
 */
export async function createCharge(charge: Charging, tokenId: string) {
  const charges = await payment.createCharge(charge, tokenId);

  return charges;
}
