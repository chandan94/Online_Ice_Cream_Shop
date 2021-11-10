var MongoClient = require( 'mongodb' ).MongoClient;
var _db: any;
module.exports = {
  connectToServer: function( callback: (arg0: any) => any ) {
    MongoClient.connect( 'mongodb://localhost:27017/', function( err: any, client: { db: (arg0: string) => any; } ) {
      _db = client.db("online_ice_cream_shop");
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};