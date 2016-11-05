

function userConnect(userId, connectedUsersArray) {
    console.log("\n Add new User: u"+connectedUsersArray.length);
    if(connectedUsersArray.length > 0) {
        var element = connectedUsersArray[connectedUsersArray.length-1];
        userId = 'u' + (parseInt(element.replace("u", ""))+1);
    }
    else {
        userId = "u0";
    }
    console.log('a user connected: '+userId);
    connectedUsersArray.push(userId);
    console.log('Number of Users Connected ' + connectedUsersArray.length);
    console.log('User(s) Connected: ' + connectedUsersArray);
}

function userDisconnect(msg, connectedUsersArray) {
    console.log('remove: ' +msg)
    connectedUsersArray.splice(connectedUsersArray.lastIndexOf(msg), 1);    
}

function chatMessage(msg) {    
    console.log('message: ' + msg.value);
}

function toggleLed(msg, myOnboardLed, ledState) {
    myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
    msg.value = ledState;        
    ledState = !ledState; //invert the ledState     
    return ledState
}

function auto(msg, myAutoLed, autoState) {
    myAutoLed.write(autoState?1:0);
    msg.value = autoState;
    autoState = !autoState;
    return autoState
}  

exports.userConnect = userConnect;
exports.userDisconnect = userDisconnect;
exports.chatMessage = chatMessage;
exports.toggleLed = toggleLed;
exports.auto = auto;


