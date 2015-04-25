
// ORIENTATION

if (window.DeviceOrientationEvent) {
    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('deviceorientation', function(eventData) {

        document.getElementById("support").innerHTML = "Device Orientation is supported!"

        var alpha = eventData.alpha,
            beta = eventData.beta,
            gamma = eventData.gamma;

        deviceOrientationHandler(alpha, beta, gamma);
    }, false);
} else {
    document.getElementById("support").innerHTML = "Device Orientation is not supported."
}

var deviceOrientationHandler = function(a, b, g) {
    document.getElementById("alpha").innerHTML = a;
    document.getElementById("beta").innerHTML = b;
    document.getElementById("gamma").innerHTML = g;
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
