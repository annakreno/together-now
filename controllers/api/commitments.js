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
    res.json(profile.commitments[profile.commitments.length - 1]);
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
    //for each new person, check if it already exists in og people
    let addAcuumulator = newPeople.length
    newPeople.forEach(newPersonId => {
      if (ogPeople.includes(newPersonId))
      addAcuumulator -= 1
    })
    // for each og person, check to see whether it's present in new people
    let subtractAcuumulator = ogPeople.length
    ogPeople.forEach(ogPersonId => {
      if (newPeople.includes(ogPersonId))
      subtractAcuumulator -= 1
    })
    // if addition, find added people and add commitment id to their page
    if (addAcuumulator > 0) {
      newPeople.forEach(newPersonId => {
        if (!ogPerson.includes(newPersonId)) {
          const person = profile.people.find(person => person._id == newPersonId)
          person.commitments.push(commitment._id)
        }
      })
    }
    // if subtraction, find removed people and remove commitment id from their page
    if (subtractAcuumulator > 0) {
      ogPeople.forEach(ogPersonId => {
        if (!newPeople.includes(ogPersonId)) {
          const person = profile.people.find(person => person._id == ogPersonId)
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
    if (commitment.people) {
      commitment.people.forEach(personId => {
        const person = profile.people.findById(personId)
        console.log(person)
        if (!person.commitments.includes(commitment._id)) {
          person.commitments.push(commitment._id)}
      })
    }
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
    res.json("commitment deleted")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

