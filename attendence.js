const createAttendence = (app, db) => {
  app.post("/attendence", async (req, res) => {
    const body = req.body;
    const cursor = await db
      .collection("attendenceCollection")
      .doc(body.id)
      .collection("attendenceList")
      .doc()
      .set(body);
    res.send(cursor);
  });
};

module.exports = { createAttendence };
