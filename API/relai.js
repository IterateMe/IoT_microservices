const https = require('https');
const mqtt = require("mqtt")
var client = mqtt.connect('mqtt://broker.hivemq.com')
const Mqtttopic= 'TestFrankMqtt123'


const options = {
    hostname: 'api.particle.io',
    port: 443,
    path: '/v1/devices/events?access_token=62844ff30266e83e6dbb08d61b2ad3760a128973',
    method: 'GET',
  };
  
  const req = https.request(options, res => {
    console.log(statusCode= `${res.statusCode}`);
    var str = "{"
    res.on('data', d => {
        if(d.byteLength != 1){
         str+=d
         client.publish(Mqtttopic,str)
         console.log("Data Sent")
        }
    });
  });
  
  req.on('error', error => {
    console.error(error);
  });
  
  req.end();

