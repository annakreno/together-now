const Commitment = require('../../models/commitment');

module.exports = {
  index,
};

async function index(req, res) {
  const commitments = await Commitment.find({});
  res.json(commitments);
  
}
