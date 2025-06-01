const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {type: String, required: false},
  idArtist: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Artist', required: true }],
  idAlbum: { type: mongoose.SchemaTypes.ObjectId, ref: 'Album', required: false, default: null},
  idUserPlaylists: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Playlist' }],
  url: { type: String, required: true, unique: true},
  albumCover: {type: String, required: false},
  releaseDate: { type: Date, default: Date.now, required: false }
});

module.exports = mongoose.model('Song', SongSchema);