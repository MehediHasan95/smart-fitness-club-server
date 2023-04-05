const createUser = (app, auth, db) => {
  app.post("/authcreate", async (req, res) => {
    const body = req.body;
    auth
      .createUser({
        email: body.email,
        password: body.password,
        displayName: body.displayName,
        photoURL: body.downloadURL,
      })
      .then((userRecord) => {
        db.collection("authCollection").doc(userRecord.uid).set({
          role: body.role,
          docRef: body.docRef,
          displayName: body.displayName,
          email: body.email,
          create: body.create,
          image: body.downloadURL,
          uid: userRecord.uid,
        });
        res.send(userRecord);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });
};

const setAuthCollection = (app, db) => {
  app.post("/auth", async (req, res) => {
    const body = req.body;
    const cursor = await db
      .collection("authCollection")
      .doc(body.uid)
      .set(body);
    res.send(cursor);
  });
};

const updateAuthCollection = (app, auth, db) => {
  app.put("/auth/:uid", async (req, res) => {
    const uid = req.params.uid;
    const body = req.body;
    auth
      .updateUser(uid, {
        email: body.email,
        displayName: body.displayName,
      })
      .then((userRecord) => {
        db.collection("authCollection").doc(uid).update(body);
        res.send(userRecord);
      })
      .catch((error) => {
        res.send(error);
      });
  });
};

const deleteAuthCollection = (app, auth, db) => {
  app.delete("/auth/:uid", async (req, res) => {
    const uid = req.params.uid;
    auth
      .deleteUser(uid)
      .then(() => {
        db.collection("authCollection").doc(uid).delete();
        res.send({ delete: "delete" });
      })
      .catch((error) => {
        res.send(error);
      });
  });
};

module.exports = {
  createUser,
  setAuthCollection,
  updateAuthCollection,
  deleteAuthCollection,
};
