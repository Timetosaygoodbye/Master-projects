const express = require("express");
const api = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//import data models
const Player = require("../model/player");
const Team = require("../model/team");
const Match = require("../model/match");
const Game = require("../model/game");
const User = require("../model/user");
//api.get("/", function (req, res) {
//    res.send("Welcome to OWL API");
//})
async function auth(req, res) {
  let tmp = 0;
  if (await User.exists({ key: req.body.key })) {
    await User.findOne({ key: req.body.key }, function(err, user) {
      if (user.usergroup != "admin") {
        tmp = 0;
      } else {
        tmp = 1;
      }
    });
  } else {
    tmp = 0;
  }
  return tmp;
}

async function auth_user(req, res) {
  let tmp = 0;
  if (await User.exists({ key: req.body.key })) {
    await User.findOne({ key: req.body.key }, function(err, user) {
      if (user.usergroup != "user") {
        tmp = 0;
      } else {
        tmp = 1;
      }
    });
  } else {
    tmp = 0;
  }
  return tmp;
}

api.get("/guest", function(req, res) {
  User.findOne({ username: "guest" }, function(err, user) {
    res.json(user);
  });
});

//login
api.post("/login", async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (await User.exists({ username: username, password: password })) {
    User.findOne({ username: username, password: password }, function(
      err,
      user
    ) {
      let info = {
        key: user.key,
        email: user.email,
        usergroup: user.usergroup
      };
      res.status(200).send(info);
    });
  } else {
    res
      .status(401)
      .send("Sorry, there is something wrong with username or password.");
  }
});

//register
api.post("/register", async function(req, res) {
  let username = req.body.username;
  if (await User.exists({ username: username })) {
    res.status(409).send("User already exists.");
  } else {
    let password = req.body.password;
    let email = req.body.email;
    let timestamp = Date.now();
    let info = username + password + timestamp;
    let md5 = crypto.createHash("md5");
    let key = md5.update(info).digest("hex");
    let newuser = new User({
      username: username,
      password: password,
      key: key,
      usergroup: "user",
      email: email
    });
    newuser.save();
    res.status(201).send("Create success.");
  }
});


