#!/bin/bash

gcloud functions deploy nameofyourproject --entry-point main --source . --runtime nodejs10 --trigger-http --allow-unauthenticated