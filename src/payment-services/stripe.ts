import Stripe from "stripe";
import { Charging } from "./../models/Payment";

class StripeServiceWrapper {
  constructor(
    private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    })
  ) {}

  async createToken() {
    // * For simplicity, I'll mock credit card to create a token
    const tokenParams: Stripe.TokenCreateParams = {
      card: {
        number: "4242424242424242",
        exp_month: "10",
        exp_year: "2022",
        cvc: "314",
      },
    };

    const token: Stripe.Token = await this.stripe.tokens.create(tokenParams);

    return token;
  }

  async createCharge(newChargeObj: Charging, tokenId: string) {
    const { amount, currency, description } = newChargeObj;

    const charge = await this.stripe.charges.create({
      amount,
      currency,
      description,
      source: tokenId,
    });

    return charge;
  }

  async createCustomer(customerData) {
    const { name, email, source, address, phone } = customerData;

    const customer = await this.stripe.customers.create({
      address,
      name,
      email,
      phone,
      source,
    });

    return customer;
  }
}

export default StripeServiceWrapper;
