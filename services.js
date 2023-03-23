const addServices = (app, db) => {
  app.post("/addservices", async (req, res) => {
    const body = req.body;
    const cursor = await db
      .collection("serviceCollection")
      .doc(body.id)
      .set(body);
    res.send(cursor);
  });
};

const updateServices = (app, db) => {
  app.put("/addservices/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const cursor = await db
      .collection("serviceCollection")
      .doc(id)
      .update(body);
    res.send(cursor);
  });
};

const deleteServices = (app, db) => {
  app.delete("/addservices/:id", async (req, res) => {
    const id = req.params.id;
    const cursor = db.collection("serviceCollection").doc(id).delete();
    res.send(cursor);
  });
};

module.exports = { addServices, updateServices, deleteServices };
