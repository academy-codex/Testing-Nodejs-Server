var express = require('express');
var {ObjectID} = require('mongodb');
var router = express.Router();
var _ = require('lodash');

var {Todo} = require('./../models/todo');

router.post('/', (req, res)=>{
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        console.log(doc);
        res.send(doc);
    }, (e)=>{
        console.log(e);
    });
});

router.get('/', (req, res)=>{
   Todo.find().then((docs)=>{
       res.send(docs);
   }, (e)=>{
      console.log(e);
      res.status(400).send("Error: "+e);
   });
});

router.get('/:id', (req, res)=>{
   Todo.findById(req.params.id).then((todo)=>{
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

router.delete('/:id', (req, res)=>{
    if (ObjectID.isValid(req.params.id)){

        Todo.findByIdAndRemove(req.params.id).then((doc)=>{
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

router.patch('/:id', (req, res)=>{

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
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((doc)=>{
        res.send({todo:doc});
    }, (e)=>{
       res.status(400).send("Error.");
    });
});

module.exports = router;