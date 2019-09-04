import catalog from "aws-sdk/clients/servicecatalog";
import { SplitArn, Call } from "../lib";

const re = new RegExp(/^product\/(?<ProductId>.+)/);

export default async function DeleteServiceCatalogCloudFormationProduct(arn: string) {
    const { resource } = SplitArn(arn);
    const [ _, Id ] = re.exec(resource);
    await Call(() => new catalog().deleteProduct({ Id }));
}
