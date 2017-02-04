var request = require('request');

module.exports = function(callback) {
  var url = 'http://www3.septa.org/hackathon/NextToArrive/Rosemont/Suburban%20Station/1';
  request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var resp = JSON.parse(body);
          var time = resp[0]["orig_departure_time"];
          var delay = resp[0]["orig_delay"];
          if (delay !== 'On time') {
            var match = delay.match(/(\d+) min/);
            if (match) {
              callback("Your next train is at " + time + ". It is " + match[1] + " minutes late.");
            } else {
              callback("Your next train is at " + time + ". It is " + delay + " late.");
            }
          } else {
            callback("Your next train is at " + time + ". It's on time. Wow!");
          }
      } else {
        callback("Sorry, I couldn't look up your next train time.");
        console.log("Error talking to septa: " + err);
      }
  });
};