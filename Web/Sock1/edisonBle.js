var autoCharacteristic = ['19b10011e8f2537e4f6cd104768a1214'];
var manualCharacteristic = ['19b10012e8f2537e4f6cd104768a1214'];
var friendlyMac = ['19b10010e8f2537e4f6cd104768a1214'];
var allowDuplicates = false;
var noble = require('./index');
var myCharacteristics = [];


function connectToDevice(peripheral) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);

    peripheral.discoverServices(['19b10010e8f2537e4f6cd104768a1214'], function(error, services) {
      var myServices = services[0];
      console.log('discovered proper service');

      myServices.discoverCharacteristics([autoCharacteristic, manualCharacteristic], function(error, characteristics) {
        myCharacteristics[0] = characteristics[0];
        myCharacteristics[1] = characteristics[1];
        console.log('discovered proper characteristics');
      });
    });
  });
}

function sendValue(i){ // посылаем value в myCharacteristics[i] (0 - авто, 1 - ручной)
  if (value === true){
 -    newValue = 0x01;
 -}
 -else {
 -  newValue = 0x00;
 -};
 - myCharacteristic[i].write(new Buffer([newValue]), true, function(error) {
 -  console.log('Sent value to device');
 -});
}

function setupBle(){
    noble.on('stateChange', function(state) {
      if (state === 'poweredOn') {
        noble.startScanning(friendlyMac, allowDuplicates);
      } else {
        noble.stopScanning();
      }
    });

    noble.on('discover', function(peripheral){
        connectToDevice(peripheral);
    });
}


exports.sendValue = sendValue;
exports.setupBle = setupBle;
