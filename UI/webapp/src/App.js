import './App.css';
import React, { useState } from 'react';

var list = [
  {id:1,text:"MiAmor"},
  {id:2,text:"Mucho penis"},
  {id:3,text:"godDamn u thirsty"},
  {id:4,text:"vianney viellis et ca m'inquiete"},
  {id:5,text:"#retirement soon"},
  {id:6,text:"im just joking bro"}
]

function buttonOnClick(){
  
  console.log("Boutton Click")
  fetch('http://localhost:4000/changeLED')
  //Implement LED change 
}

async function getAllEvents(){
  //Call the Archive to get all the events then parse then with the format data
  const response =  await fetch('http://localhost:4000/getEvent')
  return response.json()
   
}

function formatData(listOfEvents){
  var rows= []
  for (var i = 0; i < listOfEvents.length; i++) {
    rows.push({id:`${i}`,text:`${listOfEvents[i].text}`});
    //Probably need to adjust the attribute of listOfEvents to get
  }
  return rows  
}



function App() {
  const [ble_events,setBle_events]= useState("BasicState")
  
  async function  updateButtonClick(){
    var data = await getAllEvents()
    setBle_events(data.events)
  }



  return (
    <div className="App" style={{
      //backgroundImage: `url(${process.env.PUBLIC_URL + '/meme.jpg'})`,
      //backgroundRepeat: 'no-repeat'
      }}>
      
      <button  onClick={buttonOnClick}> Change Led Status</button>
      <button  onClick={updateButtonClick}> updateButton</button>
      <p>{ble_events}</p>
      {/* <ul className="EventList">
        {formatData(list).map(item=>(
          <li key={item.id}>{item.text}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
