var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('I am /user');
});

router.get('/:id', function(req, res, next){
  res.send("I am /user/"+req.params.id);
});

module.exports = router;
