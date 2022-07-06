const https = require('https');
const mqtt = require("mqtt");
const { stringify } = require('querystring');

var client = mqtt.connect('mqtt://broker.hivemq.com')
const MqttTopic= 'TestFrankMqtt123'


const options = {
    hostname: 'api.particle.io',
    port: 443,
    path: '/v1/devices/events?access_token=62844ff30266e83e6dbb08d61b2ad3760a128973',
    method: 'GET',
  };
  
  const req = https.request(options, res => {
    
    res.on('data', d => {
        if(d.byteLength > 1){
          var str = ""
          str+=d
          str = str.replace('\n',"")
          
          client.publish(MqttTopic,parseParticleEvent(str))
          
        }
    });
  });
  
  req.on('error', error => {
    console.error(error);
  });
  
  req.end();

function parseParticleEvent(text){
  if(text.includes("ok") || !text.includes("BadgeEvent"))
    return ""
  var positionData = text.search("data");
  var positionttl = text.search("ttl");
  var positionTime = text.search("published_at");
  var postiionCoreId = text.search("coreid");
  var data = text.substring(positionData+15,positionttl-3);
  var time = Date(text.substring(positionTime+15,postiionCoreId-3))
  console.log(data)
  console.log(time)
}