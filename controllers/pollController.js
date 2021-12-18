const Poll = require('../models/pollModel');

exports.getAllPolls = async function(req, res){
    const polls = await Poll.find();
    res.status(200).json(polls);
}

exports.createNewPoll = async function(req, res){
    try{
        console.log(req.ip);
        const doc = await Poll.create(req.body);
        res.status(201).json({
            status : "success",
            body : doc
        });
    }
    catch(err) {
        res.status(400).json({
            status : "fail",
            msg : err
        })
    }
}

exports.getPollById = async function(req, res){
    try{
        const pollDetails = await Poll.findById(req.params.id);
        if(pollDetails){
            res.status(200).json({
                status: "success",
                data: pollDetails
            });
        }
        else{
            res.status(404).json({
                status : "fail",
                msg : 'Invalid poll id'
            })
        }
    }
    catch(err) {
        res.status(500).json({
            status : "fail",
            msg : err
        })
    }
}

exports.updatePoll = async function (req, res){
    try{
        await Poll.updateOne({_id : req.params.id, "options.value": req.body.value}, { $inc: {"options.$.count" : 1, totalCount : 1} });
        const doc = await Poll.findById(req.params.id);
        if(doc){
            res.status(200).json({
                status: 'success',
                data: doc
            });
        }
        else Promise.reject();
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            data: 'Poll not found'
        });
    }
}
