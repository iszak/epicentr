var epicData = {};

// MOVEMENT
if (!window.DeviceMotionEvent) {
    document.getElementById("support").innerHTML = "Not supported."
}

var deviceMotion = function(eventData) {
    var movement = {},
        acceleration = eventData.acceleration;

    if (acceleration.x == null) {
        movement = randomDeviceMotion();
    } else {
        movement.x = Math.round(acceleration.x);
        movement.y = Math.round(acceleration.y);
        movement.z = Math.round(acceleration.z);
        movement.interval = eventData.interval;
    }

    renderDeviceMotion(movement);

    epicData.movement = movement;
};

function renderDeviceMotion(movement) {
    document.getElementById("x").innerHTML = movement.x;
    document.getElementById("y").innerHTML = movement.y;
    document.getElementById("z").innerHTML = movement.z;
    document.getElementById("interval").innerHTML = movement.interval;
}

function randomDeviceMotion() {
    return {
        x: Math.round(Math.random() * 10 - 5),
        y: Math.round(Math.random() * 10 - 5),
        z: Math.round(Math.random() * 10 - 5),
        interval: 1
    };
}


// GEOLOCATION
var watchLocation = function() {
    var location = {};

    if ( !navigator.geolocation ) {
        support.innerHTML = "Sorry, Geolocation is not supported"
        return;
    };

    function success(position) {
        location.latitude = position.coords.latitude;
        location.longitude = position.coords.longitude;

        epicData.location = location;
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    };

    navigator.geolocation.watchPosition(success, error);
};


// POST DATA TIMER
setInterval(function() {
    postData(epicData);
}, 50);


// SOCKET IO
var socket = io.connect(window.location.host);

socket.on('connect', function() {
    window.addEventListener('devicemotion', deviceMotion);
    watchLocation();
});

var postData = function(epicData) {
    socket.emit('movement', {data: epicData});
};

socket.on('disaster', function (data) {
    console.log(data);
});


window.navigator.vibrate(2000000);

