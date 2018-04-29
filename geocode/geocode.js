const request = require('request');

const geocodeAddress = (address,callback) => {
    const addressInput = encodeURIComponent(address);

    var req = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressInput}`,
        json: true
    }
    request(req, (error, response, body) => {
        if (error) {
            callback('unable to connect to google servers');
        }
        else if (body.status === 'ZERO_RESULTS') {
            callback('unable to find address');
        }
        else if (body.status === 'OK') {
            callback(undefined,{
              address: body.results[0].formatted_address,
              latitude: body.results[0].geometry.location.lat,
              longitude: body.results[0].geometry.location.lng
            });
        }
        else {
           callback('unable to find address');
        }

    });
}

module.exports={
    geocodeAddress: geocodeAddress
}