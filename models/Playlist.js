const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idUser: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: false }],
  idSongs: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Song', required: false}],
  description: { type: String, required: false },
  albumCover: { type: String, required: false },
  playlistBanner: { type: String, required: false },
  creationDate: { type: Date, default: Date.now, required: false }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
