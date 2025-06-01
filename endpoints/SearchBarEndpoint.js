const express = require("express");
const app = express();
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Song = require("../models/Song");

app.get("/", async (req, res) => {
  try {
    const album = await Album.find().populate('idArtist').populate('idSongs')
    const artist = await Artist.find().populate('idAlbum').populate('idSongs')
    const song = await Song.find().populate('idArtist').populate('idAlbum')

    res.status(200).json({ albums: album, artistas: artist, song: song });
  } catch (err) {
    console.log("Hubo un error" + err);
  }
});

module.exports = app;
