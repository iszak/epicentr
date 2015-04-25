
// ORIENTATION
if (!window.DeviceMotionEvent) {
    document.getElementById("support").innerHTML = "Not supported."
}

var deviceMotion = function(eventData) {
    var movement = []
        acceleration = eventData.acceleration;

    movement.x = Math.round(acceleration.x);
    movement.y = Math.round(acceleration.y);
    movement.z = Math.round(acceleration.z);
    movement.interval = eventData.interval;

    document.getElementById("x").innerHTML = movement.x;
    document.getElementById("y").innerHTML = movement.y;
    document.getElementById("z").innerHTML = movement.z;
    document.getElementById("interval").innerHTML = movement.interval;

    console.log(movement);

    postData(movement);
};


// SOCKET IO

var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
    window.addEventListener('devicemotion', deviceMotion);
});

var postData = function(movement, interval) {
    socket.emit('movement', {movement: movement});
};

socket.on('disaster', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});


// GEOLOCATION

function geoFindMe() {
    //
    // Save elements on the DOM to output
    var output = document.getElementById("geolocation-output");
    var support = document.getElementById("geolocation-support");

    // Checking if geoloaction is supported and outputting message if it is not
    if ( !navigator.geolocation ) {
        support.innerHTML = "Sorry, Geolocation is not supported"
        return;
    };

    // On success, pass in position
    function success( position ) {
        //
        // Save position coordiates
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        //
        // Output string with geolocation position
        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
        //
        // Create img object
        var img = new Image();
        //
        // Concat string from googlemaps with location
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        //
        // Append img to DOM
        output.appendChild(img);
    };

    // On error
    function error() {
        //
        // Output error message to DOM
        output.innerHTML = "Unable to retrieve your location";
    };

    // Output message to DOM while loading
    output.innerHTML = "<p>Locating…</p>";

    // Call geolocation function
    navigator.geolocation.getCurrentPosition(success, error);
}


window.navigator.vibrate(2000000);

