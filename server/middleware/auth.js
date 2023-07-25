const jwt = require('jsonwebtoken')
require('dotenv').config();

const secret = process.env.Secret;

const authenticateJwt = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token= authHeader.split(' ')[1];
        jwt.verify(token , secret, (err ,user)=>{
            if(err){
                return res.status(403).json({
                    message:"Unauthorized"
                })
            }
            req.user = user;
            next();
        })
    }else{
        res.status(401).json({
            message:"Missing authheader"
        });
    }
};

module.exports = {
    authenticateJwt
}