const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

router.get("/artist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID no especificada" });
    }

    const [artista, canciones, albums] = await Promise.all([
      Artist.findById(id),
      Song.find({ idArtist: id }).limit(5).populate('idArtist'),
      Album.find({ idArtist: id }).limit(6)
    ]);

    if (!artista) {
      return res.status(404).json({ message: "Artista inexistente" });
    }

    res.status(200).json({ canciones, albums });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor: " + err.message });
  }
});


module.exports = router;