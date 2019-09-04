import { AWSError, Request } from "aws-sdk";

export async function Call<T>(fn: () => Request<T, AWSError>): Promise<T> {
    try {
        return await fn().promise();
    } catch (err) {
        if ((err as AWSError).statusCode !== 404) {
            throw err
        }
    }
}

interface Arn {
    partition: string
    service: string
    region?: string
    account?: string
    resource: string
}

const re = new RegExp(/^arn:(?<partition>aws.*):(?<service>.+):(?<region>.*):(?<account>\d{12}|):(?<resource>.*)$/);

export function SplitArn(arn: string): Arn {
    const [ _, partition, service, region, account, resource ] = re.exec(arn);
    return {
        partition,
        service,
        region,
        account,
        resource
    }
}

export const Delete = async (type: string, arn: string): Promise<void> => {
    const [ _, service, resource ] = type.split("::").map(e => e.toLocaleLowerCase());
    const mod = await import(
        /* webpackInclude: /(s3|servicecatalog|resourcegroups)/ */
        /* webpackMode: "lazy-once" */
        `./${service}/${resource}`);

    await mod.default(arn);
}
