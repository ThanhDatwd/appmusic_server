
const { default: mongoose } = require('mongoose')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')
const User = require('../models/User')

class AuthController {
    async registerUser(req, res) {
        try {
            // res.json('hello this is router register')
            const salt =await bcrypt.genSalt(10)
            const hashed= await bcrypt.hash(req.body.password,salt)
            // tạo mới user
            const newUser= await new User({
                userName:req.body.name,
                password:hashed,
                email:req.body.email
            })
             const a={
                userName:req.body.name,
                password:hashed,
                email:req.body.email
             }
            // save user
             const user= await newUser.save()
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async loginUser(req, res) {

        try {
           const user= await User.findOne({email:req.body.email})
           if(!user){
            return res.status(404).json('Email have somthing wrong')
           }
           const validPassword = await bcrypt.compare(
               req.body.password,
               user.password
           )
           if(!validPassword){
            return res.status(404).json('Password have somthing wrong')
           }
           if(user&&validPassword){
             const accessToken= jwt.sign({
                  userId:user.userId,
                  userName:user.userName,
                  email:user.email,
                  admin:user.admin,
                  artist:user.artist

              },
              'usersecretkey', // nhập key bí mật
              {expiresIn:'30d'}
              )
              const {password,...others}=user._doc
              res.status(200).json({...others,accessToken})
           }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}
module.exports = new AuthController;