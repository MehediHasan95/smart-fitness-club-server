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
const stripe = require("stripe")(
  "sk_test_51MqYWOIkb8dsmfJkGKwi0rOAvAxr1CcTbVGxs2sRuGDGLQuvVFsi33oEBcKeXIexCCRRV6Atwi5CYxL743HqdU2X00gr3WjLkv"
);
const { addNotice, deleteNotice, updateNotice } = require("./Notice");
const { createAttendence } = require("./attendence");
const { createPaymentIntents, addPayment } = require("./payment");
const { addShareDataWithTrainer } = require("./shareWithTrainer");

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

    // Payment
    createPaymentIntents(app, stripe);
    addPayment(app, db);
    addShareDataWithTrainer(app, db);

    // Attandance
    createAttendence(app, db);
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running port:", port);
});
