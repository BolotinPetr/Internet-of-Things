#include <CurieBLE.h>
const int relayPin = 10;      // the number of the LED pin
const int PhotoPin = A0; 
const int buttonPin = 12;   
const int BUTTON =0;
const int AUTO =1;
int i=0;
int buttonState = 0;    
int a=0;
int photo = 0;
int state=0;
int statepred=2;
int light2 = 0;

BLEPeripheral blePeripheral; // create peripheral instance
BLEService lampService("19B10010-E8F2-537E-4F6C-D104768A1214"); // create service

BLECharCharacteristic stateCharacteristic("19B10011-E8F2-537E-4F6C-D104768A1214", BLERead );
BLECharCharacteristic onlineCharacteristic("19B10012-E8F2-537E-4F6C-D104768A1214", BLERead | BLENotify); 

void setup() {
   Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
   pinMode(buttonPin, INPUT);
   
 // set the local name peripheral advertises
  blePeripheral.setLocalName("lamp");
  // set the UUID for the service this peripheral advertises:
  blePeripheral.setAdvertisedServiceUuid(lampService.uuid());

  // add service and characteristics
  blePeripheral.addAttribute(lampService);
  blePeripheral.addAttribute(stateCharacteristic);
  blePeripheral.addAttribute(onlineCharacteristic);

  //stateCharacteristic.setValue(0);
 // onlineCharacteristic.setValue(0);

  // advertise the service
  blePeripheral.begin();

Serial.println("Bluetooth device active, waiting for connections...");
}

void loop() {
  // poll peripheral
  blePeripheral.poll();
  state=stateCharacteristic.value();
  if((state == 1) && (statepred !=state ))
              {
                 
                 i=BUTTON;
              }
   if((state == 0) && (statepred !=state))
              {
                 
                 i=AUTO;
              }
  Serial.println(i);
  switch (i) {
    
  
    case BUTTON:   
          buttonState = digitalRead(buttonPin);
          
                 a=onlineCharacteristic.value();
                 
            if((light2 == 1) && (buttonState == 0))
              {
                   a = (a + 1) % 2;    
                  
              }
       
          light2 = buttonState;
          delay(200);
      break;
      
    case AUTO:   
     
      buttonState = digitalRead(buttonPin);
      photo = analogRead(PhotoPin);
       if (a==0)
             {
                 if (photo>850)
                        {a=1;}
              }
        else
              {
                  if (photo<200)
              
                   {a=0;}
                }

             
            if((light2 == 1) && (buttonState == 0))
              {
                 i=BUTTON;
                  break;
              }
            light2 = buttonState;
            delay(200);
      break;
      
  
  }
   statepred=state;
  digitalWrite(relayPin, a);
 
  
}
