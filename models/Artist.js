const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePicture: {type: String, required: true},
  banner: { type: String, required: true },
  idAlbum: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Album', required: false, default: "single"}],
  idSongs: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Song', required: false }],
  monthListeners: { type: String, required: true, default: 0}
});

module.exports = mongoose.model('Artist', ArtistSchema);
