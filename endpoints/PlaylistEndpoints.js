const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist')

// ✅ Obtener todas las playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('idUser');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Obtener una playlist por ID
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('idUser');
    if (!playlist) return res.status(404).json({ message: 'Playlist no encontrada' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Crear una nueva playlist
router.post('/', async (req, res) => {
  const playlist = new Playlist({
    name: req.body.name,
    idUser: req.body.idUser,
    albumCover: req.body.albumCover,
    releaseDate: req.body.releaseDate,
  });

  try {
    const newPlaylist = await playlist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Actualizar una playlist
router.put('/:id', async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlaylist) return res.status(404).json({ message: 'Playlist no encontrada' });
    res.json(updatedPlaylist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Eliminar una playlist
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
    if (!deletedPlaylist) return res.status(404).json({ message: 'Playlist no encontrada' });
    res.json({ message: 'Playlist eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
