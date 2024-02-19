// lobbyModel.js

const mongoose = require('mongoose');

const lobbySchema = new mongoose.Schema({
  lobbyCode: {
    type: Number,
    required: true,
    unique: true,
  },
  players: [{
    nickname: String,
    points: Number,
  }],
});

module.exports = mongoose.model('Lobby', lobbySchema);
