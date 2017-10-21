let mongoose = require('mongoose');
let validator = require('validator');

let User = mongoose.model('User', {
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

module.exports={User};