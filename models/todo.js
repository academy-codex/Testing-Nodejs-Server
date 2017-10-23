let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default:null
    },
    _creator:{
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports={Todo};