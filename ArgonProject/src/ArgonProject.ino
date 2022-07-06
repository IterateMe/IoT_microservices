/*
 * Project Argon_project
 * Description: APP5_S6
 * Author:galv2801 - marf2910
 * Date:
 */

//#include "BadgeBeacon.h"
#include "../lib/BeaconScanner/src/BeaconScanner.h"
#include <map>

SYSTEM_THREAD(ENABLED);
//SYSTEM_MODE(SEMI_AUTOMATIC);

int led = D7;
std::map<String, String> players;   // mac - uuid
std::map<String, bool> presence; // uuid - presence
std::map<String, String>::iterator itPlayers; // iterator
std::map<String, bool>::iterator itPresence; // iterator
bool ledIsON = 0;


void onCallBack(Beacon& beacon, callback_type type){
  Serial.println("\n\nEntering Callback");
  String addr = beacon.getAddress().toString();
  bool inside = (type==NEW) ? true : false;
  String jsonString;
  for(iBeaconScan beacon: Scanner.getiBeacons()){
    if(beacon.getAddress().toString() == addr){
      String uuid = beacon.getUuid();
      if(inside){
        players[addr] = uuid;
      }else{
        players.erase(addr);
      }
      presence[uuid] = inside;
      jsonString = "{\"uuid\":\"" + uuid + 
        "\",\"inside\":\"" + inside + 
        "\",\"time\":\"" + Time.timeStr().c_str() +
        "\"}";
      break;
    }
  }
  Particle.publish(Particle.deviceID().c_str(), jsonString.c_str());
  Serial.println("PUBLISHED");
  for(itPresence = presence.begin(); itPresence != presence.end(); itPresence++){
    String uuid = itPresence->first;
    String pres =  itPresence->second ? "PRESENT":"ABSENT";
    Serial.printf("%s is %s :: %s\n", uuid.c_str(), pres.c_str(), Time.timeStr().c_str());
  }
}

int switchLED(String arg){
  ledIsON = !ledIsON;
  digitalWrite(led, ledIsON);
  return 0;
}

void setupBadge(){
  BLE.on();
  Scanner.setScanPeriod(5);
  Scanner.setMissedCount(1);
  Scanner.setCallback(onCallBack);
  Scanner.startContinuous(SCAN_IBEACON);
}

void executeBadge(){
  Scanner.loop();
}

void setup() {
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  Serial.begin(9600);
	waitFor(Serial.isConnected, 30000);
  setupBadge();
  Particle.connect();
  Particle.function("switchLed", switchLED);
  Particle.variable("LedStatus", ledIsON);
  Serial.println("Start scanning");
}

void loop() {
  executeBadge();
}