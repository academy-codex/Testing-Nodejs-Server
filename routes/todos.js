var express = require('express');
var {ObjectID} = require('mongodb');
var router = express.Router();
var _ = require('lodash');
var {authenticate} = require('./../middleware/authenticate');

var {Todo} = require('./../models/todo');

router.post('/', authenticate, (req, res)=>{
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc)=>{
        console.log(doc);
        res.send(doc);
    }, (e)=>{
        console.log(e);
    });
});

router.get('/', authenticate, (req, res)=>{
   Todo.find({
       _creator: req.user._id
   }).then((docs)=>{
       res.send(docs);
   }, (e)=>{
      console.log(e);
      res.status(400).send("Error: "+e);
   });
});

router.get('/:id', authenticate, (req, res)=>{
   Todo.findOne({
       _id: req.params.id,
       _creator: req.user._id
   }).then((todo)=>{
       let exists = true;
       if (todo === null){
           exists = false;
       }
       res.send({
           todo:todo,
           exists:exists
       });

   }, (e)=>{
      res.status(400).send("Error: "+e);
   });
});

router.delete('/:id', authenticate, (req, res)=>{
    if (ObjectID.isValid(req.params.id)){

        Todo.findOneAndRemove({
            _id: req.params.id,
            _creator: req.user._id
        }).then((doc)=>{
            if (!doc){
                res.status(404).send("Todo not found.")
            }
            res.send({deletedTodo: doc});
        }, (e)=>{
            res.status(400).send("Could not delete the todo.");
        });
    }else{
        res.status(400).send("Invalid ID.");
    }
});

router.patch('/:id', authenticate, (req, res)=>{

    let id = req.params.id;
    let body = _.pick(req.body,['text', 'completed']);

    if (!ObjectID.isValid(id)){
        res.status(404).send("Invalid ID.");
    }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((doc)=>{
        res.send({todo:doc});
    }, (e)=>{
       res.status(400).send("Error.");
    });
});

module.exports = router;