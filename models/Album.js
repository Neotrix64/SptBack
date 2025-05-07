const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idArtist: { type: mongoose.SchemaTypes.ObjectId, ref: 'Artist', required: true },
  idSongs: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Song', required: true }],
  url: { type: String, required: true, unique: true},
  albumCover: {type: String, required: false},
  createDate: {type: Date.now(), required: false}
});

module.exports = mongoose.model('Album', AlbumSchema);
