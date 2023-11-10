import admin from "firebase-admin";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import serviceAccount from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import Express, { json } from "express";
import cors from "cors";
process.env.GOOGLE_APPLICATION_CREDENTIALS;
const app = Express();
let port = 8000;
app.use(Express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});
initializeApp({
  credential: applicationDefault(),
  projectId: "potion-for-creators",
});
app.post("/send", (req, res) => {
  const receivedToken = req.body.fcmToken;

  const message = {
    notification: {
      title: "Muhammad Mutahir",
      body: "This is a Test Notification",
    },
    token: "YOUR FCM TOKEN HERE",
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0OWU0N2ZiZGQ0ZWUyNDE0Nzk2ZDhlMDhjZWY2YjU1ZDA3MDRlNGQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTXV0YWhpciBLYXJlZW0iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSUd2ZU52NWpMRGEtM2Vsd0lkQzF4M2otWS1vcWxxcEx5dF9FNzF6c2Y1PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Rpc25leS0xMzkwMSIsImF1ZCI6ImRpc25leS0xMzkwMSIsImF1dGhfdGltZSI6MTY5OTYwOTYxNiwidXNlcl9pZCI6Im5TTlJxeWNCVzlaOXR1VDIxZG1FdDF4VXZLMDIiLCJzdWIiOiJuU05ScXljQlc5Wjl0dVQyMWRtRXQxeFV2SzAyIiwiaWF0IjoxNjk5NjA5NjE2LCJleHAiOjE2OTk2MTMyMTYsImVtYWlsIjoibXV0YWhpcmthcmVlbTgyMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMzQyMjcyODAyNTkwOTY4NDU2OSJdLCJlbWFpbCI6WyJtdXRhaGlya2FyZWVtODIwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.dnKOo2p479VC43E_HHgaWjmVquTdT5MJ5p0JL8LOEPeTtPdjpxs_ZnZnhAGMTRXzu7ABDKJUN1s9Yyxczn3ykgLiOfw8Sqpko8TssABDVmiU9YoewRzJU8mYaaaUzWWSKG__IB4qUCVXbs9KFR85RJkMrHA520Qe6sa_J7M2citfEEaY07orL0I_SvAO60tMhABD6bflDVM7C3kcsqXm9alD0a7LQvLSdznxlODddgc1w64Antqyv6LZ4zDDlI6W6c6EtZanXyTZKlKo85qGQL1_5xCEsbXEo94ttqF8RFzA1rlxXMkwUciosWJr2U-Y4Op2PnR9zHO9xyi4e2fC7g",
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});
app.listen(port, (req, res) => {
  console.log("Server start");
});
