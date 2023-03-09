require('dotenv').config();
require('./config/database');

const Person = require('./models/person');
const Commitment = require('./models/commitment');

(async function() {
  await Person.deleteMany({});
  const people = await Person.create([
    {
      user: '64091ac104a0cbdac7df6ee8',
      name: 'Mom',
      birthday: "August 11th",
      anniversary: "October 1st",
      address: "6637 Apperson Dr",
      giftIdeas: "black fleece zip up sweater, electric cooler for car, air fryer, organize and bind recipes, spanish learning stuff",
      notes: "Gluten free, mentioned wanting to do a girls trip soon",
      category: "family",
    },
    {
      user: '64091ac104a0cbdac7df6ee8',
      name: 'Dad',
      birthday: "October 19th",
      anniversary: "October 1st",
      address: "6637 Apperson Dr",
      giftIdeas: "outdoor security cameras, thermos, puzzle book, socks, drone, pick box",
      notes: "Gluten free, mentioned wanting to do a girls trip soon",
      category: "family",
    },
    
  ]);

  await Commitment.deleteMany({});
  const commitments = await Commitment.create([
    {
      user: '64091ac104a0cbdac7df6ee8',
      name: 'Drinks with Matt & Zoe',
      location: "Quality Time Bar",
      notes: "Thinking the week of 3/19-3/24",
      flexible: "suggested"
    },
    {
      user: '64091ac104a0cbdac7df6ee8',
      name: 'Dinner with Mom & Dad',
      location: "Monteverde",
      notes: "need to clean house before they arrive",
      flexible: "reserved"
    },
  ]);

  console.log("people:", people, "commitments:", commitments)

  process.exit();
})();
