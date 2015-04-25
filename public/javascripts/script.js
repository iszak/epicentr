
// ORIENTATION

if (window.DeviceMotionEvent) {
    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('devicemotion', function(eventData) {
        var info, xyz = '[X, Y, Z]';

        console.log(eventData);

        var acceleration = eventData.acceleration;
        info = xyz.replace("X", Math.round(acceleration.x));
        info = info.replace("Y", Math.round(acceleration.y));
        info = info.replace("Z", Math.round(acceleration.z));
        document.getElementById("alpha").innerHTML = info;

        console.log(info);

        var rotation = eventData.rotationRate;
        info = xyz.replace('X', Math.round(rotation.alpha));
        info = info.replace('Y', Math.round(rotation.beta));
        info = info.replace('Z', Math.round(rotation.gamma));
        document.getElementById("beta").innerHTML = info;

        console.log(info);

        info = eventData.interval;
        document.getElementById("gamma").innerHTML = info;

        console.log(info);
    }, false);
} else {
    document.getElementById("support").innerHTML = "Not supported."
}



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
