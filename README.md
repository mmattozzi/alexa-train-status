# alexa-train-status
An Alexa skill that lets me know when my next train to work is. This is a very simple skill, on launch, it queries the 
[Septa API](http://www3.septa.org/hackathon/NextToArrive/Rosemont/Suburban%20Station/1) for my next train and tells me the time and its
status. 

## Install
    npm install
    zip -r train-status.zip index.js node_modules query-train.js
 
 Upload the resulting zip file as an AWS Lambda function. Follow the instructions in 
 [skill-sample-nodejs-fact](https://github.com/alexa/skill-sample-nodejs-fact) to create a skill in the Amazon developer portal
 and link it to an AWS Lambda function. 
 
