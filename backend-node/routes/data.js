var express = require('express');

var csv = require("fast-csv");

var router = express.Router();

var fs = require('fs');

var mongoose = require('mongoose');

var Data  = mongoose.model('Data');

var csvfile = __dirname + "/../public/files/1.csv";

var stream = fs.createReadStream(csvfile);
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Import CSV file using NodeJS' });

}).get('/import', function(req, res, next) {

    var  products  = []
    var csvStream = csv()
        .on("data", function(data){
         
         var item = new Data({
              SNo: data[0] ,
              Concession: data[1]   ,
              Area: data[2],
              sitecode: data[3],
              stopName:data[4],
              RoadName:data[5],
              Towards:data[6] ,
              coordinates:data[7]
         });
         
          item.save(function(error){
            console.log(item);
              if(error){
                   throw error;
              }
          }); 

    }).on("end", function(){

    });
  
    stream.pipe(csvStream);
    res.json({success : "Data imported successfully.", status : 200});
     
  }).get('/fetchdata', function(req, res, next) {
    
    Product.find({}, function(err, docs) {
        if (!err){ 
            res.json({success : "Updated Successfully", status : 200, data: docs});
        } else { 
            throw err;
        }
    });
  
});
module.exports = router;
