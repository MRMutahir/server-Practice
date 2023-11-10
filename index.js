import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase
initializeApp({
  credential: applicationDefault(),
  projectId: "potion-for-creators",
});

// Send notification endpoint
app.post("/send", (req, res) => {
  const receivedToken = req.body.fcmToken;

  const message = {
    notification: {
      title: "Muhammad Mutahir",
      body: "This is a Test Notification",
    },
    token: receivedToken,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400).send(error);
      console.log("Error sending message:", error);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
