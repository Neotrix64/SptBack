const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const Song = require('../models/Song');

// Obtener todos los álbumes
router.get('/get', async (req, res) => {
  try {
    const albums = await Album.find()
      .populate('idArtist')
      .populate('idSongs');
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un álbum por ID
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
      .populate('idArtist')
      .populate('idSongs');
    if (!album) return res.status(404).json({ message: 'Álbum no encontrado' });
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo álbum
router.post('/add', async (req, res) => {
  const album = new Album({
    name: req.body.name,
    idArtist: req.body.idArtist,
    idSongs: req.body.idSongs,
    albumCover: req.body.albumCover
  });

  try {
    const newAlbum = await album.save();
    res.status(201).json(newAlbum);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un álbum
router.put('/:id', async (req, res) => {
  try {
    const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAlbum) return res.status(404).json({ message: 'Álbum no encontrado' });
    res.json(updatedAlbum);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un álbum
router.delete('/:id', async (req, res) => {
  try {
    const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
    if (!deletedAlbum) return res.status(404).json({ message: 'Álbum no encontrado' });
    res.json({ message: 'Álbum eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener canciones de un álbum
router.get('/:id/songs', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('idSongs');
    if (!album) return res.status(404).json({ message: 'Álbum no encontrado' });
    res.json(album.idSongs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar canción a un álbum
router.post('/:id/add-song', async (req, res) => {
  const { songId } = req.body;

  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Álbum no encontrado' });

    if (!album.idSongs.includes(songId)) {
      album.idSongs.push(songId);
      await album.save();
    }

    res.json({ message: 'Canción agregada al álbum', album });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una canción de un álbum
router.delete('/:albumId/remove-song/:songId', async (req, res) => {
  try {
    const { albumId, songId } = req.params;

    const album = await Album.findById(albumId);
    if (!album) return res.status(404).json({ message: 'Álbum no encontrado' });

    const originalLength = album.idSongs.length;
    album.idSongs = album.idSongs.filter(id => id.toString() !== songId);

    if (album.idSongs.length === originalLength) {
      return res.status(404).json({ message: 'Canción no encontrada en el álbum' });
    }

    await album.save();
    res.json({ message: 'Canción eliminada del álbum', album });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
