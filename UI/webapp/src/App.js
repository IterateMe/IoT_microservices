import './App.css';
import React, { useState,useEffect  } from 'react';

var list = [
  {id:1,text:"MiAmor"},
  {id:2,text:"Mucho penis"},
  {id:3,text:"godDamn u thirsty"},
  {id:4,text:"vianney viellis et ca m'inquiete"},
  {id:5,text:"#retirement soon"},
  {id:6,text:"im just joking bro"}
]

function buttonOnClick(){
  fetch('http://localhost:4000/changeLED')
  .then(response=>console.log(response.json())) 
}

async function getAllEvents(){
  //Call the Archive to get all the events, wait for the json processing to finish
  const response =  await fetch('http://localhost:4000/getEvent')
  return response.json()
   
}


function App() {
  const [ble_events,setBle_events]= useState("Press the updateButton for events")
  
  //Triggered when the page is loaded
  useEffect(() => {
    updateButtonClick()
    return () => {};
  },);

  async function  updateButtonClick(){
    var data = await getAllEvents()
    setBle_events(data.events)
  }

  return (
    <div className="App">
      <button  onClick={buttonOnClick}> Change Led Status</button>
      <button  onClick={updateButtonClick}> updateButton</button>
      <br></br>
      <span className='EventList'> 
        {ble_events}</span>
    </div>
  );
}

export default App;
