const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');


function run() {
    // Get input values
    const bucket = core.getInput("aws-bucket", { required: true });
    const bucketRegion = core.getInput("aws-bucket-region", { required: true});
    const distFolder = core.getInput("dist-folder", { required: true});

    // Upload files
    const s3URI = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distFolder} ${s3URI} --region ${bucketRegion}`) // uses AWS CLI that is installed on the runner machine

    // github.getOctokit() could be used to send requests to the github rest api
    // github.context provides access to some values of the github context object

    core.notice('Hello from my custom JavaScript Action')
}

run();