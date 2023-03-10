const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personSchema = new Schema({
    name: {type: String, required: true},
    commitments: [{
        type: Schema.Types.ObjectId,
        ref: 'Commitment',
    }],
    birthday: {type: String},
    anniversary: {type: String},
    address: {type: String},
    giftIdeas: {type: String},
    notes: {type: String},
    category: {type: String},
}, {
    timestamps: true,
});

const commitmentSchema = new Schema({
    name: {type: String, required: true},
    start: String,
    end: String,
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

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    commitments: [commitmentSchema],
    people: [personSchema],
}, {
    timestamps: true,
});


module.exports = mongoose.model('Profile', profileSchema);
