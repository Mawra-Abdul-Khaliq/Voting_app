const mongoose =  require('mongoose')

const candidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    voteCount:{
        type: Number,
        default: 0
    },
    party:{
        type: String,
        required: true
    },
    age:{
        type: Number,
    },
    votes: [
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt:{
                type: Date,
                default: Date.now()
            }
        }
    ]
})

const Candidate = mongoose.model('Candidate',candidateSchema)

module.exports = Candidate