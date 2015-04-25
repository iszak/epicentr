if (window.DeviceOrientationEvent) {
    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('deviceorientation', function(eventData) {

        document.getElementById("support").innerHTML = "Supported!"

        var alpha = eventData.alpha,
            beta = eventData.beta,
            gamma = eventData.gamma;

        deviceOrientationHandler(alpha, beta, gamma);
    }, false);
} else {
    document.getElementById("support").innerHTML = "Not supported."
}

var deviceOrientationHandler = function(a, b, g) {
    document.getElementById("alpha").innerHTML = a;
    document.getElementById("beta").innerHTML = b;
    document.getElementById("gamma").innerHTML = g;
}