const createPaymentIntents = async (app, stripe) => {
  app.post("/create-payment-intent", async (req, res) => {
    const body = req.body;
    const bdtToUsd = parseInt(body.price / 107.24) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: bdtToUsd,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};

const addPayment = (app, db) => {
  app.post("/payment", async (req, res) => {
    const body = req.body;
    const cursor = await db
      .collection("paymentCollection")
      .doc(body.uid)
      .collection("list")
      .doc(body.docRef)
      .set(body);
    res.send(cursor);
  });
};

module.exports = { createPaymentIntents, addPayment };
