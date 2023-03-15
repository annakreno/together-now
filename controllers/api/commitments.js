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
    //find and return profile that matches request user
    const profile = await Profile.findOne({user: req.user._id});
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function create(req, res) {
  try {
    //find profile that matches request user
    const profile = await Profile.findOne({user: req.user._id});
    // add new commitment to the commitments array on the profile
    profile.commitments.push(req.body);
    await profile.save();
    // add new commitment's id to any selected people
    const newCommitment = profile.commitments[profile.commitments.length - 1]
    if (req.body.people.length) {
      req.body.people.forEach(personId => {
        const person = profile.people.find(person => person._id == personId)
        person.commitments.push(newCommitment._id)
      })
    }
    await profile.save();
    res.json(newCommitment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function update(req, res) {
  try {
    //find profile that matches request user
    const profile = await Profile.findOne({user: req.user._id});
    //find the commitment object on the profile that the user wishes to update
    const commitment = profile.commitments.find(commitment => commitment._id == req.params.id)
    // compare initial and updated people values
    const ogPeople = commitment.people
    const newPeople = req.body.people
    //if there are new people
    if (newPeople.length !== 0) {
      // if new person is not included in og people, add the commitment id to their page
      newPeople.forEach(newPersonId => {
        if (!ogPeople.includes(newPersonId)) {
          const person = profile.people.find(person => person._id == newPersonId)
          person.commitments.push(commitment._id)
          console.log("person to add commitment id to", person)
        }
      })
    }
    // if there were og people
    if (ogPeople.length !== 0) {
      // if og person is no longer included in new people array, remove the commitment id from their page
      ogPeople.forEach(ogPersonId => {
        if (!newPeople.includes(ogPersonId.toString())) {
          const person = profile.people.find(person => person._id == ogPersonId.toString())
          console.log("person to remove this commitment from", person)
          person.commitments.remove(commitment._id);
        }
      })
    }
    // update commitment properties with form values
    commitment.name = req.body.name
    commitment.start = req.body.start
    commitment.end = req.body.end
    commitment.people = req.body.people
    commitment.location = req.body.location
    commitment.notes = req.body.notes
    commitment.flexible = req.body.flexible
    commitment.people = req.body.people
    await profile.save();
    res.json(commitment)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


async function deleteOne(req, res) {
  try {
    //find and return profile that matches request user
    const profile = await Profile.findOne({user: req.user._id});
    // remove specified commitment from the profile
    profile.commitments.remove(req.params.id);
    // also remove commitment from any associated people's commitments list
    profile.people.forEach(person => {
      if (person.commitments.includes(req.params.id)) {
        person.commitments.remove(req.params.id);
      }
    })
    profile.save();
    res.json(profile)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

