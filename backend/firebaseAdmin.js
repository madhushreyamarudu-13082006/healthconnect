const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("node:fs");
const path = require("node:path");

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
const localServiceAccountPath = path.join(__dirname, "serviceAccountKey.json");

let serviceAccount;
if (serviceAccountJson) {
  serviceAccount = JSON.parse(serviceAccountJson);
} else if (fs.existsSync(localServiceAccountPath)) {
  serviceAccount = require(localServiceAccountPath);
} else {
  throw new Error(
    "Set FIREBASE_SERVICE_ACCOUNT or provide backend/serviceAccountKey.json for local development."
  );
}

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

module.exports = db;