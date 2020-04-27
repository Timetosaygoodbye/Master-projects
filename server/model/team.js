// Data Model for Teams
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
{
  id: { type: String },
  rank: { type: String },
  stage1ranking: { type: String }, 
  stage2ranking: { type: String },
  stage3ranking: { type: String },
  stage4ranking: { type: String },
  name: { type: String },
  abbreviatedName: { type: String },
  divisionId: { type: String },
  div: { type: String },
  location: { type: String },
  stage1win: { type: String },
  stage1lose: { type: String },
  stage1mapwin: { type: String },
  stage1maplose: { type: String },
  stage1maptie: { type: String },
  stage1points: { type: String },
  stage2win: { type: String },
  stage2lose: { type: String },
  stage2mapwin: { type: String },
  stage2maplose: { type: String },
  stage2maptie: { type: String },
  stage2points: { type: String },
  stage3win: { type: String },
  stage3lose: { type: String },
  stage3mapwin: { type: String },
  stage3maplose: { type: String },
  stage3maptie: { type: String },
  stage3points: { type: String },
  stage4win: { type: String },
  stage4lose: { type: String },
  stage4mapwin: { type: String },
  stage4maplose: { type: String },
  stage4maptie: { type: String },
  stage4points: { type: String },
  totalwin: { type: String },
  totallose: { type: String },
  totalmapwin: { type: String },
  totalmaplose: { type: String },
  totalmaptie: { type: String },
  totalpoints: { type: String },
  logo: { type: String },
  mainName: { type: String }
});

// Export model
module.exports = mongoose.model("team", TeamSchema);
