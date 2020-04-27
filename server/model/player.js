// Data Model for Players
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema(
  {
    playerid: {type: String},
    teamid: {type: String},
    role :{type: String},
    name: {type: String},    
    team:{type: String},
    eliminations_avg_per_10m:{type: String},
    deaths_avg_per_10m:{type: String},
    hero_damage_avg_per_10m:{type: String},
    healing_avg_per_10m:{type: String},
    ultimates_earned_avg_per_10m:{type: String},
    final_blows_avg_per_10m:{type: String},
    time_played_total:{type: String},
    realname:{type: String},
    number:{type: String},
    headshot:{type: String},
    homeLocation:{type: String}
  }
);

// Export model
module.exports = mongoose.model("player", PlayerSchema);
