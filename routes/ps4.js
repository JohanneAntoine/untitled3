const express = require('express');
const router = express.Router();

const redis = require('redis');
const client = redis.createClient();

client.on("error", function (error) {
    console.error(error);
});

/* GET home page. */
router.post('/', function (req, res, next) {
    let city = req.body.city;

    //grab a string off of the re

    //see if the reversed string is in cache (redis)
    client.exists(city).then(
        (err,response) => {
            console.log(response)
            if (err) {
                console.log(err);
                throw new Error(err)
            }
            if (response === 1) {
                client.get(city, (err, revString) => {
                    console.log(`revString: ${revString}`)
                    res.render('ps4', {title: revString, cached: 'true'});
                })
            } else {
                const revString = city.split('').reverse().join('');
                client.set(city, revString, (err, response) => {
                    console.table(response)
                    res.render('ps4', {title: revString, cached: 'false'});

                })
            }
        }
    )

});

module.exports = router;

//flush in-memory (cached) objects to disk
