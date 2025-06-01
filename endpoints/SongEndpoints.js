const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');

// Obtener todas las canciones
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().populate('idArtist').populate('idAlbum').populate('idUserPlaylist');
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una canción por ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('idArtist').populate('idAlbum').populate('idUserPlaylist');
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const axios = require('axios');

// Streaming proxy para canción (reproduce audio ocultando URL real)
router.get('/stream/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });

    const url = song.url;  // URL real en Cloudinary

    // Hacemos la petición como stream a Cloudinary
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'stream',
      headers: {
        // Agrega aquí headers si Cloudinary los requiere
      }
    });

    // Pasamos headers importantes para que el navegador entienda el contenido
    res.setHeader('Content-Type', response.headers['content-type']);
    if (response.headers['content-length']) {
      res.setHeader('Content-Length', response.headers['content-length']);
    }
    if (response.headers['accept-ranges']) {
      res.setHeader('Accept-Ranges', response.headers['accept-ranges']);
    }

    // Pipeamos el stream a la respuesta del cliente
    response.data.pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al reproducir la canción' });
  }
});



// Crear una nueva canción
router.post('/add', async (req, res) => {
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

    // Agregar la canción al array de canciones del álbum (si existe un álbum)
    if (req.body.idAlbum && req.body.idAlbum !== "single") {
      await Album.findByIdAndUpdate(req.body.idAlbum, {
        $push: { idSongs: newSong._id }
      });
    }

    // Agregar la canción al array de canciones de cada artista
    if (req.body.idArtist && req.body.idArtist.length > 0) {
      await Artist.updateMany(
        { _id: { $in: req.body.idArtist } },
        { $push: { idSongs: newSong._id } }
      );
    }

    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/get/random', async (req, res) => {
  try {
    const randomSongs = await Song.aggregate([
      { $sample: { size: 9 } },
      {
        $lookup: {
          from: 'artists',              // Nombre de la colección relacionada
          localField: 'idArtist',       // Campo en Song
          foreignField: '_id',          // Campo en Artist
          as: 'artistData'              // Nombre del nuevo campo con la info
        }
      },
      {
        $lookup: {
          from: 'albums',
          localField: 'idAlbum',
          foreignField: '_id',
          as: 'albumData'
        }
      }
    ]);

    res.status(200).json(randomSongs);
  } catch (error) {
    console.error('Error al obtener canciones aleatorias:', error);
    res.status(500).json({ error: 'Error al obtener canciones aleatorias' });
  }
});

router.get('/tipo/:type', async (req,res) =>{
  try{
    const {type} = req.params;
  if(!type){
    return res.status(404).json({message:"Especifica un tipo"})
  }
  const resultado = await Song.find({type: type})
  .populate('idArtist')
  
  if(!resultado){
    return res.status(404).json({message: "Tipo inexistente"})
  }

  res.status(200).json({canciones: resultado})
  } catch(error){
    res.status(500).json({error: error})
  }
})



// Actualizar una canción
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json(song);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una canción
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
