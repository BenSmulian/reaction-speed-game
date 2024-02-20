// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Lobby = require('./lobbyModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://bensmulian.github.io');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/game_lobbies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new lobby
app.post('/create-lobby', async (req, res) => {
  try {
    const { lobbyCode } = req.body;
    const newLobby = new Lobby({ lobbyCode, players: [] });
    await newLobby.save();
    res.status(201).json(newLobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Join a lobby
app.post('/join-lobby', async (req, res) => {
  try {
    const { lobbyCode, nickname } = req.body;
    const lobby = await Lobby.findOne({ lobbyCode });
    if (!lobby) {
      return res.status(404).json({ message: 'Lobby not found' });
    }
    lobby.players.push({ nickname, points: 0 });
    await lobby.save();
    res.json(lobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
