// add notice post
const addNotice = (app, db) => {
  app.post("/notice", async (req, res) => {
    const body = req.body;
    const cursor = await db
      .collection("noticeCollection")
      .doc(body.id)
      .set(body);
    res.send(cursor);
  });
};

const updateNotice = (app, db) => {
  app.put("/notice/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const cursor = await db.collection("noticeCollection").doc(id).update(body);
    res.send(cursor);
  });
};

const deleteNotice = (app, db) => {
  app.delete("/notice/:id", async (req, res) => {
    const id = req.params.id;
    const cursor = db.collection("noticeCollection").doc(id).delete();
    res.send(cursor);
  });
};

module.exports = { addNotice, updateNotice, deleteNotice };
