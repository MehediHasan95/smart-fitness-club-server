const addShareDataWithTrainer = (app, db) => {
  app.post("/share", async (req, res) => {
    const body = req.body;
    const cursor = await db
      .collection("shareCollection")
      .doc(body.selectedTrainer.uid)
      .collection("list")
      .doc(body.docRef)
      .set(body);
    res.send(cursor);
  });
};

module.exports = { addShareDataWithTrainer };
