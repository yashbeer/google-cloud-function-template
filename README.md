# Google Cloud Function Template #

If you are looking for a boilerplate code for [Google Cloud Function](https://cloud.google.com/functions/) then you can use this repository.

### What can this repository do? ###

* Get you started quickly with `Google Cloud Functions`
* Has provision for a basic middleware (like cors and auth)
* Uses `@google-cloud/functions-framework` for rapid local development
* Includes deployment script `deploy_to_cloud.sh`

### How to set up on local? ###

* Clone this project
* Rename and go inside
* On your terminal, run this command: `npm install`
* Then run this command: `npm run dev`
* That's all! It should be running at `http://localhost:8081/`

### How to deploy? ###

* Setup in your terminal, [Gcloud SDK](https://cloud.google.com/sdk/docs/quickstart)
* Edit file `deploy_to_cloud.sh`
* Replace `nameofyourproject` with the actual *name-of-your-project*, for example: `image_resizer`
* On your terminal, Run `./deploy_to_cloud.sh`
* Wait for a couple of minutes, the project should be deployed on Google cloud functions
* Check whether it's running properly at the [console](https://cloud.google.com/functions/)

### Contribution guidelines ###

* Kindly help me write some `tests`
* Any suggestions are welcome!

### Best way to reach me? ###

* [LinkedIN](https://www.linkedin.com/in/yashbeera/)