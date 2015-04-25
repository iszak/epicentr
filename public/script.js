if (window.DeviceMotionEvent) {
    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('devicemotion', function(eventData) {
        var info, xyz = '[X, Y, Z]';

        console.log(eventData);

        var acceleration = eventData.acceleration;
        info = xyz.replace("X", acceleration.x);
        info = info.replace("Y", acceleration.y);
        info = info.replace("Z", acceleration.z);
        document.getElementById("alpha").innerHTML = info;

        console.log(info);

        var rotation = eventData.rotationRate;
        info = xyz.replace('X', rotation.alpha);
        info = info.replace('Y', rotation.beta);
        info = info.replace('Z', rotation.gamma);
        document.getElementById("beta").innerHTML = info;

        console.log(info);

        info = eventData.interval;
        document.getElementById("gamma").innerHTML = info;

        console.log(info);
    }, false);
} else {
    document.getElementById("support").innerHTML = "Not supported."
}