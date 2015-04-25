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
        document.querySelector('.error').innerHTML = "Unable to retrieve your location";
    };

    navigator.geolocation.watchPosition(success, error);
};


// POST DATA TIMER
setInterval(function() {
    if (!epicData.location || !epicData.movement) {
        return;
    }

    if (true) {
        deviceMotion({
            acceleration: {}
        });
    }

    epicData.time = Date.now();

    postData(epicData);
}, 100);


// GOOGLE MAP
var initMap = function(data) {
    var bounds = new google.maps.LatLngBounds();

    var mapOptions = {
      center: { lat: data.location.latitude, lng: data.location.longitude},
      zoom: 8
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    for( i = 0; i < data.data.length; i++ ) {
        // console.log(data.data[i].location.latitude);
        console.log(data);

        var position = new google.maps.LatLng(data.data[i].location.latitude, data.data[i].location.longitude);
        bounds.extend(position);

        // var SeverityColors = [
        //     colorOne: "red",
        //     colorTwo: "orange",
        //     colorThree: "yellow",
        //     colorFour: "white"
        // ]

        // var min = 20;
        // var max = 40;

        // var range = max - min; // 20
        // var section = range / 4; // 5

        // var severityOne = min + section; // 25
        // var severityTwo = min + ( section * 2 ); // 30
        // var severityThree = min + ( section * 3 ); // 35
        // var severityFour = min + ( section * 4 ); // 40

        // var markerColor;

        // if ( )

        // switch ( data.stats ) {
        //     case min > :
        //         markerColor = SeverityColors.colorOne;
        //         break;
        //     case 0:
        //         markerColor = SeverityColors.colorOne;
        //         break;
        // }



        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'marker' + data.data[i]
            // icon: 'http://maps.google.com/mapfiles/ms/icons/' + ??????????????? + '.png'
        });

        // // Allow each marker to have an info window
        // google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //     return function() {
        //         infoWindow.setContent(infoWindowContent[i][0]);
        //         infoWindow.open(map, marker);
        //     }
        // })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
};


// SOCKET IO
var socket = io.connect(window.location.host);

socket.on('connect', function() {
    window.addEventListener('devicemotion', deviceMotion);
    watchLocation();
});

var postData = function(epicData) {
    socket.emit('movement', epicData);
};

var timeout = null,
    locationName = null;

socket.on('disaster', function (data) {
    console.log(data);
    var alertElement = document.getElementById('alert');

    alertElement.classList.add('visible');

    clearTimeout(timeout);

    timeout = setTimeout(function(){
        alertElement.classList.remove('visible');
    }, 1000);

    window.navigator.vibrate(200);

    if (locationName !== data.location.name) {
        locationName = data.location.name;

        initMap(data);
    }
});



