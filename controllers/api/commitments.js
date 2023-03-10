const User = require('../../models/user')
const Profile = require('../../models/profile');


module.exports = {
  index,
  create,
};

async function index(req, res) {
  const profile = await Profile.findById('640a4d36e30bc1f22f2b5348');
  res.json(profile);
}


async function create(req, res) {
  try {
    const profile = await Profile.findById('640a4d36e30bc1f22f2b5348');
    profile.commitments.push(req.body);
    await profile.save();
    res.json(profile.commitments[profile.commitments.length - 1]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
