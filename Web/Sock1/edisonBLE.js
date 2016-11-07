var autoCharacteristic = ['19b10011e8f2537e4f6cd104768a1214'];
var manualCharacteristic = ['19b10012e8f2537e4f6cd104768a1214'];

function connectToDevice(peripheral, myServices, myCharacteristics) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);

    peripheral.discoverServices(['19b10010e8f2537e4f6cd104768a1214'], function(error, services) {
      myServices = services[0];
      console.log('discovered proper service');

      immediateAlertService.discoverCharacteristics([autoCharacteristic, manualCharacteristic], function(error, characteristics) {
        myCharacteristics[0] = characteristics[0];
        myCharacteristics[1] = characteristics[1];
        console.log('discovered proper characteristics');
      });
    });
  });
}
 
function sendValue(value, characteristic){ // посылаем значение в характеристику (characteristics[0] - авто, characteristics[1] - ручной)
  if (value === true){
    newValue = 0x01;
  }
  else {
    newValue = 0x00;
  };
  characteristic.write(new Buffer([newValue]), true, function(error) {
    console.log('Sent value to device');
  });
}
