<template>
  <div>
    <h1 class="my-4">Unofficial OverwatchLeague database document</h1>

    <h2>Overview</h2>
    <p>The OWL DB API allows you to look up the team info, match info, game info and player info. In addition, you can register in our system and do more wonderful things!</p>

    <h2 class="my-5">ALL NON-GET REQUESTS MUST CONTAIN A KEY!</h2>

    <h2>Auth</h2>
    <div class="overflow-auto">
      <table class="table table-bordered mb-5">
        <tr>
          <th scope="col">Method</th>
          <th scope="col">URL</th>
          <th scope="col">Param</th>
          <th scope="col">Data</th>
          <th scope="col">Description</th>
        </tr>
        <tr>
          <td>
            <code>POST</code>
          </td>
          <td>
            <code>/api/register</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>username, password</code>
          </td>
          <td>
            <code>sign up</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>POST</code>
          </td>
          <td>
            <code>/api/login</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>username, password</code>
          </td>
          <td>
            <code>log in</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>PUT</code>
          </td>
          <td>
            <code>/api/register</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>username, password</code>
          </td>
          <td>
            <code>edit password</code>
          </td>
        </tr>

        <tr>
          <th scope="row" colspan="5">Return example</th>
        </tr>
        <tr>
          <td colspan="5">
            <pre>
{
    "_id": "5e9e654292ae124694c9bb3a",
    "username": "guest",
    "password": "guest",
    "key": "70670c0d35dd763bb35691727960de8e",
    "usergroup": "guest",
    "email": "guest@example.com"
}
  </pre>
          </td>
        </tr>
      </table>
    </div>

    <h2>Player</h2>
    <div class="overflow-auto">
      <table class="table table-bordered mb-5">
        <tr>
          <th scope="col">Method</th>
          <th scope="col">URL</th>
          <th scope="col">Param</th>
          <th scope="col">Data</th>
          <th scope="col">Description</th>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/player</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get all players</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/player/:playerId</code>
          </td>
          <td>
            <code>playerId</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get a single player by playerId</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>POST</code>
          </td>
          <td>
            <code>/api/player</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>PlayerInfo</code>
          </td>
          <td>
            <code>create a player</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>PUT</code>
          </td>
          <td>
            <code>/api/player/:playerId</code>
          </td>
          <td>
            <code>playerId</code>
          </td>
          <td>
            <code>PlayerInfo</code>
          </td>
          <td>
            <code>update a single player by playerId</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>DELETE</code>
          </td>
          <td>
            <code>/api/player</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>delete all players</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>DELETE</code>
          </td>
          <td>
            <code>/api/player/:playerId</code>
          </td>
          <td>
            <code>playerId</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>delete a single player by playerId</code>
          </td>
        </tr>
        <tr>
          <th scope="row" colspan="5">Return example</th>
        </tr>
        <tr>
          <td colspan="5">
            <pre>
[
  {
      "_id": "5e9e37c13f16c36be47d7110",
      "playerid": "8675",
      "teamid": "7693",
      "role": "offense",
      "name": "Adora",
      "team": "HZS",
      "eliminations_avg_per_10m": "16.00212912",
      "deaths_avg_per_10m": "3.876234959",
      "hero_damage_avg_per_10m": "5390.96443",
      "healing_avg_per_10m": "5678.86436",
      "ultimates_earned_avg_per_10m": "4.410253077",
      "final_blows_avg_per_10m": "4.134036809",
      "time_played_total": "65166.32833",
      "realname": "Jaehwan Kang",
      "number": "1",
      "headshot": "https://bnetcmsus-a.akamaihd.net/cms/gallery/4VH5DWEFNUA91549580704783.png",
      "homeLocation": "Changwon"
  }
]
  </pre>
          </td>
        </tr>
      </table>
    </div>

    <h2>Team</h2>
    <div class="overflow-auto">
      <table class="table table-bordered mb-5">
        <tr>
          <th scope="col">Method</th>
          <th scope="col">URL</th>
          <th scope="col">Param</th>
          <th scope="col">Data</th>
          <th scope="col">Description</th>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/team</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get all teams</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/team/:teamId</code>
          </td>
          <td>
            <code>teamId</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get a single team by teamId</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>POST</code>
          </td>
          <td>
            <code>/api/team</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>TeamInfo</code>
          </td>
          <td>
            <code>create a new team</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>PUT</code>
          </td>
          <td>
            <code>/api/team/:teamId</code>
          </td>
          <td>
            <code>teamId</code>
          </td>
          <td>
            <code>TeamInfo</code>
          </td>
          <td>
            <code>update a team by teamId</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>DELETE</code>
          </td>
          <td>
            <code>/api/team</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>delete all teams</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>DELETE</code>
          </td>
          <td>
            <code>/api/team/:teamId</code>
          </td>
          <td>
            <code>teamId</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>delete a single team by teamId</code>
          </td>
        </tr>
        <tr>
          <th scope="row" colspan="5">Return example</th>
        </tr>
        <tr>
          <td colspan="5">
            <pre>
