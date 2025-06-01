const express = require('express');
const app = express();
const { mongoConnection } = require('./DB');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
const morgan = require('morgan');
const ArtistEndpoint = require('./endpoints/ArtistEndpoints')
const AlbumEndpoint = require('./endpoints/AlbumEndpoints')
const SongEndpoint = require('./endpoints/SongEndpoints');
const PlaylistEndpoint = require('./endpoints/PlaylistEndpoints');
const SearchBarEndpoint = require('./endpoints/SearchBarEndpoint')


mongoConnection(process.env.MONGODB_CONNECTION);

app.use(cors({
  origin: '*'
}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());


app.use('/Artist', ArtistEndpoint);
app.use('/Album', AlbumEndpoint)
app.use('/Song', SongEndpoint)
app.use('/Playlist', PlaylistEndpoint)
app.use('/busqueda', SearchBarEndpoint)

app.get('/', (req,res) =>{
    res.send('Hola mundo')
})

app.listen(port, () =>{
    console.log("Escuchando en el puerto", port);
})