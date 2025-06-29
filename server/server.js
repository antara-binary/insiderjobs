import Sentry from './config/instrument.js'; // ✅ Add this first
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db1.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import bodyParser from 'body-parser'; // ✅ added
// Trigger Vercel redeploy on June 29



const app = express();

await connectDB();

app.use(Sentry.Handlers.requestHandler()); // ✅ Add this line
app.use(Sentry.Handlers.tracingHandler()); // ✅ Optional performance tracking

app.use(cors());

// ✅ Webhook route MUST come before express.json()
app.post(
  '/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  clerkWebhooks
);

app.use(express.json());

app.get('/', (req, res) => res.send("API working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler()); // ✅ Automatically capture errors

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
