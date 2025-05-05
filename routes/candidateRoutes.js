const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Candidate = require('../models/Candidates')
const {jwtAuthMiddleware} = require('../jwt')

const isAdmin = async (userID)=>{
    try{
        const user = await User.findById(userID)
        return user.role === 'Admin'
    }
    catch(err){
        return false;
    }
}

// Candidate sginup by admin
router.post('/',jwtAuthMiddleware, async(req,res)=>{

    try{

        const candidteData = req.user.userData;  // Correctly access userData
        const candidateId = candidteData.id;

        if(! await isAdmin(candidateId)){
            return  res.status(403).json({message: "You are not Admin"})
        }
        const candidate = req.body
        const newCandidate = new Candidate(candidate) 

        const response = await newCandidate.save()
        console.log("Candidate Saved Successfully")

        res.status(200).json({response})
    }
    catch(err){
        console.error(err)
        res.status(400).json({error: "Internal Server error"})
    }
})

// Update existing candidate

router.put('/:candidateId',jwtAuthMiddleware, async(req,res)=>{
    try{

        const candidteData = req.user.userData;  // Correctly access userData
        const AdmincandidateId = candidteData.id;
        const candidateId =req.params.candidateId
        const newData = req.body

        if(! await isAdmin(AdmincandidateId)){
            console.log(AdmincandidateId)
            return res.status(403).json({message: "You are not Admin"})
        }

        const response = await Candidate.findByIdAndUpdate(candidateId,newData,{
            new: true,    //Return the updated documents
            runValidators: true,    //Run Mongoose Validations
        })

        if(!response){
            res.status(404).json({error: 'Person not found'})
        }
        console.log("Candidate Updated Successfully")
        res.status(200).json({response})

    }
    catch(err){
        console.error(err)
        res.status(400).json({error: "Internal Server error"})
    }
})

// Delete existing candidate
router.delete('/:candidateId',jwtAuthMiddleware, async(req,res)=>{
    try{
        const candidteData = req.user.userData;  // Correctly access userData
        const AdmincandidateId = candidteData.id;

        const candidateId =req.params.candidateId

        if(! await isAdmin(AdmincandidateId)){
            console.log(AdmincandidateId)
            return res.status(403).json({message: "You are not Admin"})
        }

        const response = await Candidate.findByIdAndDelete(candidateId)
        if(!response){
            res.status(404).json({error: 'Person not found'})
        }
        console.log('Candidate Deleted Successfully')
        res.status(200).json({message: "Candidate Deleted Successfully"})
    }
    catch(err){
        console.error(err)
        res.status(400).json({error: "Internal Server error"})
    }
})

module.exports = router