function createTracking() {
  const min = 100000000000000; // Smallest 12-digit number
  const max = 999999999999999; // Largest 12-digit number

  const trackingNo = Math.floor(Math.random() * (max - min + 1)) + min;

  return trackingNo;
}

module.exports = { createTracking };
