const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport')

router.get('/',async(req,res)=>{
    try{      
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.json({ message: err})
    }
});

router.post('/signUp', async (req,res)=>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save()
        res.json(savedUser)
    }catch(err){
        res.json({message: err})
    }
    User.register({ username: req.body.username }, req.body.password, function(err, user){
        if(err){
            console.log(err);
            console.log("something bad happend")
        }else{
            passport.authenticate("local")(req, res, function(){
                console.log("success!")
            });
        }
    });
    
});

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
            req.session.currentUser = user;
            return res.status(200).json(user);
        }catch(err){
            res.json({message:err})
        }
        
    }); 
    
});

module.exports = router;