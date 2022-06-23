
const jwt =require('jsonwebtoken')


class MiddlewareController{
    verifyToken(req,res,next){
       const token=req.headers.authorization
       if(token){
           const accessToken=token.split(" ")[1]
           jwt.verify(accessToken,'usersecretkey',(err,user)=>{
               if(err){
                   return res.status(403).json('token is not valid')
               }
               req.user=user
               next()
           })
       }
       else{
           return res.status(401).json('you are not authentication')
       }
    }
    
}
module.exports = new MiddlewareController