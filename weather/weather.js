const request = require('request');

const getWeather = (latitude,longitude,callback) => {
    //api key - > c0c4d183059d38251a9194b0a9ae4ad4

    const weatherReq = {
        url: `https://api.darksky.net/forecast/c0c4d183059d38251a9194b0a9ae4ad4/${latitude},${longitude}`,
        json: true
    }

    request(weatherReq, (error, response, body) => {

        if (!error && response.statusCode == 200) {
            callback(undefined,{
              temperature: body.currently.temperature,
              apparentTemperature: body.currently.apparentTemperature   
            });
        }
        else {
           callback('unable to fetch weather');
        }

    });
}

module.exports = {
    getWeather: getWeather
}