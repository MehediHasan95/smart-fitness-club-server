const addPayment = (app, db) => {
  app.post("/payment", async (req, res) => {
    const body = req.body;
    const cursor = await db
      .collection("paymentCollection")
      .doc(body.uid)
      .collection("paymentList")
      .doc()
      .set(body);
    res.send(cursor);
  });
};
module.exports = { addPayment };
