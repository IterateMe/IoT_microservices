const express = require('express')
const app = express()
const mqtt = require("mqtt")
var client = mqtt.connect('mqtt://broker.hivemq.com')

//Publisher
app.get("/getEvent",(request,response)=>{
    console.log("Responded to getEvent")
    dataSent = "Simple MQTT message :"+ Date.now().toString()
    client.publish('TestFrankMqtt123',dataSent)
    response.json({message: dataSent})
})

app.listen(4000)

//Subscriber
client.on("connect",function(){
    client.subscribe('TestFrankMqtt123')
    console.log("Connected successfully")
})

client.on('message',function(topic,message){
    console.log(topic.toString())
    console.log(message.toString())

})
