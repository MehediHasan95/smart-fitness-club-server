const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const { deleteServices, addServices, updateServices } = require("./services");
const {
  createUser,
  setAuthCollection,
  updateAuthCollection,
  deleteAuthCollection,
} = require("./admin");
const { addNotice, deleteNotice, updateNotice } = require("./Notice");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const auth = admin.auth();
const db = admin.firestore();

async function run() {
  try {
    // Admin
    createUser(app, auth, db);
    setAuthCollection(app, db);
    updateAuthCollection(app, auth, db);
    deleteAuthCollection(app, auth, db);

    // Services
    addServices(app, db);
    updateServices(app, db);
    deleteServices(app, db);

    // Notice
    addNotice(app, db);
    deleteNotice(app, db);
    updateNotice(app, db);
    //
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running port:", port);
});
