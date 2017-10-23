var express = require('express');
var router = express.Router();
var {ObjectID} = require('mongodb');
var {authenticate} = require('./../middleware/authenticate');

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

router.get('/me', authenticate, (req, res)=>{
    res.send(req.user);
});

router.post('/login', (req, res)=>{
  let body = {
    email: req.body.email,
    password: req.body.password
  };

  User.findByCredentials(body.email, body.password).then((user)=>{
      return user.generateauthtoken().then((token)=>{
          res.header('x-auth',token).send(user);
      });
  }).catch((e)=>{
      res.status(400).send(e);
  });
});

router.delete('/me/token', authenticate, (req, res)=>{

    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }, (e)=>{
        res.status(400).send(e);
    });
});

module.exports = router;
