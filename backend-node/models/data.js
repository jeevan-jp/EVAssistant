var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({

    SNo: {
        type: Number
    },
    Concession: {
        type: String
    } ,
    Area: {
        type: String 
    } ,
    sitecode: {
        type: String 
    } ,
    stopName: {
        type: String 
    } ,
    RoadName: {
        type: String 
    } ,
    Towards: {
        type: String 
    } ,
    coordinates: {
        type: String 
    } ,
}); 

module.exports = mongoose.model('Data',dataSchema);