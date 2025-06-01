const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist')
const Song = require('../models/Song');

// Obtener todas las playlists
router.get('/get/all', async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('idSongs')
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una playlist por ID
router.get('/get/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
    if (!playlist) return res.status(404).json({ message: 'Playlist no encontrada' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva playlist
router.post('/add', async (req, res) => {
  const playlist = new Playlist({
    name: req.body.name,
    idUser: req.body.idUser || [],
    idSongs: req.body.idSongs || [],
    description: req.body.description || '',
    albumCover: req.body.albumCover || '',
    creationDate: req.body.creationDate || Date.now()
  });

  try {
    const newPlaylist = await playlist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Actualizar una playlist
router.put('/update/:id', async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlaylist) return res.status(404).json({ message: 'Playlist no encontrada' });
    res.json(updatedPlaylist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una playlist
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
    if (!deletedPlaylist) return res.status(404).json({ message: 'Playlist no encontrada' });
    res.json({ message: 'Playlist eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//agregar una cancion a una playlist y tambien hacerle push 

router.post('/add-song/:playlistId', async (req, res) => {
  const { songId } = req.body;

  try {
    // Verifica si la playlist existe
    const playlist = await Playlist.findById(req.params.playlistId);
    if (!playlist) return res.status(404).json({ message: 'Playlist no encontrada' });

    // Verifica si la canción existe
    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });

    // Verifica si la canción ya está en la playlist
    if (playlist.idSongs.includes(songId)) {
      return res.status(400).json({ message: 'La canción ya está en la playlist' });
    }

    // Agrega la canción a la playlist
    playlist.idSongs.push(songId);
    await playlist.save();

    song.idUserPlaylists.push(playlist._id)
    await song.save();

    res.json({ message: 'Canción agregada a la playlist', playlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Mostrar todas las playlist de un usuario por ID

router.get('/user/:userId', async (req, res) => {
  try {
    const playlists = await Playlist.find({ idUser: req.params.userId }).populate('idUser');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
