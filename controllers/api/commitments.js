const User = require('../../models/user')
const Profile = require('../../models/profile');


module.exports = {
  index,
  create,
  update,
};

async function index(req, res) {
  try {
    const profile = await Profile.findOne({user: req.user._id});
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


async function create(req, res) {
  try {
    const profile = await Profile.findOne({user: req.user._id});
    profile.commitments.push(req.body);
    await profile.save();
    res.json(profile.commitments[profile.commitments.length - 1]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function update(req, res) {
  const reqObj = {
    name: req.body.name,
    start: req.body.start, 
    end: req.body.end, 
    people: req.body.people, 
    location: req.body.location, 
    notes: req.body.notes, 
    flexible: req.body.flexible,
  };
  try {
    const profile = await Profile.findOne({user: req.user._id});
    const commitment = profile.commitments.find(commitment => commitment._id == req.params.id)
    console.log("commitment:", commitment)
    await profile.save();
    res.json(commitment)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

