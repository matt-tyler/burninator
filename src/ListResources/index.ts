import { Handler } from "aws-lambda";
import { ResourceGroups } from "aws-sdk";
import { ResourceIdentifier } from "aws-sdk/clients/resourcegroups";
import "../keepalive";

interface Event {
    Items?: {
        Values: ResourceIdentifier[];
        Count: number;
    };
    Iterator: {
        Params: {
            GroupName: string;
            GroupArn: string
        };
        Continue: boolean;
        Token: string;
    };
}

export const handler: Handler<Event, Event> = async ({
    Iterator: {
        Params: { GroupName, GroupArn },
        Token: NextToken
    }
}) => {
    const { ResourceIdentifiers, NextToken: Token } = await new ResourceGroups()
        .listGroupResources({ GroupName, NextToken })
        .promise();

    return {
        Items: {
            Values: ResourceIdentifiers,
            Count: ResourceIdentifiers.length
        },
        Iterator: {
            Params: { GroupName, GroupArn },
            Continue: !!Token,
            Token
        }
    };
};
