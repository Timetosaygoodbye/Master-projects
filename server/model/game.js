// Data Model for Games
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  matchid: { type: String },
  mapid: { type: String },
  team1id: { type: String },
  team2id: { type: String },
  team1player1id: { type: String },
  team1player1damage: { type: String },
  team1player1deaths: { type: String },
  team1player1eliminations: { type: String },
  team1player1healing: { type: String},
  team1player1hero1: { type: String },
  team1player1hero1damage: { type: String },
  team1player1hero1deaths: { type: String },
  team1player1hero1eliminations: { type: String },
  team1player1hero1healing: { type: String },
  team1player1hero2: { type: String },
  team1player1hero2damage: { type: String },
  team1player1hero2deaths: { type: String },
  team1player1hero2eliminations: { type: String },
  team1player1hero2healing: { type: String },
  team1player2id: { type: String },
  team1player2damage: { type: String },
  team1player2deaths: { type: String },
  team1player2eliminations: { type: String },
  team1player2healing: { type: String },
  team1player2hero1: { type: String },
  team1player2hero1damage: { type: String },
  team1player2hero1deaths: { type: String },
  team1player2hero1eliminations: { type: String },
  team1player2hero1healing: { type: String },
  team1player2hero2: { type: String },
  team1player2hero2damage: { type: String },
  team1player2hero2deaths: { type: String },
  team1player2hero2eliminations: { type: String },
  team1player2hero2healing: { type: String },
  team1player3id: { type: String },
  team1player3damage: { type: String },
  team1player3deaths: { type: String },
  team1player3eliminations: { type: String },
  team1player3healing: { type: String },
  team1player3hero1: { type: String },
  team1player3hero1damage: { type: String },
  team1player3hero1deaths: { type: String },
  team1player3hero1eliminations: { type: String },
  team1player3hero1healing: { type: String },
  team1player3hero2: { type: String },
  team1player3hero2damage: { type: String },
  team1player3hero2deaths: { type: String },
  team1player3hero2eliminations: { type: String },
  team1player3hero2healing: { type: String },
  team1player4id: { type: String },
  team1player4damage: { type: String },
  team1player4deaths: { type: String },
  team1player4eliminations: { type: String },
  team1player4healing: { type: String },
  team1player4hero1: { type: String },
  team1player4hero1damage: { type: String },
  team1player4hero1deaths: { type: String },
  team1player4hero1eliminations: { type: String },
  team1player4hero1healing: { type: String },
  team1player4hero2: { type: String },
  team1player4hero2damage: { type: String },
  team1player4hero2deaths: { type: String },
  team1player4hero2eliminations: { type: String },
  team1player4hero2healing: { type: String },
  team1player5id: { type: String },
  team1player5damage: { type: String },
  team1player5deaths: { type: String },
  team1player5eliminations: { type: String },
  team1player5healing: { type: String },
  team1player5hero1: { type: String },
  team1player5hero1damage: { type: String },
  team1player5hero1deaths: { type: String },
  team1player5hero1eliminations: { type: String },
  team1player5hero1healing: { type: String },
  team1player5hero2: { type: String },
  team1player5hero2damage: { type: String },
  team1player5hero2deaths: { type: String },
  team1player5hero2eliminations: { type: String },
  team1player5hero2healing: { type: String },
  team1player6id: { type: String },
  team1player6damage: { type: String },
  team1player6deaths: { type: String },
  team1player6eliminations: { type: String },
  team1player6healing: { type: String },
  team1player6hero1: { type: String },
  team1player6hero1damage: { type: String },
  team1player6hero1deaths: { type: String },
  team1player6hero1eliminations: { type: String },
  team1player6hero1healing: { type: String },
  team1player6hero2: { type: String },
  team1player6hero2damage: { type: String },
  team1player6hero2deaths: { type: String },
  team1player6hero2eliminations: { type: String },
  team1player6hero2healing: { type: String },
  team2player1id: { type: String },
  team2player1damage: { type: String },
  team2player1deaths: { type: String },
  team2player1eliminations: { type: String },
  team2player1healing: { type: String },
  team2player1hero1: { type: String },
  team2player1hero1damage: { type: String },
  team2player1hero1deaths: { type: String },
  team2player1hero1eliminations: { type: String },
  team2player1hero1healing: { type: String },
  team2player1hero2: { type: String },
  team2player1hero2damage: { type: String },
  team2player1hero2deaths: { type: String },
  team2player1hero2eliminations: { type: String },
  team2player1hero2healing: { type: String },
  team2player2id: { type: String },
  team2player2damage: { type: String },
  team2player2deaths: { type: String },
  team2player2eliminations: { type: String },
  team2player2healing: { type: String },
  team2player2hero1: { type: String },
  team2player2hero1damage: { type: String },
  team2player2hero1deaths: { type: String },
  team2player2hero1eliminations: { type: String },
  team2player2hero1healing: { type: String },
  team2player2hero2: { type: String },
  team2player2hero2damage: { type: String },
  team2player2hero2deaths: { type: String },
  team2player2hero2eliminations: { type: String },
  team2player2hero2healing: { type: String },
  team2player3id: { type: String },
  team2player3damage: { type: String },
  team2player3deaths: { type: String },
  team2player3eliminations: { type: String },
  team2player3healing: { type: String },
  team2player3hero1: { type: String },
  team2player3hero1damage: { type: String },
  team2player3hero1deaths: { type: String },
  team2player3hero1eliminations: { type: String },
  team2player3hero1healing: { type: String },
  team2player3hero2: { type: String },
  team2player3hero2damage: { type: String },
  team2player3hero2deaths: { type: String },
  team2player3hero2eliminations: { type: String },
  team2player3hero2healing: { type: String },
  team2player4id: { type: String },
  team2player4damage: { type: String },
  team2player4deaths: { type: String },
  team2player4eliminations: { type: String },
  team2player4healing: { type: String },
  team2player4hero1: { type: String },
  team2player4hero1damage: { type: String },
  team2player4hero1deaths: { type: String },
  team2player4hero1eliminations: { type: String },
  team2player4hero1healing: { type: String },
  team2player4hero2: { type: String },
  team2player4hero2damage: { type: String },
  team2player4hero2deaths: { type: String },
  team2player4hero2eliminations: { type: String },
  team2player4hero2healing: { type: String },
  team2player5id: { type: String },
  team2player5damage: { type: String },
  team2player5deaths: { type: String },
  team2player5eliminations: { type: String },
  team2player5healing: { type: String },
  team2player5hero1: { type: String },
  team2player5hero1damage: { type: String },
  team2player5hero1deaths: { type: String },
  team2player5hero1eliminations: { type: String },
  team2player5hero1healing: { type: String },
  team2player5hero2: { type: String },
  team2player5hero2damage: { type: String },
  team2player5hero2deaths: { type: String },
  team2player5hero2eliminations: { type: String },
  team2player5hero2healing: { type: String },
  team2player6id: { type: String },
  team2player6damage: { type: String },
  team2player6deaths: { type: String },
  team2player6eliminations: { type: String },
  team2player6healing: { type: String },
  team2player6hero1: { type: String },
  team2player6hero1damage: { type: String },
  team2player6hero1deaths: { type: String },
  team2player6hero1eliminations: { type: String },
  team2player6hero1healing: { type: String },
  team2player6hero2: { type: String },
  team2player6hero2damage: { type: String },
  team2player6hero2deaths: { type: String },
  team2player6hero2eliminations: { type: String },
  team2player6hero2healing: { type: String }
});

// Export model
module.exports = mongoose.model("game", GameSchema);
