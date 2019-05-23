const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

//create a schema
const advertSchema = new Schema({
    ID: String,
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
    campaignContent: String,
    campaignDuration: { type: Date, default: Date.now() },
});

advertSchema.index( { location: "2dsphere" } ); //Change to .index in Linux

// Compile model from schema
const Advert = mongoose.model('Advert', advertSchema );

module.exports = Advert;