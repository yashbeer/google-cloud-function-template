# Google Cloud Function Template #

If you are looking for a boilerplate code for [Google Cloud Function](https://cloud.google.com/functions/) then you can use this repository.

### What can this repository do? ###

* Get you started quickly with `Google Cloud Functions`
* Has provision for a basic middleware (like auth and cors)
* Uses `@google-cloud/functions-framework` for local development
* Includes deployment script `deploy-to-cloud.sh`

### How to set up on local? ###

* Clone this template project
* Rename and go inside
* On your terminal, run this command: `npm install`
* Then run this command: `npm run dev`
* That's all! It should be running at `http://localhost:8081/`

### How to deploy? ###

* Setup in your terminal, [Gcloud SDK](https://cloud.google.com/sdk/docs/quickstart)
* Edit file `deploy-to-cloud.sh`
* Replace `nameofyourproject` with the actual *name-of-your-project*, for example: `image_resizer`
* On your terminal, Run `./deploy-to-cloud.sh`
* Wait for a couple of minutes, the project should be deployed on Google cloud functions
* Check whether it's running properly at the [console](https://cloud.google.com/functions/)

### Contribution guidelines ###

* Kindly suggest the improvements!

### Best way to reach me? ###

* [LinkedIN](https://www.linkedin.com/in/yashbeera/)