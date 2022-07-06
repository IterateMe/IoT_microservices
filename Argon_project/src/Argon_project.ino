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

//Vector<String> inside;
std::map<String, bool> players;
std::map<String, bool>::iterator it; 

void parseIBeacons(Vector<iBeaconScan>& iBeacons);

void onCallBack(Beacon& beacon, callback_type type){
  Serial.println("Entering Callback");
  parseIBeacons(Scanner.getiBeacons());
  for(it = players.begin(); it != players.end(); it++){
    const char* data = it->first;
    Serial.printf("DATA: %s \n", data);
  }
}

void setupBadge(){
  BLE.on();
  Scanner.setScanPeriod(5);
  Scanner.setMissedCount(3);
  Scanner.setCallback(onCallBack);
  Scanner.startContinuous(SCAN_IBEACON);
}

void parseIBeacons(Vector<iBeaconScan>& iBeacons){
  for(iBeaconScan beacon: iBeacons){
    String addr = beacon.getAddress().toString();
    const char* uuid = beacon.getUuid();
    //uint8_t rssi = beacon.getRssi();
    players[addr] = true; 
    //Serial.printf("Addr: %s :: uuid: %s :: MAP LENGTH: %d \n", addr.c_str(), uuid, (int) players.size());
  }
}

void executeBadge(){
  Serial.println("Loop");
  int timeoutMs = 1000;
  Scanner.loop();
  waitFor([](){return false;}, timeoutMs);
}



void setup() {
  Serial.begin(9600);
	waitFor(Serial.isConnected, 30000);
  setupBadge();
  Serial.println("Start scanning");
}

void loop() {
  
  executeBadge();
}