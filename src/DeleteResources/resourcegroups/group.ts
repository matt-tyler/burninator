import Client from "aws-sdk/clients/resourcegroups";
import { SplitArn, Call } from "../lib";

const re = new RegExp(/^group\/(?<GroupName>.+)/);

export default async function DeleteResourceGroup (arn: string) {
    const { resource }  = SplitArn(arn);
    const [ _, GroupName ] = re.exec(resource);

    const rg = new Client();

    if (IsGroupEmpty(rg, GroupName)) {
        await Call(() => rg.deleteGroup({ GroupName }))
    }
}

async function IsGroupEmpty(rg: Client, name: string) {
    const { ResourceIdentifiers: resources, NextToken } =
        await Call(() => rg.listGroupResources({ GroupName: name, MaxResults: 1}));
    return resources.length == 0 && !NextToken;
}