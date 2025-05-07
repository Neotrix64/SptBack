const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idUser: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: false }],
  albumCover: {type: String, required: false},
  creationDate: { type: Date, default: Date.now, required: false }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
