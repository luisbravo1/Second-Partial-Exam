const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */
const sportsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  num_players: {
    type: Number,
    required: true
  }
});

const sportsCollection = mongoose.model('sports', sportsSchema);

const Sports = {
  createSport(newSport) {
    return sportsCollection
      .create(newSport)
      .then(createdSport => {
        return createdSport;
      })
      .catch(err => {
        return err;
      })
  },
  deleteSport(id) {
    return sportsCollection
      .deleteOne(id)
      .then(deletedSport => {
        return deletedSport;
      })
      .catch(err => {
        return err;
      })
  }
}

module.exports = {
    Sports
};