async function getCoordinatesForAddress(address) {
  // Dummy return for broke developers who
  //dont have credit cards for using google maps api
  return {
    lat: 0.0,
    lng: 0.0,
  };
}
module.exports = getCoordinatesForAddress;
