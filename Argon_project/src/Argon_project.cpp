/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "c:/Users/viann/Desktop/UdeS/S6/APP_5/IoT_microservices/Argon_project/src/Argon_project.ino"
/*
 * Project Argon_project
 * Description: APP5_S6
 * Author:galv2801 - marf2910
 * Date:
 */

//#include "BadgeBeacon.h"
#include "../lib/BeaconScanner/src/BeaconScanner.h"
#include <map>

void onCallBack(Beacon& beacon, callback_type type);
void setupBadge();
void executeBadge();
void setup();
void loop();
#line 12 "c:/Users/viann/Desktop/UdeS/S6/APP_5/IoT_microservices/Argon_project/src/Argon_project.ino"
SYSTEM_THREAD(ENABLED);
//SYSTEM_MODE(SEMI_AUTOMATIC);

//Vector<String> inside;
std::map<String, String> players;   // mac - uuid
std::map<String, bool> presence; // uuid - presence
std::map<String, String>::iterator itPlayers; // iterator
std::map<String, bool>::iterator itPresence; // iterator

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
  Serial.begin(9600);
	waitFor(Serial.isConnected, 30000);
  setupBadge();
  waitFor(WiFi.ready, 30000);
  Particle.connect();
  Serial.println("Start scanning");
}

void loop() {
  executeBadge();
}