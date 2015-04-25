var haversine = require('haversine');

var locations = [
  {
    latitude: 51.507222,
    longitude: -0.1275,
    name: 'London'
  }
];


var pool = {};

/**
 * @param  {Number} latitude
 * @param  {Number} longitude
 * @return {String|Null}
 */
function closest(latitude, longitude) {
  var userLocation = {
    latitude: latitude,
    longitude: longitude
  };

  var closestLocation = null;
  var closestDistance = 0;
  locations.forEach(function(location) {
    var locationDistance = haversine(location, userLocation);

    if (locationDistance < closestDistance) {
      closestDistance = locationDistance;
      closestLocation = location;
    }
  });

  return closestLocation;
}

/**
 * @param {Object} pool
 * @param {Object} event
 */
function add(event) {
  var timestamp = now();
  var location  = closest();

  // TODO: Add logging
  if (location == null) {
    return;
  }

  if (!pool[location.name][timestamp]) {
    pool[location.name][timestamp] = [];
  }

  pool[location.name][timestamp].push(event);
}

/**
 * @param {Object} pool
 */
function prune() {
  var now = now();

  Object.keys(pool).forEach(function(location) {
    Object.keys(location).forEach(function(timestamp){
      if (timestamp < now - 1) {
        delete pool[location][timestamp];
      }
    });
  });
}

/**
 * @return {Number}
 */
function now() {
  return Math.floor(Date.now() / 1000);
}

/**
 * @param  {Object} pool
 * @param  {Function} disaster
 * @return {Boolean}
 */
function calculate(disaster) {
  return disaster(pool[now()]);
}

/**
 * @return {Object}
 */
function random() {
  return {
    location: {
      latitude: null,
      longitude: null
    },
    movement: {
      x: (Math.random() * 10) - 5,
      y: (Math.random() * 10) - 5,
      z: (Math.random() * 10) - 5
    }
  }
}


module.exports = {
  add: add,
  prune: prune,
  now: now,
  calculate: calculate,
  random: random
};
