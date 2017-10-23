var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_8h4krt83:iftv40jprotuumsug42go3q7fn@ds023613.mlab.com:23613/heroku_8h4krt83'||'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
