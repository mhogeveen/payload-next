import express from "express";
import payload from "payload";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);

      if (process.env.VERCEL_DEPLOY_WEBHOOK_MAIN) {
        fetch(process.env.VERCEL_DEPLOY_WEBHOOK_MAIN);

        payload.logger.info("Vercel Deployment of 'main' branch initiated");
      }
    },
  });
  app.listen(4000);
};

start();
