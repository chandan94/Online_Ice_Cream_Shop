import { ObjectId } from "mongodb";

var express= require('express');
var router=express.Router();
var mongodbutil = require( '../db/connection' );
var db = mongodbutil.getDb();

router.get('/', function (req: any, res: any) {
    db
    .collection("iceCream")
    .find({})
    .toArray(function (err: any, results: any) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(results);
      }
    });
});

router.get('/:id', function (req: any, res: any) {
    db
    .collection("iceCream")
    .findOne({_id: new ObjectId(req.params.id)},function (err: any, result: any) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

router.post('/', function (req: any, res: any) {
  
    db
    .collection("iceCream")
    .insertOne( req.body, function (err: any, result: any) {
        if (err) {
          res.status(400).send("Error inserting matches!");
        } else {
          console.log(`Added a new match with id ${result.insertedId}`);
          res.json(result);
        }
      });
});


router.put('/:id', function (req: any, res: any) {
    db
    .collection("iceCream")
    .updateOne({
      _id: new ObjectId(req.params.id)
      }, {$set:req.body}, function (err: any, result: any) {
        if (err) { throw err };
        //if update successfull , it will return updated video object
        res.json(result+req.body.title);
        });
    });


    //delete an existing  video 
router.delete('/:id', function (req: any, res: any) {
  db
  .collection("iceCream")
  .deleteOne( { _id: new ObjectId(req.params.id) },function (err: any, result: any) {
      if (err) { throw err };
      res.json(result);
  });
});
module.exports = router;