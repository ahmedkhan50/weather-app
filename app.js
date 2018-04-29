const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather.js');

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

// method gets called after geocode API returns data...
const geocodeHandler = (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    }
    else {
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude,weatherHandler);
    }
}

// method gets called afetr weather API call...
const weatherHandler = (errorMessage, weatherResults)=>{
   if(errorMessage){
       console.log(errorMessage);
   }
   else{
       console.log(`its currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
   }
}

// passing callback function in second argument...
geocode.geocodeAddress(argv.address, geocodeHandler);
