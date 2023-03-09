const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commitmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {type: String, required: true},
    startDateTime: {
        type: Date,
        default: function() {return Date.now()+ 1*24*60*60*1000}
    },
    endDateTime: {
        type: Date,
        default: function() {return Date.now() + 8*24*60*60*1000}
    },
    people: [{
        type: Schema.Types.ObjectId,
        ref: 'Person',
    }],
    location: String,
    notes: String,
    flexible: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Commitment', commitmentSchema);