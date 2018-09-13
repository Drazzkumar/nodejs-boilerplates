import constants from "../../config/constants";
import User from "../users/user.model";
const stripe = require("stripe")(constants.STRIPE_SECRET_KEY);

export async function loadAmount(req, res) {
  const amount = req.body.amount;

  amount = Number(amount);

  const charge = await stripe.charges.create({
    amount,
    currency: "usd",
    description: "$5 for 5 credit",
    source: req.body.id
  });

  req.user.credits += 5;
  const user = await req.user.save();

  res.send(req.user);
}
