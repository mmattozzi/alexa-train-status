# alexa-train-status
An Alexa skill that lets me know when my next train to work is. This is a very simple skill, on launch, it queries the 
[Septa API](http://www3.septa.org/hackathon/NextToArrive/Rosemont/Suburban%20Station/1) for my next train and tells me the time and its
status. 

## Install
Deploy using [serverless](https://serverless.com/):

    npm install
    serverless deploy
 
Follow instructions in [serverless examples](https://github.com/serverless/examples/tree/master/aws-node-alexa-skill) to create an Alexa Skill and link it to the lambda ARN created via the serverless deploy. 

## Run Locally
```
    serverless invoke local -f trainstatus -p LaunchRequest-input.json
```
