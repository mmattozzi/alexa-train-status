var trainTime = require('./query-train.js');

module.exports.trainStatus = (event, context, callback) => {
  var response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Train status only responds to launch command with your current train times',
      },
      shouldEndSession: true
    }
  };
  
  if (event.request.type === "LaunchRequest") {
    trainTime(function(message) {
      response.response.outputSpeech.text = message + " Enjoy the ride.";
      callback(null, response);
    })
  } else {
    callback(null, response);
  }
};
