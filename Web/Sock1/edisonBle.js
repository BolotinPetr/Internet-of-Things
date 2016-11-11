var autoCharacteristic = '19b10011e8f2537e4f6cd104768a1214';
var manualCharacteristic = '19b10012e8f2537e4f6cd104768a1214';
var friendlyMac = ['19b10010e8f2537e4f6cd104768a1214'];
var allowDuplicates = false;
var noble = require('./index');
var myCharacteristics = [];
var mChar;


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

function sendValue(value, i){ // посылаем value в myCharacteristics[i] (0 - авто, 1 - ручной)
  var newValue = null;
  if (value === true){
      newValue = 1;
  }
  else {
    newValue = 0;
  }
    var mChar = myCharacteristics[i];
    console.log(mChar);
    mChar.write(new Buffer([newValue]), false, function(error) {
          console.log('set alert level to mid (1)');
        });
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
exports.myCharacteristics = myCharacteristics;
