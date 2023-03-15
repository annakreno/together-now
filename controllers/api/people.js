const User = require('../../models/user')
const Profile = require('../../models/profile');
const profile = require('../../models/profile');


module.exports = {
  create,
  update,
  delete: deleteOne
};

async function create(req, res) {
  try {
    //find profile that matches request user
    const profile = await Profile.findOne({user: req.user._id});
    // add new person to the people array on the profile
    profile.people.push(req.body);
    await profile.save();
    //add new person's id to any selected commitments
    const newPerson = profile.people[profile.people.length - 1]
    if (req.body.commitments.length) {
      req.body.commitments.forEach(commitmentId => {
        const commitment = profile.commitments.find(commitment => commitment._id = commitmentId)
        commitment.people.push(newPerson._id)
      })
    }
    await profile.save();
    res.json(newPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


async function update(req, res) {
  try {
    //find profile that matches request user
    const profile = await Profile.findOne({user: req.user._id});
    //find the person object on the profile that the user wishes to update
    const person = profile.people.find(person => person._id == req.params.id)
    // compare initial and updated commitment values
    const ogCommitments = person.commitments
    const newCommitments = req.body.commitments
    // if there are new commitments
    if (newCommitments.length !== 0) {
      // if each new commitment was not already included in og commitments, add the person id to the commitment page
      newCommitments.forEach(newCommitmentId => {
        if (!ogCommitments.includes(newCommitmentId)) {
          const commitment = profile.commitments.find(commitment => commitment._id == newCommitmentId)
          commitment.people.push(person._id)
          console.log("commitment to add the person id to", commitment)
        }
      })
    }
    //if there were og commitments
    if (ogCommitments.length !== 0) {
      // and if og commitment is no longer included in the new commitments array, remove the person id from the og commitment page
      ogCommitments.forEach(ogCommitmentId => {
        if (!newCommitments.includes(ogCommitmentId.toString())) {
          const commitment = profile.commitments.find(commitment => commitment._id == ogCommitmentId.toString())
          console.log("commitment to remove this person from", commitment)
          commitment.people.remove(person._id)
        }
      })
    }
    
    // update person properties with form values
    person.name = req.body.name
    person.commitments = req.body.commitments
    person.birthday = req.body.birthday
    person.anniversary = req.body.anniversary
    person.address = req.body.address
    person.giftIdeas = req.body.giftIdeas
    person.notes = req.body.notes
    person.category = req.body.category
    await profile.save();
    res.json(person)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


async function deleteOne(req, res) {
  try {
    //find and return profile that matches request user
    const profile = await Profile.findOne({user: req.user._id});
    // if person had associated commitments, remove them from those commitments
    const person = profile.people.find(person => person._id == req.params.id)
    if (person.commitments.length !== 0) {
      profile.commitments.forEach(commitment => {
        if (commitment.people.includes(req.params.id)) {
          commitment.people.remove(req.params.id);
        }
      })
    }
    //remove person from the profile
    profile.people.remove(req.params.id);
    profile.save();
    res.json(profile)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

