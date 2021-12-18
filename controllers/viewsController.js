const Poll = require('../models/pollModel');

exports.homePage = (req, res) => {
    res.status(200).render('createPoll');
}

exports.viewPoll = async (req, res) => {
    try{
        const pollDetails = await Poll.findById(req.params.id);
        if(pollDetails) res.status(200).render('viewPoll', pollDetails);
        else res.status(200).render('error');
    }
    catch(err) {
        res.status(200).render('error');
    }
}

exports.error404 = (req, res) => {
    res.status(404).render('error');
}