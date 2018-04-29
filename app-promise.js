const yargs = require('yargs');
const axios = require('axios');

// getting arguments from command line..
const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'address to fetch weather for',
        string: true
    }
}).help()
    .alias('help', 'h')
    .argv;

const addressInput = encodeURIComponent(argv.address);

const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressInput}`;

axios.get(geocodeURL).then((geoResponse) => {
    if (geoResponse.data.status === 'ZERO_RESULTS' || geoResponse.data.results.length<=0) {
        throw new Error('Unable to find address...');
    }
    const latitude = geoResponse.data.results[0].geometry.location.lat;
    const longitude = geoResponse.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/c0c4d183059d38251a9194b0a9ae4ad4/${latitude},${longitude}`;
    console.log(geoResponse.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((weatherInfo) => {
    let temperature = weatherInfo.data.currently.temperature;
    let apparentTemperature = weatherInfo.data.currently.apparentTemperature;
    console.log(`its currently ${temperature}. It feels like ${apparentTemperature}.`);
})
    .catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('UNABLE TO CONECT TO API SERVER');
        }
        else {
            console.log(error.message);
        }
    });