// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Commitment = require('./models/commitment');
const Person = require('./models/person');

// Local variables will come in handy for holding retrieved documents
let user, person, commitment;
let users, people, commitments;
