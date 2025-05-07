const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idArtist: { type: mongoose.SchemaTypes.ObjectId, ref: 'Artist', required: true },
  idSongs: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Song', required: false }],
  albumCover: {type: String, required: false},
  releaseDate: { type: Date, default: Date.now, required: false }
});

module.exports = mongoose.model('Album', AlbumSchema);
