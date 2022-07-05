const express = require('express')
const app = express()

app.get("/getEvent",(request,response)=>{
    console.log("Responded to getEvent")
    response.json({message: "Oy"})
})

app.listen(4000)