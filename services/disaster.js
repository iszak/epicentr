var pool = {};

/**
 * @param {Object} pool
 * @param {Object} event
 */
function add(event) {
  var timestamp = now();

  if (!pool[timestamp]) {
    pool[timestamp] = [];
  }

  pool[timestamp].push(event);
}

/**
 * @param {Object} pool
 */
function prune() {
  var timestamp = now();

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
