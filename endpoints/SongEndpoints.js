const express = require('express');
const router = express.Router();
const Song = require('../models/Song'); // ajusta el path si es necesario

// ✅ Obtener todas las canciones
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().populate('idArtist').populate('idAlbum').populate('idUserPlaylist');
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Obtener una canción por ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('idArtist').populate('idAlbum').populate('idUserPlaylist');
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Crear una nueva canción
router.post('/', async (req, res) => {
  const song = new Song({
    name: req.body.name,
    type: req.body.type,
    idArtist: req.body.idArtist,
    idAlbum: req.body.idAlbum,
    idUserPlaylist: req.body.idUserPlaylist,
    url: req.body.url,
    albumCover: req.body.albumCover,
    releaseDate: req.body.releaseDate,
  });

  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Actualizar una canción
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json(song);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Eliminar una canción
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json({ message: 'Canción eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
