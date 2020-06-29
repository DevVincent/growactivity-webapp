const express = require('express');
const router = express.Router();
const Workspace = require('../models/Workspace');

//Fetch Workspace

router.post('/newDescription',async(req,res)=>{
    const { id, title, description } = req.body;
    try {
        await Workspace.updateOne({ _id: id }, { $set: { "description": description }});
        return res.status(200).json({ response: true });
      } catch(e){
        return next(e)
      }
});

router.post('/newGoal',async(req,res,next)=>{
    const { id, title, description } = req.body;
    try {
        await Workspace.findByIdAndUpdate({ _id: id }, { $set: { "goals$[].title": title} },{ "new": true, "upsert": true },
        function (err) {
            if (err) throw err;
        });
        return res.status(200).json({ response: true });
      } catch(e){
        return next(e)
      }
});

router.delete('/:activityId', async (req,res)=>{
    try{
        const removedActivity = await Activity.deleteOne({_id: req.params.activityId})
        res.json(removedActivity);
    }catch(err){
        res.json({message: err})
    }
});

/*
router.post('/signIn', async (req, res)=>{
    const { username, password } = req.body;

    User.findOne({username: username, password: password}, async function(err, user) {
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(404).send();
        }
        try{
            const user = await User.find({ username: username });
            res.json(user);
            return res.status(200).send();
        }catch(err){
            res.json({message:err})
        }
        
    }); 
    
});
*/
module.exports = router;