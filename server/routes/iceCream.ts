import { Request, Response } from "express";
import { ObjectId } from "mongodb";

var express= require('express');
var router=express.Router();
var mongodbutil = require( '../db/connection' );
var db = mongodbutil.getDb();

const ICE_CREAM_COLL = "ice-cream";

router.get('/',  async (req: Request, res: Response) => {
    const filter: any = { delete : false };
    const searchName = req.query.search;
    const offsetStr : any = req.query.offset;
    const limitStr : any = req.query.limit;
    const flavorName = req.query.filter;

    if (searchName) {
      filter.name = { $regex : new RegExp(`${searchName}`, 'i')}
    }
    if (flavorName)
    {
      filter.flavor = { $regex : new RegExp(`${flavorName}`, 'i')}
    }


    const offset = offsetStr ? parseInt(offsetStr, 10) : 0;
    const limit = limitStr ? parseInt(limitStr, 10) : 0;

    const totalCount = await db.collection(ICE_CREAM_COLL).find({delete : false}).count();

    const cursor = db.collection(ICE_CREAM_COLL).find(filter).skip(offset).limit(limit);

    cursor.toArray( (err: any, results: any) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
       const result = {
         count : totalCount,
         data : results,
       }
        res.json(result);
      }
    });
});

router.get('/:id', function (req: any, res: any) {
    db
    .collection(ICE_CREAM_COLL)
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
    .collection(ICE_CREAM_COLL)
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
    .collection(ICE_CREAM_COLL)
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
  .collection(ICE_CREAM_COLL)
  .deleteOne( { _id: new ObjectId(req.params.id) }, function (err: any, result: any) {
      if (err) { throw err };
      res.json(result);
  });
});
module.exports = router;