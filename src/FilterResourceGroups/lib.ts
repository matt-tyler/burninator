import Client from "aws-sdk/clients/resourcegroups";

export async function TimeToDie(rg: Client, arn: string) {
    const { Tags: { date } } = await rg.getTags({ Arn: arn }).promise();
    if (!date) {
        return false;
    }
    return new Date().getTime() >= (parseInt(date) || 0);
}
