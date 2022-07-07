//Requirements
const express = require('express')
const cors = require('cors');
const mqtt = require("mqtt")
const fs = require('fs');
const https = require('https');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Component Creation
const app = express()
app.use(cors()) //Needed for cross origin request

const client = mqtt.connect('mqtt://broker.hivemq.com')

const token = "5c86d7f0e33b96e16d92fd552d1eb3f114322a6c"
const deviceID = "e00fce688a411bd95df605f8"


/*
ARCHIVE CODE
*/

//Subscribe de la queue
client.on("connect",function(){
    client.subscribe('TestFrankMqtt123')
    console.log("Connected successfully")
})

//Listener de la queue
client.on('message',function(topic,message){
    console.log("Data received from  MQTT queue")
    fs.appendFile('./API/Db.txt', message.toString(),  err => {
        if(err){
            console.log(err)
        }
    });

})

//Get of all event in DB
//Publisher
app.get("/getEvent",(request,response)=>{
    console.log("Responded to getEvent")
    fs.readFile('./API/Db.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          response.status(500);
          return;
        }
        
        response.status(200)
        response.json({events: data})
    });
    
})


/*
CONTROL CODE
*/
app.get("/changeLED",(request,response)=>{  
    var url = `https://api.spark.io/v1/devices/${deviceID}/switchLed`;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    var data = `access_token=${token}`;

    xhr.send(data);
})
app.listen(4000)
