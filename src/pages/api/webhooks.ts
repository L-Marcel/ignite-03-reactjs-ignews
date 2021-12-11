import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    );
  };

  return Buffer.concat(chunks);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  'checkout.session.completed',
  'custumer.subscription.updated',
  'custumer.subscription.deleted'
]);

export default async(req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === "POST") {
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: any;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
      res.status(400).json({ message: "Webhook error: " + error.message});
    };

    const type = event.type;

    if(relevantEvents.has(type)) {
      try {
        switch(type) {
          case ("custumer.subscription.updated"):
          case ("custumer.subscription.deleted"):
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id,
              subscription.customer.toString()
            );

            break;
          case ("checkout.session.completed"):
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );
            
            break;
          default:
            throw new Error("Unhandled event");
        };
      } catch (error) {
        return res.json({ error: "Webhook handler failed"});
      };
    };

    return res.json({ received: true });
  } else {
    res.setHeader("allow", "POST");
    return res.status(405).end("Method not allowed");
  }; ;
};