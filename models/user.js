let mongoose = require('mongoose');
let validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email.`
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: null
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;

    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateauthtoken = function() {
  let user = this;

  let access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(),access:access}, '123');

  user.tokens.push({access,token});

  return user.save().then(()=>{
      return token;
  });
};

let User = mongoose.model('User', UserSchema);

module.exports={User};