const User = require('../../models/user')
const Profile = require('../../models/profile');


module.exports = {
  index,
  create,
  update,
  delete: deleteOne
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
  try {
    const profile = await Profile.findOne({user: req.user._id});
    let commitment = profile.commitments.find(commitment => commitment._id == req.params.id)
    commitment.name = req.body.name
    commitment.start = req.body.start
    commitment.end = req.body.end
    commitment.people = req.body.people
    commitment.location = req.body.location
    commitment.notes = req.body.notes
    commitment.flexible = req.body.flexible
    console.log("commitment:", commitment)
    await profile.save();
    res.json(commitment)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


async function deleteOne(req, res) {
  try {
    const profile = await Profile.findOne({user: req.user._id});
    // let commitment = profile.commitments.find(commitment => commitment._id == req.params.id)
    profile.commitments.remove(req.params.id);
    profile.save();
    res.json("commitment deleted")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

