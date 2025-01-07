#!/bin/bash

gcloud functions deploy function-name --entry-point main --source . --runtime nodejs20 --trigger-http --allow-unauthenticated --project gcp-project-name --region gcp-region
