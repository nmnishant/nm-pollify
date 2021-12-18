const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    pollQuestion : {
        type: String,
        required: [true, "Please enter poll question"]
    },
    options : {
        type: [Object],
        required: [true, "Please enter some poll options"],
        validate: {
            validator: function(val){
                for(let i=0; i<val.length; i++){
                    let elem = val[i];
                    if(!elem.value || elem.count != 0){
                        return false;
                    }
                }
                return true;
            },
            message: 'Option value is empty or count is not initialized with 0'
        }
    },
    totalCount : {
        type: Number,
        default: 0,
        validate: {
            validator: function(val){
                if(val != 0){
                    return false;
                }
                return true;
            }
        }
    },
    ipDetection : {
        type: Boolean,
        default: false
    }
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;