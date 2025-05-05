const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Candidate = require('../models/Candidates')
const {generateToken, jwtAuthMiddleware} = require('../jwt')


router.post('/signup', async(req,res)=>{
    try{
        const data = req.body
        const newUser = new User(data)

        const response = await newUser.save()
        console.log("Data Saved Successfully")

        // Generate token 
        const payload ={
            id: response.id
        }
        const token = generateToken(payload)
        res.status(200).json({response:response , token:token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }

})

router.post('/login', async(req,res)=>{
    const {idcardno,password} = req.body
    console.log()
    const user = await User.findOne({ idcardno: idcardno })

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "Invalid Idcardno or Password"})
        }
   
    try{
        const payload = {
            id: user.id
        }
        const token = generateToken(payload)
        res.json({token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }   
})

router.get('/profile',jwtAuthMiddleware, async(req,res)=>{
    try{
        const userData = req.user.userData;  // Correctly access userData
        const userId = userData.id; 

        const user = await User.findById(userId)
        res.status(200).json({user})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }   
})

router.put('/profile/:password',jwtAuthMiddleware, async(req,res)=>{
    try{
        const userData = req.user.userData;  // Correctly access userData
        const userId = userData.id;
        const oldPassword = req.params.password
        const {newPassword} = req.body

        // console.log(userId)
        // console.log("User ID:", userId);  // Should log the user ID
        // console.log("Old Password:", oldPassword);  // Should log the old password
        // console.log("New Password:", newPassword);  // Should log the new password

        const user = await User.findById(userId)

        if(!user || !(user.comparePassword(oldPassword))){
            return res.status(401).json({error: "Invalid old password"})
        }

        user.password = newPassword;
        await user.save()

        console.log("Password Updated")
        res.status(200).json({ message: "Password updated successfully" })
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    } 
})

// List of Candidates
router.get('/candidates', async(req,res)=>{
    try{
        const candidates = await Candidate.find()

            const Candidates = candidates.map((data)=>{
                return{
                    name: data.name,
                    party: data.party
                }
            })
            res.status(200).json(Candidates)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }
})

// Vote for specific candidate 
router.post('/vote/:candidateId',jwtAuthMiddleware, async(req,res)=>{
    // voter can vote only once
    // Admin cannot vote

    try{
        const candidateId = req.params.candidateId
        const userId = req.user.userData.id

        const candidate = await Candidate.findById(candidateId)
        if(!candidate)
            return res.status(403).json({message: "Candidate not found"})

        const user = await User.findById(userId)
        if(!user)
            return res.status(403).json({message: "User not found"})

        if(user.isVoted)
            return res.status(403).json({message: "User already voted"})

        if(user.role === 'Admin')
            return res.status(403).json({message: "Admin cannot vote"})

        candidate.votes.push({userId: userId})
        candidate.voteCount++
        candidate.save()

        user.isVoted = true
        user.save()

        res.status(200).json({message: "User voted successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }
})

// vote counting route
router.get('/vote/count', async(req,res)=>{
    try{

        // set the records of candidates record sorted
        const candidates = await Candidate.find().sort({voteCount: 'desc'})

        // map the candidates to only return their party and votecount
        const voteRecord = candidates.map((data)=>{
            return{
                party: data.party,
                votes: data.voteCount 
            }
        })
        res.status(200).json(voteRecord)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router