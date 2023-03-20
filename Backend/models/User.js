const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const UserSchema = new Schema({
    provider: {
        required: true,
        type: String,
        default: 'native'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        default: "N/A"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  
  const User = mongoose.model('user', UserSchema);
  module.exports = User