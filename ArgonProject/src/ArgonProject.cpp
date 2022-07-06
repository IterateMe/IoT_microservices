/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "c:/Users/François/Documents/GitRepo/IoT_microservices/ArgonProject/src/ArgonProject.ino"
/*
 * Project ArgonProject
 * Description:
 * Author:
 * Date:
 */
void setup();
void loop();
#line 7 "c:/Users/François/Documents/GitRepo/IoT_microservices/ArgonProject/src/ArgonProject.ino"
int test = 1;
String message = "Hello";

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  Serial.begin(9600);
	waitFor(Serial.isConnected, 30000);	
  Serial.print("Setup Over");
  if(Particle.variable("test",&test,INT)==false){
    Serial.print(" test Not published");
  };
  if(Particle.variable("message",message)==false){
    Serial.print(" message Not published");
  };
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  // The core of your code will likely live here.
  delay(5000);
  test =rand();
  Serial.print(message);
  message = "Updated";
  Particle.publish("Updated test and message variable variable",message);
  
  
  //bool success =false;
  // if(Particle.connected()){
  //   success = Particle.publish(String(test));
  //   Serial.printf("Finished publish %i, %i",test,success);
  // }
    

}