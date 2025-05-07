const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idUser: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: false }],
  albumCover: {type: String, required: false},
  releaseDate: {type: Date.now(), required: true},
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
