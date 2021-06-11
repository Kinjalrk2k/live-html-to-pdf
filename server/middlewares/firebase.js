var admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "live-html-to-pdf",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(
    process.env.FIREBASE_CLIENT_EMAIL
  )}`,
};

console.log(serviceAccount);
console.log(require("../serviceAccount.json"));
console.log(serviceAccount.is(require("../serviceAccount.json")));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function decodeIDToken(req, res, next) {
  if (req.headers.authorization) {
    if (req.headers.authorization.startsWith("Bearer ")) {
      const idToken = req.headers.authorization.split("Bearer ")[1];

      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.userUID = decodedToken.uid;
        return next();
      } catch (err) {
        res.status(403).json(err);
      }
    } else {
      res.status(403).json({ msg: "Missing Bearer Token" });
    }
  } else {
    res.status(401).json({ msg: "Missing Authorization" });
  }
}

module.exports = { decodeIDToken };
