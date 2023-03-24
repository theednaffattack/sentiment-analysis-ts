import express from "express";
import Colors from "colors.ts";
import cors from "cors";
import { internalIpV4 } from "internal-ip";

import { getSentiment } from "./nlp";

export async function configFn() {
  const originPrefix = "http://";
  const port = "4000";
  const frontendPort = "5173";
  const domain = await internalIpV4();
  const origin = originPrefix + domain + ":" + frontendPort;
  const serverOrigin = originPrefix + domain + ":" + port;
  return {
    port,
    server: serverOrigin,
    origin: origin,
  };
}

export async function server() {
  const config = await configFn();

  const app = express();

  app.use(express.json());

  app.use(cors({ origin: config.origin }));

  const appMessage = `${Colors.colors("green", "App is running!")}`;
  const frontendMessage = `Frontend access via: ${Colors.colors(
    "red",
    config.origin
  )}`;
  const backendMessage = `Server running at: ${Colors.colors(
    "red",
    config.server
  )}`;
  app.listen(config.port, () => {
    console.log(appMessage);
    console.log(frontendMessage);
    console.log(backendMessage);
  });

  app.get("/", (_req, res) => res.send("App reached."));
  app.get("/health", (_req, res) => res.send(200));
  app.post("/api/sentiment", (req, res) => {
    const data = req.body.data;
    const sentiment = getSentiment(data);

    return res.send({ sentiment });
  });
}

server()
  .then()
  .catch((err) => {
    console.error("SERVER ERROR", err);
  });
