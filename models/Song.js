const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {type: String, required: true},
  idArtist: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Artist', required: true }],
  idAlbum: { type: mongoose.SchemaTypes.ObjectId, ref: 'Album', required: false, default: "single"},
  idUserPlaylist: {type: mongoose.SchemaTypes.ObjectId, ref: 'Playlist', required: false},
  url: { type: String, required: true, unique: true},
  albumCover: {type: String, required: false},
  releaseDate: {type: Date.now(), required: true},
});

module.exports = mongoose.model('Song', SongSchema);
