var express = require('express');
var router = express.Router();

var {User} = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().then((users)=>{
    res.send(users);
  }, (e)=>{
    res.send(400).send("Error");
  });
});

router.post('/', (req, res)=>{

  let user = new User({
     email: req.body.email,
     password: req.body.password
  });

  user.save().then(()=>{
    return user.generateauthtoken();
  }, (e)=>{
    res.status(400).send("Error");
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  });

});

router.get('/:id', (req, res)=>{
  User.findById(req.params.id).then((user)=>{

    if (!user){
      res.status(404).send("No user found.");
    }

    res.send({user});
  });
});

module.exports = router;
