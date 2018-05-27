const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({

type : {
        type:String,
        default : "Point"
    },
    coordinates : {
      type:[Number],
      index : "2dsphere"
    }

});

const LocationSchema = new Schema({

  name:{
    type:String,
    required:[true,'please enter the name']
  },
  rank :{
    type:String
  },
  available:{
    type : Boolean,
    default:false
  },
  geometry : GeoSchema

});
const Ninja = mongoose.model('Location',LocationSchema);//(name of the  table is locations)it always small letter with 's' at the end
module.exports = Ninja;
