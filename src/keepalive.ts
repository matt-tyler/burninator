import { config } from "aws-sdk";
import https from "https";

config.update({
    httpOptions: {
        agent: new https.Agent({
            keepAlive: true,
        })
    }
});