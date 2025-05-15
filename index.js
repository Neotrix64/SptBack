const express = require('express');
const app = express();
const { mongoConnection } = require('./DB');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
const ArtistEndpoint = require('./endpoints/ArtistEndpoints')
const AlbumEndpoint = require('./endpoints/AlbumEndpoints')
const SongEndpoint = require('./endpoints/SongEndpoints')


mongoConnection(process.env.MONGODB_CONNECTION);

app.use(cors({
  origin: '*'
}))


app.use(express.json());


app.use('/Artist', ArtistEndpoint);
app.use('/Album', AlbumEndpoint)
app.use('/Song', SongEndpoint)

app.get('/', (req,res) =>{
    res.send('Hola mundo')
})

app.listen(port, () =>{
    console.log("Escuchando en el puerto", port);
})