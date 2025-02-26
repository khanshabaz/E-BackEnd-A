const mongoose = require('mongoose');
const { Schema } = mongoose;
const brandSchema = new Schema({
    value: {type:String, required:true, unique:true},
    label: {type:String, required:true, unique:true},

  });

  

  exports.Brand = mongoose.model('Brand', brandSchema);