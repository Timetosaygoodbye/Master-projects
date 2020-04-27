# Overwatch League

### Overview:

We made an Overwatch League website, taking the official OWL website as reference. We use JavaScript for both front-end and back-end, fulfilling seperated front-end and back-end and MVVM design pattern.
We got the data by python from Blizzard offcial API. We open our API to People for further development.

## Author

Siyu Zhuang siz30  
Tiancheng Lu til62  
Chi Song chs273  
Ziyuan Xu zix11

## Due Day

April 23rd, 2020

## Test Account

1. Test:  
   Username: test  
   Password: test
2. Admin:  
   Username: admin  
   Password: admin  
   **Please DO NOT edit existing data. Create new instance for test**
3. You can register your own account

## Routes

# ALL NON-GET REQUESTS MUST CONTAIN A KEY!

#### Auth:

| Method | URL           | Param | Data               | Description   |
| :----- | :------------ | :---- | :----------------- | :------------ |
| POST   | /api/register | None  | username, password | sign up       |
| POST   | /api/login    | None  | username, password | log in        |
| PUT    | /api/register | None  | username, password | edit password |

Return example:

```
{
    "_id": "5e9e654292ae124694c9bb3a",
    "username": "guest",
    "password": "guest",
    "key": "70670c0d35dd763bb35691727960de8e",
    "usergroup": "guest",
    "email": "guest@example.com"
}
```

#### Player:

| Method | URL                   | Param    | Data       | Description                        |
| :----- | :-------------------- | :------- | :--------- | :--------------------------------- |
| GET    | /api/player           | None     | None       | get all players                    |
| GET    | /api/player/:playerId | playerId | None       | get a single player by playerId    |
| POST   | /api/player           | None     | PlayerInfo | create a player                    |
| PUT    | /api/player/:playerId | playerId | PlayerInfo | update a single player by playerId |
| DELETE | /api/player           | None     | None       | delete all players                 |
| DELETE | /api/player/:playerId | playerId | None       | delete a single player by playerId |

Return example:

```
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
```

#### Team:

| Method | URL               | Param  | Data     | Description                    |
| :----- | :---------------- | :----- | :------- | :----------------------------- |
| GET    | /api/team         | None   | None     | get all teams                  |
| GET    | /api/team/:teamId | teamId | None     | get a single team by teamId    |
| POST   | /api/team         | None   | TeamInfo | create a new team              |
| PUT    | /api/team/:teamId | teamId | TeamInfo | update a team by teamId        |
| DELETE | /api/team         | None   | None     | delete all teams               |
| DELETE | /api/team/:teamId | teamId | None     | delete a single team by teamId |

Return example:

```
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
]
```

#### Match&Game:

| Method | URL                         | Param          | Data | Description                                   |
| :----- | :-------------------------- | :------------- | :--- | :-------------------------------------------- |
| GET    | /api/match                  | None           | None | get all matches                               |
| GET    | /api/match/:stageId/:weekId | stageId&weekId | None | get the match data of specific stage and week |
| GET    | /api/match/:matchId         | matchId        | None | get a match by matchId                        |
| GET    | /api/game                   | None           | None | get all games                                 |
| GET    | /api/game/:matchId          | matchId        | None | get games of a match by matchId               |

Return example:

```
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
        ......
    }
]
```

## Objective

### Details:

1. Unregistered users interface  
   All unregistered users can browse the homepage to view all the match details, standings and players' data.
2. Normal user interface  
   After signing in, normal user can also view all the data and they can use our API to develop their own APP. They can change their password and get new API key.
3. Administrator interface  
   The administrator has all privileges to CRUD on all data.

### Problems:

1. The APIs built at early stage are not well designed. Some APIs may be redundant, and some may not work now.
2. Experience on mobile devices may be not excellent, need further polishments.

### Things to Learn:

1. MERN full-stack
2. Vue Front-end Framework
3. MVC model
4. MongoDB Connection
5. HTML5 API - localStorage

### Advanced Features:

1. Pagination on Stat page
2. Fuzzy query on Stat page
3. User privilege management
4. Backend API key design

## Team member’s contributions

### Siyu Zhuang: siz30

#### Position:

Front-end developer and back-end coordinator.

#### Details:

