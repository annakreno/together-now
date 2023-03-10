require('dotenv').config();
require('./config/database');

const Profile = require('./models/profile')

(async function() {
  const profiles = await Profile.create({
      user: "640a471830591add6fd0265a",
      commitments: [{
        name: 'Drinks with Matt & Zoe',
        people: [],
        location: "Quality Time Bar",
        notes: "Thinking the week of 3/19-3/24",
        flexible: "suggested"
      },
      {
        name: 'Dinner with Mom & Dad',
        people: [],
        location: "Monteverde",
        notes: "need to clean house before they arrive",
        flexible: "reserved"
      }],
      people: [{
        name: 'Mom',
        commitments: [],
        birthday: "August 11th",
        anniversary: "October 1st",
        address: "6637 Apperson Dr",
        giftIdeas: "black fleece zip up sweater, electric cooler for car, air fryer, organize and bind recipes, spanish learning stuff",
        notes: "Gluten free, mentioned wanting to do a girls trip soon",
        category: "family",
      },
      {
        name: 'Dad',
        birthday: "October 19th",
        anniversary: "October 1st",
        address: "6637 Apperson Dr",
        giftIdeas: "outdoor security cameras, thermos, puzzle book, socks, drone, pick box",
        notes: "Gluten free, mentioned wanting to do a girls trip soon",
        category: "family",
      }
    ],
  });

  console.log(profiles)

  process.exit();

})();
