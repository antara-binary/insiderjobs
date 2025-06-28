import * as Sentry from "@sentry/node";
import mongoose from "mongoose";

Sentry.init({
  dsn: "https://594977b1cf5f441b54a15bb7ddec9b68@o4509563545190405.ingest.us.sentry.io/4509563549581312",
  integrations: [
    new Sentry.Integrations.Mongo({ mongoose: mongoose }), // ✅ Mongoose integration
  ],
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

export default Sentry;