[
  {
      "_id": "5e9e69c93f16c36be47d732b",
      "id": "4402",
      "name": "Boston Uprising",
      "abbreviatedName": "BOS",
      "divisionId": "79",
      "div": "ATL",
      "location": "Boston-MA",
      "rank": "19",
      "stage1ranking": "8",
      "stage2ranking": "13",
      "stage3ranking": "16",
      "stage4ranking": "20",
      "stage1win": "4",
      "stage1lose": "3",
      "stage1mapwin": "16",
      "stage1maplose": "13",
      "stage1maptie": "1",
      "stage1points": "3",
      "stage2win": "3",
      "stage2lose": "4",
      "stage2mapwin": "13",
      "stage2maplose": "19",
      "stage2maptie": "0",
      "stage2points": "-6",
      "stage3win": "1",
      "stage3lose": "6",
      "stage3mapwin": "7",
      "stage3maplose": "22",
      "stage3maptie": "1",
      "stage3points": "-15",
      "stage4win": "0",
      "stage4lose": "7",
      "stage4mapwin": "5",
      "stage4maplose": "24",
      "stage4maptie": "0",
      "stage4points": "-19",
      "totalwin": "8",
      "totallose": "20",
      "totalmapwin": "41",
      "totalmaplose": "78",
      "totalmaptie": "2",
      "totalpoints": "-37",
      "logo": "https://bnetcmsus-a.akamaihd.net/cms/page_media/W4FGQ24HKCB51513383982827.svg",
      "mainName": "https://bnetcmsus-a.akamaihd.net/cms/page_media/6L8FEHO4JUB51519747890656.svg"
  }
]</pre>
          </td>
        </tr>
      </table>
    </div>

    <h2>Match&Game</h2>
    <div class="overflow-auto">
      <table class="table table-bordered mb-5">
        <tr>
          <th scope="col">Method</th>
          <th scope="col">URL</th>
          <th scope="col">Param</th>
          <th scope="col">Data</th>
          <th scope="col">Description</th>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/match</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get all matches</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/match/:stageId/:weekId</code>
          </td>
          <td>
            <code>stageId&weekId</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get the match data of specific stage and week</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/match/:matchId</code>
          </td>
          <td>
            <code>matchId</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get a match by matchId</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/game</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get all games</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>GET</code>
          </td>
          <td>
            <code>/api/game/:matchId</code>
          </td>
          <td>
            <code>matchId</code>
          </td>
          <td>
            <code>None</code>
          </td>
          <td>
            <code>get games of a match by matchId</code>
          </td>
        </tr>
        <tr>
          <th scope="row" colspan="5">Return example</th>
        </tr>
        <tr>
          <td colspan="5">
            <pre>
[
    {
        "_id": "5e9e548a3f16c36be47d71d6",
        "id": "21211",
        "date": "2019/2/14 20:09",
        "week": "THU",
        "stageid": "stage1",
        "weekid": "week1",
        "timestamp": "1550189390",
        "team1": "PHI",
        "team1id": "4524",
        "team2": "LDN",
        "team2id": "4410",
        "team1Score": "3",
        "team2Score": "1",
        "gameid1": "20822",
        "gameid2": "20881",
        "gameid3": "20882",
        "gameid4": "20883",
        "gameid5": "",
        "map1": "ilios",
        "map2": "hollywood",
        "map3": "volskaya",
        "map4": "",
        "map5": "",
        "team1playerid1": "4079",
        "team1playerid2": "4620",
        "team1playerid3": "12076",
        "team1playerid4": "8754",
        "team1playerid5": "4659",
        "team1playerid6": "4083",
        "team1playerid7": "12081",
        "team1playerid8": "10011",
        "team1playerid9": "4668",
        "team1playerid10": "4669",
        "team2playerid1": "12093",
        "team2playerid2": "12094",
        "team2playerid3": "12095",
        "team2playerid4": "12101",
        "team2playerid5": "12039",
        "team2playerid6": "12044",
        "team2playerid7": "12045",
        "team2playerid8": "9424",
        "team2playerid9": "12050",
        "team2playerid10": "8790"
    }
]
  </pre>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
h1,
h2 {
  color: #ff8900;
}
</style>
<script>
export default {};
</script>