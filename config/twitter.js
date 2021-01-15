const twit = require('twit');
const config = require('./apiKey');
const client = new twit(config);


client.tweetar = function (tweet) {
    client.post('statuses/update', { status: tweet }, function(err, data, response) {
        console.log(data)
      })

}

module.exports = client;