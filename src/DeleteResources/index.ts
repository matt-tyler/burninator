import { SQSHandler, SQSRecord } from "aws-lambda";
import { Delete } from "./lib";
import "../keepalive";

interface Payload {
    ResourceArn: string
    ResourceType: string
}

async function DeleteRecord (record: SQSRecord): Promise<void> {
    const { ResourceType, ResourceArn } = JSON.parse(record.body) as Payload;
    return await Delete(ResourceType, ResourceArn);
}

export const handler: SQSHandler = async (event) => {
    await Promise.all(event.Records.map(DeleteRecord));
}
