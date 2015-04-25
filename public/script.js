if (window.DeviceMotionEvent) {
    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('devicemotion', function(eventData) {
        var info, xyz = '[X, Y, Z]';

        console.log(eventData);

        var acceleration = eventData.acceleration;
        info = xyz.replace("X", acceleration.x.toFixed(2));
        info = info.replace("Y", acceleration.y.toFixed(2));
        info = info.replace("Z", acceleration.z.toFixed(2));
        document.getElementById("alpha").innerHTML = info;

        console.log(info);

        var rotation = eventData.rotationRate;
        info = xyz.replace('X', rotation.alpha.toFixed(2));
        info = info.replace('Y', rotation.beta.toFixed(2));
        info = info.replace('Z', rotation.gamma.toFixed(2));
        document.getElementById("beta").innerHTML = info;

        console.log(info);

        info = eventData.interval;
        document.getElementById("gamma").innerHTML = info;

        console.log(info);
    }, false);
} else {
    document.getElementById("support").innerHTML = "Not supported."
}