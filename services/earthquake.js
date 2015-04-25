var maximum = 2;

var thresholds = {
  x: 0,
  y: 0,
  z: 0
};

/**
 * @param {Object} events
 */
module.exports = function(events) {
  // Won't surpass maximum
  if (events.length < maximum) {
    return false;
  }

  var count = 0;
  events.forEach(function(event) {
    console.log(event.movement, thresholds);
    if (Math.abs(event.movement.z) > thresholds.z) {
      count += 1;
    }
  });

  return count >= maximum;
};
