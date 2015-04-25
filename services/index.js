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
 * @param {Object} data
 */
function add(data) {
  var locationPool = getPool(
    data.location.latitude,
    data.location.longitude,
    Math.floor(data.time / 1000)
  );

  if (!locationPool) {
    return;
  }

  poolSize += 1;
  locationPool.push(data);
}

function simplifyData(events) {
  var data = [];

  events.forEach(function(event){
    data.push(
      event.location
    );
  });

  return data;
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
  return Math.floor(Date.now() / 1000);
}

/**
 * @param  {Object} location
 * @param  {Number} timestamp
 * @return {Object}
 */
function getPool(latitude, longitude, timestamp)
{
  if (!timestamp) {
    return;
  }

  var location = closest(
    latitude,
    longitude
  );

  if (!pool[location.name]) {
    pool[location.name] = [];
  }

  if (!pool[location.name][timestamp]) {
    pool[location.name][timestamp] = [];
  }

  var currentPool = pool[location.name][timestamp];

  console.log('Pool:', location.name, timestamp, currentPool.length);

  return currentPool;
}

/**
 * @param  {Object} pool
 * @param  {Number} time
 * @return {Boolean}
 */
function calculate(data) {
  var locationPool = getPool(
    data.location.latitude,
    data.location.longitude,
    Math.floor(data.time / 1000)
  );

  console.log('Calculate ', earthquake(locationPool));
  if (earthquake(locationPool)) {
    var countryLocation = closest(data.latitude, data.longitude);
    var stats = calculateMinMax(countryLocation, locationPool);

    return {
      location: countryLocation,
      data: locationPool,
      stats: stats
    };
  } else {
    return null;
  }
}

function calculateMinMax(countryLocation, locationPool) {
  var min = locationPool[0],
      max = locationPool[0];

  locationPool.forEach(function(location) {
    var distance = haversine(countryLocation, location);
    if (distance < min) {
      min = distance;
    }

    if (distance > max) {
      max = distance;
    }
  });

  return {
    min: min,
    max: min
  }
}


function calculateRatio(min, max, locationPool) {
  var data = [];
  locationPool.forEach(function(location) {

  });

  return data;
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
