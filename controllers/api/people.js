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
        console.log("each commitment selected during create", commitment)
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
    //for each new commitment, check if it already exists in og commitments
    let addAcuumulator = newCommitments.length
    newCommitments.forEach(newCommitmentId => {
      if (ogCommitments.includes(newCommitmentId)) 
      addAcuumulator -= 1
    })
    //for each old commitment, check if it's present in the new commitments
    let subtractAcuumulator = ogCommitments.length
    ogCommitments.forEach(ogCommitmentId => {
      if (newCommitments.includes(ogCommitmentId))
      subtractAcuumulator -= 1
    })
    // if addition, find added commitments and add person id to their commitment pages
    if (addAcuumulator > 0) {
      newCommitments.forEach(newCommitmentId => {
        if (!ogCommitments.includes(newCommitmentId)) {
          const commitment = profile.commitments.find(commitment => commitment._id == newCommitmentId)
          commitment.people.push(person._id)
        }
      })
    }
    // if subtraction, find removed commitments and remove person id from their commitment pages
    if (subtractAcuumulator > 0) {
      ogCommitments.forEach(ogCommitmentId => {
        if (!newCommitments.includes(ogCommitmentId)) {
          const commitment = profile.commitments.find(commitment => commitment._id == ogCommitmentId)
          commitment.people.remove(person._id);
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
    //remove specified person from the profile
    profile.people.remove(req.params.id);
    // also remove person from any associated commitments' people list
    profile.commitments.forEach(commitment => {
      if (commitment.people.includes(req.params.id)) {
        commitment.people.remove(req.params.id);
      }
    })
    profile.save();
    res.json("person deleted")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

