const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist'); // Ajusta la ruta si es necesario

// ✅ Obtener todos los artistas
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find()
      .populate('idAlbum')
      .populate('idSongs');
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Obtener un artista por ID
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)
      .populate('idAlbum')
      .populate('idSongs');
    if (!artist) return res.status(404).json({ message: 'Artista no encontrado' });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Crear un nuevo artista
router.post('/add', async (req, res) => {
    const artist = new Artist({
      name: req.body.name,
      profilePicture: req.body.profilePicture,
      banner: req.body.banner,
      idAlbum: req.body.idAlbum,
      idSongs: req.body.idSongs,
      monthListeners: req.body.monthListeners 
    });
  
    try {
      const newArtist = await artist.save();
      res.status(201).json(newArtist);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // ✅ Actualizar solo los listeners del artista
router.patch('/:id/monthListeners', async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id);
      if (!artist) return res.status(404).json({ message: 'Artista no encontrado' });
  
      artist.monthListeners = req.body.monthListeners;
      await artist.save();
  
      res.json({ message: 'Listeners actualizados', monthListeners: artist.monthListeners });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  

// ✅ Actualizar un artista
router.put('/:id', async (req, res) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtist) return res.status(404).json({ message: 'Artista no encontrado' });
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Eliminar un artista
router.delete('/:id', async (req, res) => {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
    if (!deletedArtist) return res.status(404).json({ message: 'Artista no encontrado' });
    res.json({ message: 'Artista eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Obtener todas las canciones de un artista
router.get('/:id/songs', async (req, res) => {
    try {
      const artist = await Artist.findById(req.params.id).populate('idSongs');
      if (!artist) return res.status(404).json({ message: 'Artista no encontrado' });
      res.json(artist.idSongs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // ✅ Agregar una canción a un artista
  router.post('/:id/add-song', async (req, res) => {
    const { songId } = req.body;
  
    try {
      const artist = await Artist.findById(req.params.id);
      if (!artist) return res.status(404).json({ message: 'Artista no encontrado' });
  
      if (!artist.idSongs.includes(songId)) {
        artist.idSongs.push(songId);
        await artist.save();
      }
  
      res.json({ message: 'Canción agregada al artista', artist });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // ✅ Agregar un álbum a un artista
  router.post('/:id/add-album', async (req, res) => {
    const { albumId } = req.body;
  
    try {
      const artist = await Artist.findById(req.params.id);
      if (!artist) return res.status(404).json({ message: 'Artista no encontrado' });
  
      if (!artist.idAlbum.includes(albumId)) {
        artist.idAlbum.push(albumId);
        await artist.save();
      }
  
      res.json({ message: 'Álbum agregado al artista', artist });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;
