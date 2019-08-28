import { ResourceIdentifier } from "aws-sdk/clients/resourcegroups";
import { SendMessageBatchRequestEntry } from "aws-sdk/clients/sqs";
import { SQS } from "aws-sdk";
import { Handler } from "aws-lambda";

interface Event {
    Items: ResourceIdentifier[];
}

const ToEntry = ({ ResourceType, ResourceArn }: ResourceIdentifier): SendMessageBatchRequestEntry => ({
    Id: ResourceArn.replace(/[/:.]/g, "_"),
    MessageBody: "0",
    MessageAttributes: {
        ResourceType: {
            DataType: "String",
            StringValue: ResourceType
        },
        ResourceArn: {
            DataType: "String",
            StringValue: ResourceArn
        }
    }
});

export const handler: Handler<Event> = async ({ Items }) => {
    return await new SQS().sendMessageBatch({
        QueueUrl: process.env.QUEUE_URL,
        Entries: Items.map(ToEntry)
    }).promise();
};
