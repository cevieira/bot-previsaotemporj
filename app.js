require('dotenv').config({path: __dirname + '/.env'});
var app = require("./config/server.js"); 
var cliente = require("./config/twitter.js"); 
var CronJob = require('cron').CronJob;
var axios = require('axios');

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

function buscarPrevisao(callbackFunction) {
    axios.get('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/5959/current?token=' + process.env.api_token)
        .then(res => (callbackFunction(res.data.data)));
}

app.listen(server_port, server_host, function () {
    console.log("Aplicação online.");
});

var job = new CronJob('01 * * * *', function () {
    buscarPrevisao(function (data) {
        console.log(data);
        cliente.tweetar('O Rio de Janeiro está com ' + data.temperature + '° de temperatura, com sensação de ' + data.sensation + '° e com ' + data.condition.toLowerCase() );
    });

},
    function () {
        console.log("Cron job stopped!")
    },
    true, 
    'America/Sao_Paulo' 
);
