const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

//Fetch Activities

router.post('/',async(req,res)=>{
    const { id } = req.body;
    try{      
        const activities = await Activity.find({owner: id},);
        res.json(activities)
    }catch(err){
        res.json({ message: err})
    }
});

router.post('/new', async (req,res)=>{
    const { id, title, description } = req.body;
    const activity = new Activity({
        owner: id,
        title: title,
        description: description
    });
    try{
        const savedActivity = await activity.save()
        res.json(savedActivity)
    }catch(err){
        res.json({message: err})
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