const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//Fetch todos

router.post('/',async(req,res)=>{
    const { id } = req.body;
    try{      
        const todos = await Todo.find({aId: id},);
        res.json(todos)
    }catch(err){
        res.json({ message: err})
    }
});

router.post('/new', async (req,res)=>{
    const { aId, tbody} = req.body;
    const todo = new Todo({
        aId: aId,
        body: tbody,
    });
    try{
        const savedTodo = await todo.save()
        res.json(savedTodo)
    }catch(err){
        res.json({message: err})
    }
});

router.delete('/:todoId', async (req,res)=>{
    try{
        const removedTodo = await Todo.deleteOne({_id: req.params.todoId})
        res.json(removedTodo);
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router;