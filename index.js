
const Alexa = require('alexa-sdk');
var trainTime = require('./query-train.js');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        this.emit('TrainTime');
    },
    'TrainTimeIntent': function () {
        this.emit('TrainTime');
    },
    'TrainTime': function () {
        console.log("Serving train time request");
        var thisHandler = this;
        trainTime(function(response) {
          thisHandler.emit(':tell', response);
        });
    },
    'AMAZON.HelpIntent': function () {
	     var speechOutput = "";
        speechOutput += "Here are some things you can say: ";
        speechOutput += "My train status";
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Cancelled");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "Stopped");
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', "Goodbye");
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

