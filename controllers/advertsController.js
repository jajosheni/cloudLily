const Advert = require('../models/advert');

function distance(lat1,lon1,lat2,lon2) {
    const R = 6371; // km (change this constant to get miles)

    let dLat = (lat2-lat1) * Math.PI / 180;
    let dLon = (lon2-lon1) * Math.PI / 180;

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;

    if (d>1)
        return Math.round(d)+"km";
    else if (d<=1)
        return Math.round(d*1000)+"m";
}

module.exports = {
    //list all adverts
    list_advert: async function (req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);

        let searchQuery = req.query.searchQuery;
        let radius = req.query.radius;
        if(radius>49999) radius = 1000000000000;

        let coordinates = [0,0];
        let temp = req.query.userLocation.replace(' ', '').split(',');
        try{
            coordinates[0] = parseFloat(temp[0]);
            coordinates[1] = parseFloat(temp[1]);
        }catch (e) {
            coordinates[0] = 40.0;
            coordinates[1] = 20.0;
            radius = 1000000000;
        }


        let location = {
            "type" : "Point",
            "coordinates" : coordinates,
        };

        let adverts = await Advert.find(
            {
                $and:[
                    {
                        $or: [
                            {"campaignContent" : {$regex : `.*${searchQuery}.*`, $options: "i" }},
                            {"name" : {$regex : `.*${searchQuery}.*`, $options: "i" }},
                        ]
                    },
                    {
                        location:
                            { $near:
                                    {
                                        $geometry: location,
                                        $maxDistance: radius
                                    }
                            }
                    },
                    {
                        campaignDuration:
                            {
                                $gte: new Date()
                            }
                    }
                ]

            }
            , function (err, adv) {
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
    },

    //get a single advert by id
    get_advert: async function (req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);

        let advertID = req.params.id;

        let advert = await Advert.findOne({_id: advertID}, function (err, adv){
            if (err) console.log(err);
            return adv;
        });
        res.send(advert)
    }
};