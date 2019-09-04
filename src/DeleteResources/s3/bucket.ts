import S3 from "aws-sdk/clients/s3";
import { SplitArn, Call } from "../lib";

async function* ListObjects(s3: S3, bucket: string) {
    let moreObjects;
    do {
        const { Contents, ContinuationToken } = await s3
            .listObjectsV2({
                Bucket: bucket,
                ContinuationToken: moreObjects
            })
            .promise();

        yield Contents.map(c => c.Key);

        moreObjects = ContinuationToken;
    } while (moreObjects);
}

export default async function Delete(arn: string) {
    const s3 = new S3();
    const { resource: Bucket } = SplitArn(arn);
    for await (const objects of ListObjects(s3, Bucket)) {
        await Call(() => s3
            .deleteObjects({
                Bucket,
                Delete: {
                    Objects: objects.map(Key => ({ Key })),
                    Quiet: true
                }
            }))
    }

    await Call(() => s3.deleteBucket({ Bucket }))
}
