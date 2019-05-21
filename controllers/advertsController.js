const Advert = require('../models/advert');

module.exports = {
    //list all adverts
    list_advert: async function (req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);

        let userLocation = req.body.userLocation;
        let radius = req.body.radius;
        console.log('userLocation', userLocation, 'radius:', radius);

        let adverts = await Advert.find(function(err, adv) {
            if (err) console.log(err);
            // object of all the adverts
            return adv;
        });
        res.send(adverts);
    },

    //create an advert
    create_advert: function (req, res, next) {
        let coordinates = [0,0];
        let temp = req.body.location.replace(' ', '').split(',');
        coordinates[0] = parseFloat(temp[0]);
        coordinates[1] = parseFloat(temp[1]);

        let location = {
            "type" : "Point",
            "coordinates" : coordinates,
        };

        const newAdvert = Advert({
            ID: req.body.ID,
            name: req.body.name,
            location: location,
            campaignContent: req.body.campaignContent,
            campaignDuration: req.body.campaignDuration
        });

        newAdvert.save(function(err) {
            if (err) {
                console.log(err);
                res.send('Fail')
            }else
                res.send('Saved');
        });
    }
};