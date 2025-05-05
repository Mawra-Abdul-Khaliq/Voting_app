const jwt =  require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next)=>{

    const authorization = req.headers.authorization
    if(!authorization)
        return res.status(401).json({error: "Unauthorize"})

    const token = req.headers.authorization.split(' ')[1]

    if(!token)
        return res.status(401).json({error: "Unauthorize"})

    try{
        const decode = jwt.verify(token, process.env.JWT_TOKEN )
        
        // Attach user information to request that is going to server so server can fetch required data
        req.user = decode
        next();
    }
    catch(err){
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'})
        next();
    }
}

const generateToken = (userData)=>{
    return jwt.sign({userData}, process.env.JWT_TOKEN, {expiresIn: 30000})
}

module.exports = {generateToken, jwtAuthMiddleware}