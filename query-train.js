var request = require('request');

function findDelay(orig_delay) {
    var match = orig_delay.match(/(\d+) min/);
    var delayObj = new Object();
    if (match) {
        var unit = (match[1] == "1" ? "minute" : "minutes");
        delayObj.delayStr = match[1] + " " + unit;
        delayObj.delayMins = parseInt(match[1]);
    } else {
        delayObj.delayStr = orig_delay;
    }
    return delayObj;
}

function isDelayed(orig_delay) {
    return orig_delay !== "On time";
}

module.exports = function(callback) {
    var url = 'http://www3.septa.org/hackathon/NextToArrive/Rosemont/Suburban%20Station/2';
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var resp = JSON.parse(body);
            var responseText = "";
            var time = resp[0]["orig_departure_time"];
            var orig_delay = resp[0]["orig_delay"];
            if (isDelayed(orig_delay)) {
                var delay = findDelay(orig_delay);
                if (delay.delayMins > 10) {
                    responseText += "Uh oh, the " + time + " train is running pretty late. ";
                }
                responseText += "Your next train is at " + time + ". It is " + delay.delayStr + " late. ";
            } else {
                responseText += "Your next train is at " + time + ". It's on time. Wow! ";
            }

            if (resp.length > 1) {
                var time2 = resp[1]["orig_departure_time"];
                var orig_delay2 = resp[1]["orig_delay"];
                if (isDelayed(orig_delay2)) {
                    var delay2 = findDelay(orig_delay2);
                    responseText += "The following train is at " + time2 + " and is " + delay2.delayStr + " late. ";
                } else {
                    responseText += "The following train at " + time2 + " is on time. ";
                }
            }

            callback(responseText);
        } else {
            callback("Sorry, I couldn't look up your next train time.");
            console.log("Error talking to septa: " + err);
        }
    });
};