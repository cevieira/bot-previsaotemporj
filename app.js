var app = require("./config/server.js"); 
var cliente = require("./config/twitter.js"); 
var CronJob = require('cron').CronJob;
var axios = require('axios');

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

function buscarPrevisao(callbackFunction) {
    axios.get('https://api.hgbrasil.com/weather?woeid=90200707')
        .then(res => (callbackFunction(res.data.results.description)));
}

app.listen(server_port, server_host, function () {
    console.log("Aplicação online.");
});

var job = new CronJob('* * * * * *', function () {
    buscarPrevisao(function (data) {
        console.log(data);
        cliente.tweetar("O Rio de Janeiro está com o tempo " + data + " agora" );
    });

},
    function () {
        console.log("Cron job stopped!")
    },
    true, 
    'America/Sao_Paulo' 
);