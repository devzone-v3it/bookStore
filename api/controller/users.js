const mongoose = require('mongoose');
const User = require('../models/users');
const crypto = require('crypto');

exports.Signup_user = async(req, res, next) => {
    try{
        const user = await User.findOne({$or: [{email: req.body.email}, {password: req.body.username}]}).exec();
        if (!user){
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                fname: req.body.fname,
                mname: req.body.mname,
                lname: req.body.lname,
                email: req.body.email,
                password: crypto.createHash('sha256', process.env.SECRET_KEY).update(req.body.password).digest('hex'),
                creationDate: Date.now()
            })
            await newUser.save();

            res.status(201).json({
                status: 201,
                message: `User with email id ${req.body.email} is created successfully`,
                request: {
                    type: 'POST',
                    url: '/login',
                    params:{
                        username: "<String>",
                        email: "<String>",
                        password: "<String>",
                        doc: "Either use username or email to login"
                    }

                }
            })
        }
        else{
            res.status(409).json({
                status: 409,
                message: "User already exist with this username or email address"
            })
        }
    }
    catch (err){
        res.status(500).json({
            status:500,
            error: err +' in /signup'
        })
    }
};

exports.Login_user = async (req, res, next) => {

    try{
        const user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}).exec();

        if (user && user.password === crypto.createHash('sha256', process.env.SECRET_KEY).update(req.body.password).digest('hex')){
            res.status(200).json({
                status: 200,
                message: 'Successfully logged in'
            })
        }
        else{
            res.status(401).json({
                status: 401,
                message: "Authentication Failed"
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: 500,
            message: err + " in POST /login"
        })
    }
}