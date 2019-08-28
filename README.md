
# Burninator

## Description

A serverless application for burninating your resources

## Requirements

## Optional

## Build, Test, Deploy

- Run `npm run build` to build the project. This will create the `.aws-sam` directory.

- Tests can be run via `npm run test -- --cover`.

To deploy, change in to the `.aws-sam/build` directory and run the following script with the appropriate values substituted.

```bash
ARTIFACT_BUCKET=

npm run build && \
    sam package --template-file template.yaml --s3-bucket $ARTIFACT_BUCKET \
        --output-template-file packaged.yaml && \
sam deploy --template-file packaged.yaml --stack-name burninator --capabilities CAPABILITY_IAM
```
