var noble = require('./index');

var friendlyMac = ['19b10010e8f2537e4f6cd104768a1214'];
var allowDuplicates = false;


//noble.startScanning(friendlyMac, allowDuplicates);

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(friendlyMac, allowDuplicates);
  } else {
    noble.stopScanning();
  }
});
/*
noble.on('discover', function(peripheral) {
  console.log('peripheral discovered (' + peripheral.id +
              ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
              ' connectable ' + peripheral.connectable + ',' +
              ' RSSI ' + peripheral.rssi + ':');
  console.log('\thello my local name is:');
  console.log('\t\t' + peripheral.advertisement.localName);
  console.log('\tcan I interest you in any of the following advertised services:');
  console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    console.log('\there is my service data:');
    for (var i in serviceData) {
      console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
    }
  }
  if (peripheral.advertisement.manufacturerData) {
    console.log('\there is my manufacturer data:');
    console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
  }
  if (peripheral.advertisement.txPowerLevel !== undefined) {
    console.log('\tmy TX power level is:');
    console.log('\t\t' + peripheral.advertisement.txPowerLevel);
  }

  console.log();
    
});
*/
/*--------------------------------------------------------------------------------------------
noble.on('discover', function(peripheral) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
    peripheral.discoverServices(null, function(error, services) {
      console.log('discovered the following services:');
      for (var i in services) {
        console.log('  ' + i + ' uuid: ' + services[i].uuid);
      }
    });
  });
});
------------------------------------------------*/

/*-----------------------------------------------------
noble.on('discover', function(peripheral) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
    peripheral.discoverServices(['19b10010e8f2537e4f6cd104768a1214'], function(error, services) {
      var deviceInformationService = services[0];
      console.log('discovered device information service');

      deviceInformationService.discoverCharacteristics(null, function(error, characteristics) {
        console.log('discovered the following characteristics:');
        for (var i in characteristics) {
          console.log('  ' + i + ' uuid: ' + characteristics[i].uuid);
        }
      });
    });
  });
});
----------------------------------------------------*/

noble.on('discover', function(peripheral) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
    peripheral.discoverServices(['19b10010e8f2537e4f6cd104768a1214'], function(error, services) {
      var immediateAlertService = services[0];
      console.log('discovered Immediate Alert service');

      immediateAlertService.discoverCharacteristics(['19b10011e8f2537e4f6cd104768a1214'], function(error, characteristics) {
        var alertLevelCharacteristic = characteristics[0];
        console.log('discovered Alert Level characteristic');

        // true if for write without response
        alertLevelCharacteristic.write(new Buffer([0x01]), true, function(error) {
          console.log('set alert level to mid (1)');
        });
        
          
      });
    });
  });
});