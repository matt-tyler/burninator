import { Handler } from "aws-lambda";
import Client, { GroupIdentifier } from "aws-sdk/clients/resourcegroups";
import { TimeToDie } from "./lib";
import "../keepalive";

export const handler: Handler<GroupIdentifier, boolean> = async ({ GroupArn }) => {
    const client = new Client();
    return !await TimeToDie(client, GroupArn)
};
