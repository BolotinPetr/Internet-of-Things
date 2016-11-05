/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
The Web Sockets Node.js sample application distributed within Intel® XDK IoT Edition under the IoT with Node.js Projects project creation option showcases how to use the socket.io NodeJS module to enable real time communication between clients and the development board via a web browser to toggle the state of the onboard LED.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing/updating MRAA & UPM Library on Intel IoT Platforms with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

OR
In Intel XDK IoT Edition under the Develop Tab (for Internet of Things Embedded Application)
Develop Tab
1. Connect to board via the IoT Device Drop down (Add Manual Connection or pick device in list)
2. Press the "Settings" button
3. Click the "Update libraries on board" option

Review README.md file for in-depth information about web sockets communication

*/


var noble = require('noble');
var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
var myOnboardLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
var myAutoLed = new mraa.Gpio(6);
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
myAutoLed.dir(mraa.DIR_OUT);
var autoState = true;
var ledState = true; //Boolean to hold the state of Led

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var requestHandler = require('./requestHandler');
var connectedUsersArray = [];
var userId;

app.get('/', function(req, res) {
    //Join all arguments together and normalize the resulting path.
    res.sendFile(path.join(__dirname + '/client', 'index.html'));
});

//Allow use of files in client folder
app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

//Socket.io Event handlers
io.on('connection', function(socket) {  // все запросы обрабатываются по одной схеме, сначала вызывается функция обработки, 
                                        // а потом метод .emit, чтобы это событие отобразилось в браузере.
    requestHandler.userConnect(userId, connectedUsersArray); // включается в случае подключения нового пользователя
    io.emit('user connect', userId);    
    io.emit('connected users', connectedUsersArray);
    
    socket.on('user disconnect', function(msg) {   // его отключения
        requestHandler.userDisconnect(msg, connectedUsersArray); 
        io.emit('user disconnect', msg);
    });
    
    socket.on('chat message', function(msg) {
        requestHandler.chatMessage(msg);
        io.emit('chat message', msg);        
    });
    
    socket.on('toogle led', function(msg) {        
        ledState = requestHandler.toggleLed(msg, myOnboardLed, ledState);        
        io.emit('toogle led', msg);
    });
    
    socket.on('auto', function(msg) {
        autoState = requestHandler.auto(msg, myAutoLed, autoState);
        io.emit('auto', msg);        
    });   
});

http.listen(3000, function(){
    console.log('Web server Active listening on *:3000');
});