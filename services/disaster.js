/**
 * @param {Object} pool
 * @param {Number} timestamp
 * @param {Object} event
 */
function add(pool, timestamp, event) {
  if (!pool[timestamp]) {
    pool[timestamp] = [];
  }

  pool[timestamp].push(event);
}

/**
 * @param {Object} pool
 * @param {Number} timestamp
 */
function prune(pool, timestamp) {
  Object.keys(pool).forEach(function(key){
    if (key < timestamp - 1) {
      delete pool[key];
    }
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
function calculate(pool, disaster) {
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

var pools = {};

add(pools, now(), random());
add(pools, now(), random());
add(pools, now(), random());
add(pools, now(), random());

var earthquake = require('./earthquake');

if (calculate(pools, earthquake)) {
  console.log('Earth quake');
} else {
  console.log('Nothing');
}