Vue:SCHEDULE page, STAT page, Login and register
Express.js: Model and Restful Api Design

### Tiancheng Lu: til62

#### Position:

Back-end developer

#### Details:

Model and Restful Api Design; Restful Apis Implementation (auth, match, player and team)

### Chi Song: chs273

#### Position:

Database developer

#### Details:

Collect and modify data.(Our data is large and has a lot of fields)
Design database schemas.
Connect MongoDB with project.
Also participated in some backend work.

#### Ziyuan Xu: zix11

#### Position:

Front-end developer

#### Detail:

Vue:STANDING page, Header and Footer
Report.md

## Technical Architecture

### Libraries

1. Front-end  
   Vue; Bootsrap-Vue
2. Back-end  
   express; mongoose; crypto
3. Database
   MongoDB

### Frameworks

1. Frontend: Vue
2. Style: Bootstrap-Vue
3. Backend: ExpressJS
4. Database: Mongoose

### Other technologies out of class

1. Vue: front-end Javascript framework to fulfill our ideas on websites
2. Separated front-end and back-end and then bring them together with APIs

### MVVM conceptual model to provide a guide

(i.e. what are the models/views/controllers and what do they do).

#### Model:

1. User  
   Fields：name, email, key, password, usergroup
2. Player  
   Fields: name, playerID, teamID ,role...
3. Match
   Fields: id, data, week, team1id, team2id, team1playerid1...
4. Team
   Fields: name, teamid, rank, div, location...
5. Game:
   Fields: matchid, mapid, team1id, team2id...

#### View:

1. Schedule
2. Standing
3. Stat
4. API
5. About

#### ViewModel:

Every view and component has its own ViewModel, too much to list here.

## Challenges

---

### Challenge details

1. How to connect the front-end and back-end
2. How to come across new documentation of an unfamiliar npm package
3. Develop the “view” part in MVC model with Vue.js

### Frustrated libraries or technologies

1. Vue framework
2. Mongoose: a really integrated documentation have lots of functions and functionalities to go through, easily get lost.

### Features you couldn’t get working?

Not to our knowledge. We fulfilled every feature as designed.

## Future Work

### More Features

1. Add our own store page
2. Create a team home page which will display detailed team
   information and its players
3. Extract the other season's data from the official API
4. Update our data up-to-date.
5. Create a modify team function with which administrator can add or delete a team from the API or just update some detailed information for a specific team.

### More Technologies

1. OAuth
2. Search matches by team

## Conclusion

### Reflect upon the web technologies and standards you learned in this course

The whole design of the course is logical and understandable for new beginners. For the front-end development technologies study, we feel good about the HTML, HTML5 APIs, CSS, CSS frameworks, and JavaScript. After-class activities and assignments helped us practice these technologies. When the topic went to JavaScript Frameworks, the workload and assignment became more difficulties. We need to read lots of documentation, tutorials, and watch videos besides reading materials in weekly resources to move on with the plan on the syllabus. Some concepts and technologies made us confused, and it often took us a long time to totally comprehend it. So did the part of express.js. The database was not a difficult part for us, who have learned about databases before. We believed the after-class activities were beneficial for efficient learning.

### Did you learn what you wanted?

As beginners, we felt good about this course. It provided enough knowledge about web design and standards, though we need to learn much outside the class. The course homepage built on Glitch is an excellent idea.

### What technologies or standards do you think would be useful in future iterations of this course?

We thought that Bootstrap, Node.js, and Mongoose would be the most useful. Also it is a good choice to use a suitable framework to achieve project goals.

### Documentation List any resources that you used in creating this project.

1. Connection  
   https://www.youtube.com/watch?v=7CqJlxBYj-M  
   https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/
2. MongoDB  
   https://mongoosejs.com/docs/middleware.html#pre
3. Express  
   https://expressjs.com/en/guide/routing.html  
   https://www.youtube.com/watch?v=pKd0Rpw7O48
4. Node JS  
   https://nodejs.org/en/docs/  
   https://www.udemy.com/course/teachnodejs/  
   https://www.udemy.com/course/web-javascript/
5. Vue  
   https://www.youtube.com/watch?v=4deVCNJq3qc
   https://www.youtube.com/watch?v=-DyKeMa5tYY
   https://www.youtube.com/watch?v=G2krb6FaZco