//edit password
api.put("/register", async function(req, res) {
  if ((await auth(req, res)) == 0 && (await auth_user(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    let newpassword = req.body.password;
      User.findOne({ key: req.body.key }, function(err, user) {
        user.password= newpassword;
        let username=user.username;
        let timestamp = Date.now();
        let info = username + newpassword + timestamp;
        let md5 = crypto.createHash("md5");
        let newkey = md5.update(info).digest("hex");
        user.key=newkey;
        user.save();
        res.status(201).send({key:newkey});
      });
    
  }
});

//display all player data
api.get("/player", function(req, res) {
  Player.find({}, function(err, player_list) {
    res.json(player_list);
  });
});

// RETRIEVE a specific player
api.get("/player/:playerId", function(req, res) {
  Player.find({ playerid: req.params.playerId }, function(err, player) {
    res.json(player);
  });
});

//CREATE
api.post("/player", async function(req, res) {
  if ((await auth(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    let player = new Player(req.body);
    player.save();
    res.status(201).send(player);
  }
});

//UPDATE
api.put("/player/:playerId", async function(req, res) {
  if ((await auth(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    Player.findOne({ playerid: req.params.playerId }, function(err, player) {
      if(req.body.playerid){
        player.playerid = req.body.playerid;
      }
      if(req.body.teamid){
        player.teamid = req.body.teamid;
      }
      if(req.body.role){
        player.role = req.body.role;
      }
      if(req.body.name){
        player.name = req.body.name;
      }
      if(req.body.team){
        player.team = req.body.team;
      }
      if(req.body.eliminations_avg_per_10m){
        player.eliminations_avg_per_10m = req.body.eliminations_avg_per_10m;
      }
      if(req.body.deaths_avg_per_10m){
        player.deaths_avg_per_10m = req.body.deaths_avg_per_10m;
      }
      if(req.body.hero_damage_avg_per_10m){
        player.hero_damage_avg_per_10m = req.body.hero_damage_avg_per_10m;
      }
      if(req.body.healing_avg_per_10m){
        player.healing_avg_per_10m = req.body.healing_avg_per_10m;
      }
      if(req.body.ultimates_earned_avg_per_10m){
        player.ultimates_earned_avg_per_10m =
        req.body.ultimates_earned_avg_per_10m;
      }
      if(req.body.final_blows_avg_per_10m){
        player.final_blows_avg_per_10m = req.body.final_blows_avg_per_10m;
      }
      if(req.body.time_played_total){
        player.time_played_total = req.body.time_played_total;
      }
      if(req.body.realname){
        player.realname = req.body.realname;
      }
      if(req.body.number){
        player.number = req.body.number;
      }
      if(req.body.headshot){
        player.headshot = req.body.headshot;
      }
      if(req.body.homeLocation){
        player.homeLocation = req.body.homeLocation;
      }
      player.save();
      res.json(player);
    });
  }
});

//DELETE
api.delete("/player/:playerId", async function(req, res) {
  if ((await auth(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    Player.remove({ playerid: req.params.playerId }, function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("removed");
      }
    });
  }
});

//DELETE ALL
api.delete("/player", async function(req, res) {
  if ((await auth(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    Player.remove({}, function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("removed");
      }
    });
  }
});

//display all team data
api.get("/team", function(req, res) {
  Team.find({}, function(err, team_list) {
    res.json(team_list);
  });
});

// RETRIEVE a specific team
api.get("/team/:teamId", function(req, res) {
  Team.find({ id: req.params.teamId }, function(err, team) {
    res.json(team);
  });
});

//CREATE
api.post("/team", async function(req, res) {
  if ((await auth(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    let team = new Team(req.body);
    team.save();
    res.status(201).send(team);
  }
});

//UPDATE
api.put("/team/:teamId", async function(req, res) {
  if ((await auth(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    Team.findOne({ id: req.params.teamId }, function(err, team) {
      if(req.body.id){
        team.id = req.body.id;
      }
      if(req.body.name){
        team.name = req.body.name;
      }
      if(req.body.abbreviatedName){
        team.abbreviatedName = req.body.abbreviatedName;
      }
      if(req.body.divisionId){
        team.divisionId = req.body.divisionId;
      }
      if(req.body.div){
        team.div = req.body.div;
      }
      if(req.body.location){
        team.location = req.body.location;
      }
      if(req.body.stage1win){
        team.stage1win = req.body.stage1win;
      }
      if(req.body.stage1lose){
        team.stage1lose = req.body.stage1lose;
      }
      if(req.body.stage1mapwin){
        team.stage1mapwin = req.body.stage1mapwin;
      }
      if(req.body.stage1maplose){
        team.stage1maplose = req.body.stage1maplose;
      }
      if(req.body.stage1maptie){
        team.stage1maptie = req.body.stage1maptie;
      }
      if(req.body.stage1points){
        team.stage1points = req.body.stage1points;
      }
      
      if(req.body.stage2win){
        team.stage2win = req.body.stage2win;
      }
      if(req.body.stage2lose){
        team.stage2lose = req.body.stage2lose;
      }
      if(req.body.stage2mapwin){
        team.stage2mapwin = req.body.stage2mapwin;
      }
      if(req.body.stage2maplose){
        team.stage2maplose = req.body.stage2maplose;
      }
      if(req.body.stage2maptie){
        team.stage2maptie = req.body.stage2maptie;
      }
      if(req.body.stage2points){
        team.stage2points = req.body.stage2points;
      }
      
      if(req.body.stage3win){
        team.stage3win = req.body.stage3win;
      }
      if(req.body.stage3lose){
        team.stage3lose = req.body.stage3lose;
      }
      if(req.body.stage3mapwin){
        team.stage3mapwin = req.body.stage3mapwin;
      }
      if(req.body.stage3maplose){
        team.stage3maplose = req.body.stage3maplose;
      }
      if(req.body.stage3maptie){
        team.stage3maptie = req.body.stage3maptie;
      }
      if(req.body.stage3points){
        team.stage3points = req.body.stage3points;
      }
      
      if(req.body.stage4win){
        team.stage4win = req.body.stage4win;
      }
      if(req.body.stage4lose){
        team.stage4lose = req.body.stage4lose;
      }
      if(req.body.stage4mapwin){
        team.stage4mapwin = req.body.stage4mapwin;
      }
      if(req.body.stage4maplose){
        team.stage4maplose = req.body.stage4maplose;
      }
      if(req.body.stage4maptie){
        team.stage4maptie = req.body.stage4maptie;
      }
      if(req.body.stage4points){
        team.stage4points = req.body.stage4points;
      }
      
      if(req.body.totalwin){
        team.totalwin = req.body.totalwin;
      }
      if(req.body.totallose){
        team.totallose = req.body.totallose;
      }
      if(req.body.totalmapwin){
        team.totalmapwin = req.body.totalmapwin;
      }
      if(req.body.totalmaplose){
        team.totalmaplose = req.body.totalmaplose;
      }
      if(req.body.totalmaptie){
        team.totalmaptie = req.body.totalmaptie;
      }
      if(req.body.totalpoints){
        team.totalpoints = req.body.totalpoints;
      }
      if(req.body.logo){
        team.logo = req.body.logo;
      }
      if(req.body.mainName){
        team.mainName = req.body.mainName;
      }
      if(req.body.stage1ranking){
        team.stage1ranking = req.body.stage1ranking;
      }
      if(req.body.stage2ranking){
        team.stage2ranking = req.body.stage2ranking;
      }
      if(req.body.stage3ranking){
        team.stage3ranking = req.body.stage3ranking;
      }
      if(req.body.stage4ranking){
        team.stage4ranking = req.body.stage4ranking;
      }
      if(req.body.rank){
        team.rank = req.body.rank;
      }
      
      team.save();
      res.json(team);
    });
  }
});

//DELETE
api.delete("/team/:teamId", async function(req, res) {
  if ((await auth(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    Team.remove({ id: req.params.teamId }, function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("removed");
      }
    });
  }
});

//DELETE ALL
api.delete("/team", async function(req, res) {
  if ((await auth(req, res)) == 0) {
    res.status(403).send("Sorry, access denied.");
  } else {
    Team.remove({}, function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("removed");
      }
    });
  }
});

//display all match data
api.get("/match", function(req, res) {
  Match.find({}, function(err, match_list) {
    res.json(match_list);
  });
});

//display  match data of specific stage and week
api.get("/match/:stageId/:weekId", function(req, res) {
  Match.find(
    {
      weekid: req.params.weekId,
      stageid: req.params.stageId
    },
    function(err, match_list) {
      res.json(match_list);
    }
  );
});

// RETRIEVE a specific match
api.get("/match/:matchId", function(req, res) {
  Match.find({ id: req.params.matchId }, function(err, match) {
    res.json(match);
  });
});

//display all game data
api.get("/game", function(req, res) {
  Game.find({}, function(err, game_list) {
    res.json(game_list);
  });
});

// RETRIEVE games of a specific match
api.get("/game/:matchId", function(req, res) {
  Game.find({ matchid: req.params.matchId }, function(err, game) {
    res.json(game);
  });
});

module.exports = api;
