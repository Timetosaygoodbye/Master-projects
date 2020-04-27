// Data Model for Matches
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema(
  {
    id: {type: String},
    date: {type: String},
    week: {type: String},
    stageid: {type: String},
    weekid: {type: String},
    timestamp :{type: String},
    team1: {type: String},    
    team1id:{type: String},
    team2:{type: String},
    team2id:{type: String},
    team1Score:{type: String},
    team2Score:{type: String},
    gameid1:{type: String},
    gameid2:{type: String},
    gameid3:{type: String},
    gameid4: {type: String},
    gameid5: {type: String},
    map1: {type: String},
    map2: {type: String},
    map3: {type: String},
    map4: {type: String},
    map5: {type: String},
    team1playerid1: {type: String},
    team1playerid2: {type: String},
    team1playerid3: {type: String},
    team1playerid4: {type: String},
    team1playerid5: {type: String},
    team1playerid6: {type: String},
    team1playerid7: {type: String},
    team1playerid8: {type: String},
    team1playerid9: {type: String},
    team1playerid10: {type: String},
    team2playerid1: {type: String},
    team2playerid2: {type: String},
    team2playerid3: {type: String},
    team2playerid4: {type: String},
    team2playerid5: {type: String},
    team2playerid6: {type: String},
    team2playerid7: {type: String},
    team2playerid8: {type: String},
    team2playerid9: {type: String},
    team2playerid10: {type: String}
  }
);

// Export model
module.exports = mongoose.model("match", MatchSchema);
