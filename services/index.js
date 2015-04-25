var haversine = require('haversine');
var earthquake = require('./earthquake');

var locations = [
  {
    name: 'Moscow',
    latitude: 55.75,
    longitude: 37.616667
  },
  {
    name: 'London',
    latitude: 51.507222,
    longitude: -0.1275
  },
  {
    name: 'New York',
    latitude: 43,
    longitude: -75
  }
];


var pool = {};
var poolSize = 0;

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
  var closestDistance = null;
  locations.forEach(function(location) {
    var locationDistance = haversine(location, userLocation);

    if (closestDistance == null ||
        locationDistance < closestDistance) {
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
  var locationPool = getPool(event.location);

  if (!locationPool) {
    return;
  }

  poolSize += 1;
  locationPool.push(event);
}

/**
 * @param {Object} pool
 */
function prune() {
  var currentTimestamp = now();

  console.log('Deleting start', poolSize);
  Object.keys(pool).forEach(function(location) {
    Object.keys(pool[location]).forEach(function(timestamp) {
      if (timestamp < currentTimestamp - 1) {
        poolSize -= pool[location][timestamp].length;
        delete pool[location][timestamp];
      }
    });
  });
  console.log('Deleting end', poolSize);
}

/**
 * @return {Number}
 */
function now() {
  return Math.floor(Date.now() / 100);
}

function getPool(location)
{
  var timestamp = now();
  var location = closest(
    location.latitude,
    location.longitude
  );

  if (!pool[location.name]) {
    pool[location.name] = [];
  }

  if (!pool[location.name][timestamp]) {
    pool[location.name][timestamp] = [];
  }

  console.log('Location pool:', location.name, timestamp);

  return pool[location.name][now()];
}

/**
 * @param  {Object} pool
 * @param  {Function} disaster
 * @return {Boolean}
 */
function calculate(location) {
  var locationPool = getPool(location);

  console.log('Calculate ', earthquake(locationPool));
  if (earthquake(locationPool)) {
    return closest(location.latitude, location.longitude);
  } else {
    return null;
  }
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
