import './App.css';

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
  //Implement LED change 
}

function getAllEvents(){
  console.log("Pls implement the getAllEventsMethod")
  //Call the MTTQ to get all the events then parse then with the format data
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
  return (
    <div className="App" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/meme.jpg'})`,
      backgroundRepeat: 'no-repeat'
      }}>
      
      <button  onClick={buttonOnClick}> Change Led Status</button>
      <ul className="EventList">
        {formatData(list).map(item=>(
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
