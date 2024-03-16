const passport = require("passport")
const local = require("passport-local")
const userModel = require('../Dao/models/user.model')
const bcrypt = require('bcrypt');
const { isValidObjectId } = require("mongoose");

const localStrategy = local.Strategy

const initializePassport = () =>{
    passport.use('register',new localStrategy({
        passReqToCallback:true,usernameField:'email'},
        async (req,username,password,done)=>{
            const {first_name,last_name,email,age} = req.body;
            try {
                let user = await userModel.findOne({email})
                console.log("passport.config.js 19",user)
                if(user){
                    return done(null,false)
                }
                const paswHashed = await createHash(password)

                const addUser = {
                    first_name, 
                    last_name, 
                    email, 
                    age,
                    password:paswHashed
                }

                const newUser = await userModel.create(addUser);
                if(!newUser){
                    return res.status(500).json({message:"error with register"})
                }
                return done(null,newUser)
            } catch (error) {
                return done('error getting user'+error)
            }
        }
    ))

    passport.use('login', new localStrategy({
        usernameField:'email'
    },async(username,password,done)=>{
        try {
            const user = userModel.findOne({email:username})
            if(!user){
                return done(null,false)
            }
            if(!isValidPasswd(passport,user.password)){
                return done(null,false)
            }

            return done(null,user)
        } catch (error) {
            console.log("error login")
            return done(error)
        }
    }))
    
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async (id,done)=>{
        let user = await userModel.findById({_id:id})
        done(null,user)
    })
}

module.exports = initializePassport