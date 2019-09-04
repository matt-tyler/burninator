import { Handler } from "aws-lambda";
import { ResourceGroups } from "aws-sdk";
import { GroupIdentifier } from "aws-sdk/clients/resourcegroups";
import "../keepalive";

interface Event {
    Items?: {
        Values: GroupIdentifier[];
        Count: number;
    };
    Iterator?: {
        Continue: boolean;
        Token?: string;
    };
}

export const handler: Handler<Event, Event> = async ({ Iterator }) => {
    const NextToken = Iterator ? Iterator.Token : undefined;
    const { GroupIdentifiers, NextToken: Token } = await new ResourceGroups().listGroups({ NextToken }).promise();
    return {
        Items: {
            Values: GroupIdentifiers,
            Count: GroupIdentifiers.length
        },
        Iterator: {
            Continue: !!Token,
            Token
        }
    }
};
