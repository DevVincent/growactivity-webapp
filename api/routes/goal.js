const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

router.post('/',async(req,res)=>{
    const { id } = req.body;
    try{      
        const goals = await Goal.find({aId: id},);
        res.json(goals)
    }catch(err){
        res.json({ message: err})
    }
});

router.post('/goalsByWeek',async(req,res)=>{
    const { id, startWeek, endWeek } = req.body;
    try{      
        const goals = await Goal.find({aId: id, 
            date: {
            $gte: startWeek,
            $lte: endWeek
          }},);
        res.json(goals)
    }catch(err){
        res.json({ message: err})
    }
});

router.post('/new', async (req,res)=>{
    const { aId, title, details, date, deadline } = req.body;
    const goal = new Goal({
        aId: aId,
        title: title,
        details: details,
        date: date,
        deadline: deadline
    });
    try{
        const savedGoal = await goal.save()
        res.json(savedGoal)
    }catch(err){
        res.json({message: err})
    }
});

router.post('/addDeadline', async (req,res)=>{
    const { Id, mDate } = req.body;
    console.log(mDate)
    
    Goal.findByIdAndUpdate(
        { _id: Id },
        { deadline: mDate },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json(result)
            console.log(result)
          }
        }
      );  
       
});

router.delete('/:goalId', async (req,res)=>{
    try{
        const removedGoal = await Goal.deleteOne({_id: req.params.goalId})
        res.json(removedGoal);
    }catch(err){
        res.json({message: err})
    }
});


module.exports = router;