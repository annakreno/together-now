const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
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

module.exports = mongoose.model('Person', personSchema);