# Google Cloud Function Template #

If you are looking for a boilerplate code for [Google Cloud Function](https://cloud.google.com/functions/) then you can use this repository.

### What can this repository do? ###

* Get you started quickly with `Google Cloud Functions`
* Has provision for a basic middleware (like auth and cors)
* Uses `@google-cloud/functions-framework` for local development
* Includes deployment script `deploy-to-cloud.sh`

### How to setup on local? ###

* Clone this template project
* Rename and go inside
* On your terminal, run this command: `npm install`
* Then run this command: `npm run dev`
* That's all! It should be running at `http://localhost:8081/`

### How to deploy manually using 'gcloud deploy' script? ###

* Edit file `deploy-to-cloud.sh`
* Replace `<function-name>` with *actual name of the cloud function*, for example: `image-resizer`
* Replace `<gcp-project-name>` with *actual name of the gcp project*
* Replace `<gcp-region>` with *actual name of the gcp region*
* Setup Gcloud SDK into your terminal, [Gcloud SDK](https://cloud.google.com/sdk/docs/quickstart)
* On your terminal, Run `./deploy-to-cloud.sh`
* Wait for a couple of minutes, the project should be deployed to Google cloud functions
* Check whether it's running properly at the [console](https://cloud.google.com/functions/)

### How to deploy automatically using CI/CD (bitbucket pipeline)? ###

* Edit file `deploy-to-cloud.sh`
* Replace `<function-name>` with *actual name of the cloud function*, for example: `image-resizer`
* Replace `<gcp-project-name>` with *actual name of the gcp project*
* Replace `<gcp-region>` with *actual name of the gcp region*
* Moment you commit your code to `master` branch of your repository, build pipeline will start and the Google cloud function will be deployed automatically.
* Wait for a couple of minutes, the project should be deployed to Google cloud functions
* Check whether it's running properly at the [console](https://cloud.google.com/functions/)

### Contribution guidelines ###

* Kindly suggest the improvements!

### Best way to reach me? ###

* [LinkedIN](https://www.linkedin.com/in/yashbeera/)
