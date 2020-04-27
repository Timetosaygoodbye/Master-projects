<template>
  <div>
    <div class="mb-4 font-weight-bold">
      <b-row class="header my-2 d-flex flex-wrap">
        <b-col md="8" sm="12">
          <p class="h2 font-weight-bolder">PLAYER STATS FOR ALL HEROES</p>
        </b-col>
        <b-col md="2" sm="12">
          <b-dropdown
            id="seasonDropdown"
            :text="seasonList[selectedSeason]"
            size="sm"
            class="py-1 w-100"
            variant="outline-primary"
            :menu-class="{'w-100':$mq=='sm'}"
            no-flip
          >
            <b-dropdown-item v-for="(s, i) in seasonList" :key="`seasonList-${i}`">{{ s }}</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col md="2" sm="12">
          <b-dropdown
            id="stageDropdown"
            :text="stageList[selectedStage]"
            size="sm"
            class="py-1 w-100"
            variant="outline-primary"
            :menu-class="{'w-100':$mq=='sm'}"
            no-flip
          >
            <b-dropdown-item v-for="(t, i) in stageList" :key="`stageList-${i}`">{{ t }}</b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </div>

    <b-row>
      <b-col>
        <p class="h5 font-weight-bold">Player Stats For All Heroes</p>
        <p class="header-font-size">All stats are avg. per 10 minutes unless otherwise noted.</p>
      </b-col>
      <b-col v-if="getCurUserGroup === 'admin'" cols="2">
        <b-button variant="primary" class="mr-0" @click="showCreatePlayer">Create new player</b-button>
      </b-col>
    </b-row>

    <b-input-group class="mt-4 mb-4">
      <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Filter Players"></b-form-input>
    </b-input-group>
    <div class="overflow-auto">
      <b-table
        :fields="playerFields"
        :items="playerList"
        :per-page="playerPerPage"
        :current-page="currentPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        thead-class="bg-dark text-white header-font-size"
        tbody-tr-class="bg-white"
        small
        fixed
        @filtered="onFiltered"
      >
        <template v-slot:table-colgroup>
          <col
            v-for="field in playerFields"
            :key="field.key"
            :style="{ 'width': (field.key === 'ROLE') ? '5em' : ((field.key === 'PLAYER' || field.key === 'TEAM') ? ($mq=='sm' ? '180px' :'200px') : ((field.key === 'EDIT') ? '50px' : '90px')) }"
          />
        </template>
        <template v-slot:cell(ROLE)="row">
          <div v-if="row.value==='tank'">
            <svg
              class="icon d-block roleSvg mx-auto my-auto"
              viewBox="0 0 32 32"
              role="presentation"
            >
              <title>Tank</title>
              <path
                d="M29,10.7c0,2.1,0,4.1,0,6.2c0,0.6-0.1,1.1-0.4,1.6c-2.9,5.3-6.8,9.7-11.8,13.2c-0.6,0.4-1,0.4-1.6,0
		c-4.9-3.4-8.8-7.8-11.7-13c-0.3-0.6-0.4-1.2-0.4-1.8c0-3.9,0.1-7.8,0-11.7C3,2.3,5.2,1.9,7.1,1.4C10.4,0.6,13.3,0,16.6,0
		c3.1,0,7.7,1.1,9.4,1.6c1.3,0.4,2.7,0.9,2.9,2.2C29,4.9,28.9,6,29,7.1C29,8.3,29,9.5,29,10.7C29,10.7,29,10.7,29,10.7z"
              />
            </svg>
          </div>
          <div v-else-if="row.value==='offense'">
            <svg class="icon d-block roleSvg mx-auto" viewBox="0 0 32 32" role="presentation">
              <title>Damage</title>
              <g>
                <rect x="2.1" y="28.1" width="7.1" height="3.9" />
                <path
                  d="M9.1,7c0,0,0-0.5,0-0.7C8.6,1.5,5.6,0,5.6,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4h3.5h3.5V7z"
                />
              </g>
              <g>
                <rect x="12.5" y="28.1" width="7.1" height="3.9" />
                <path
                  d="M19.5,7c0,0,0-0.5,0-0.7C19,1.5,16,0,16,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4H16h3.5V7z"
                />
              </g>
              <g>
                <rect x="22.9" y="28.1" width="7.1" height="3.9" />
                <path
                  d="M29.9,7c0,0,0-0.5,0-0.7C29.4,1.5,26.4,0,26.4,0s-3,1.5-3.5,6.3c0,0.2,0,0.7,0,0.7v18.4h3.5h3.5V7z"
                />
              </g>
            </svg>
          </div>
          <div v-else>
            <svg class="icon d-block roleSvg mx-auto" viewBox="0 0 32 32" role="presentation">
              <title>Support</title>
              <path
                fill-rule="evenodd"
                d="M29.3,10.2h-7.5V2.7c0-1.5-1.2-2.7-2.7-2.7h-6.3c-1.5,0-2.7,1.2-2.7,2.7v7.5H2.7
		c-1.5,0-2.7,1.2-2.7,2.7v6.3c0,1.5,1.2,2.7,2.7,2.7h7.5v7.5c0,1.5,1.2,2.7,2.7,2.7h6.3c1.5,0,2.7-1.2,2.7-2.7v-7.5h7.5
		c1.5,0,2.7-1.2,2.7-2.7v-6.3C32,11.4,30.8,10.2,29.3,10.2z"
              />
            </svg>
          </div>
        </template>
        <template v-slot:cell(PLAYER)="row">
          <a :href="'https://www.overwatchleague.com/en-us/players/'+row.value.ID">
            <b-img style="height: 3em;" :src="row.value.IMAGE"></b-img>
            <span class="ml-2">{{ row.value.NAME }}</span>
          </a>
        </template>
        <template v-slot:cell(TEAM)="row">
          <span v-if="$mq == 'sm'">{{ row.value.ABBR }}</span>
          <span v-else>{{ row.value.NAME }}</span>
        </template>
        <template v-slot:cell(EDIT)="row">
          <div class="w-100">
            <b-icon-pencil @click="showUpdatePlayer(row.value)"></b-icon-pencil>
          </div>
        </template>
      </b-table>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="playerPerPage"
      aria-controls="my-table"
      align="center"
      first-number
      last-number
    ></b-pagination>

    <b-modal hide-header v-model="show">
      <b-form>
        <b-form-group label="Player ID">
          <b-form-input size="sm" v-model="playerToUpdate.PLAYER.ID" :disabled="disableChangeID"></b-form-input>
        </b-form-group>
        <b-form-group label="Name">
          <b-form-input size="sm" v-model="playerToUpdate.PLAYER.NAME"></b-form-input>
        </b-form-group>
        <b-form-group label="Headshot">
          <b-form-input size="sm" v-model="playerToUpdate.PLAYER.IMAGE"></b-form-input>
        </b-form-group>
        <b-form-group label="Role">
          <b-form-radio-group
            v-model="playerToUpdate.ROLE"
            :options="roleList"
            value-field="item"
            text-field="name"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group label="Team">
          <b-form-select v-model="playerToUpdate.TEAM.NAME" :options="teamList" size="sm" required></b-form-select>
        </b-form-group>
        <b-form-group label="Elim">
          <b-form-input size="sm" v-model="playerToUpdate.ELIM"></b-form-input>
        </b-form-group>
        <b-form-group label="Deaths">
          <b-form-input size="sm" v-model="playerToUpdate.DEATHS"></b-form-input>
        </b-form-group>
        <b-form-group label="Damage">
          <b-form-input size="sm" v-model="playerToUpdate.DAMAGE"></b-form-input>
        </b-form-group>
        <b-form-group label="Healing">
          <b-form-input size="sm" v-model="playerToUpdate.HEALING"></b-form-input>
        </b-form-group>
        <b-form-group label="Timte Played">
          <b-form-group label="Hour">
            <b-form-input size="sm" v-model="playerToUpdate.H"></b-form-input>
          </b-form-group>
          <b-form-group label="Minute">
            <b-form-input size="sm" v-model="playerToUpdate.M"></b-form-input>
          </b-form-group>
        </b-form-group>
      </b-form>

      <template v-slot:modal-footer>
        <div class="w-100">
          <div v-if="disableChangeID">
            <b-button variant="primary" class="float-right ml-2" @click="updatePlayer">Update</b-button>
            <b-button variant="danger" class="float-right ml-2" @click="deletePlayer">Delete</b-button>
          </div>
          <div v-else>
            <b-button variant="primary" class="float-right ml-2" @click="createPlayer">Create</b-button>
          </div>
          <b-button variant="outline-primary" class="float-right" @click="show=false">Close</b-button>
        </div>
      </template>
    </b-modal>

    <b-modal hide-header v-model="createSuccess">
      <div class="d-block text-center">
        <h3>Create Success!</h3>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="outline-primary" class="float-right" @click="createSuccess=false">OK</b-button>
        </div>
      </template>
    </b-modal>
    <b-modal hide-header v-model="updateSuccess">
      <div class="d-block text-center">
        <h3>Update Success!</h3>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="outline-primary" class="float-right" @click="updateSuccess=false">OK</b-button>
        </div>
      </template>
    </b-modal>
    <b-modal hide-header v-model="deleteSuccess">
      <div class="d-block text-center">
        <h3>Delete Success!</h3>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="outline-primary" class="float-right" @click="deleteSuccess=false">OK</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<style>
.table.b-table > thead > tr > [aria-sort="descending"],
.table.b-table > tfoot > tr > [aria-sort="descending"],
.table.b-table > thead > tr > [aria-sort="ascending"],
.table.b-table > tfoot > tr > [aria-sort="ascending"],
.table.b-table > thead > tr > [aria-sort="none"],
.table.b-table > tfoot > tr > [aria-sort="none"] {
  background-image: none !important;
}
.roleSvg {
  width: 1.5em;
  height: 1.5em;
}
.header-font-size {
  font-size: 0.8em;
}
.playerTd {
  line-height: 3em;
  padding: 0px 0px 0px 0.3em !important;
}
.playerTd > div {
  height: 3em;
  width: 5em;
  padding-right: 2em;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
}
.page-link {
  background-color: transparent !important;
  color: black !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
.page-link:hover {
  color: #ff8900 !important;
}
.page-item.active > button {
  color: #00a0ea !important;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      seasonList: ["2019 SEASON"],
      stageList: ["Regular Season"],
      playerList: [],
      playerFields: [
        {
          key: "ROLE",
          sortable: true,
          tdClass: "playerTd",
          sortDirection: "desc"
        },
        {
          key: "PLAYER",
          sortable: true,
          tdClass: "playerTd",
          sortByFormatted: this.playerSort,
          filterByFormatted: this.playerFilter,
          sortDirection: "desc"
        },
        {
          key: "TEAM",
          sortable: true,
          tdClass: "playerTd",
          sortDirection: "desc"
        },
        {
          key: "ELIM",
          sortable: true,
          tdClass: "playerTd",
          sortDirection: "desc"
        },
        {
          key: "DEATHS",
          sortable: true,
          tdClass: "playerTd",
          sortDirection: "desc"
        },
        {
          key: "DAMAGE",
          sortable: true,
          tdClass: "playerTd",
          sortDirection: "desc"
        },
        {
          key: "HEALING",
          sortable: true,
          tdClass: "playerTd",
          sortDirection: "desc"
        },
        {
          key: "TIME PLAYED",
          sortable: true,
          tdClass: "playerTd",
          sortDirection: "desc"
        }
      ],
      selectedSeason: 0,
      selectedStage: 0,
      playerPerPage: 20,
      currentPage: 1,
      filter: null,
      filterOn: ["PLAYER", "TEAM"],
      totalRows: 0,
      playerToUpdate: {
        ROLE: "",
        PLAYER: {
          ID: "",
          NAME: "",
          IMAGE: ""
        },
        TEAM: "",
        ELIM: "",
        DEATHS: "",
        HEALING: "",
        "TIME PLAYED": ""
      },
      teamList: [],
      roleList: [
        { item: "offense", name: "Offense" },
        { item: "tank", name: "Tank" },
        { item: "support", name: "Support" }
      ],
      show: false,
      disableChangeID: true,
      createSuccess: false,
      updateSuccess: false,
      deleteSuccess: false
    };
  },
  beforeMount: async function() {
    await this.$api
      .get("/api/team")
      .then(res => {
        this.teamInfo = res.data;
        this.teamList = this.teamInfo
          .map(x => x.name)
          .filter(x => x !== undefined);
      })
      .catch(err => console.log(err));
    if (this.getCurUserGroup == "admin") {
      this.playerFields.push({
        key: "EDIT",
        tdClass: "playerTd",
        label: ""
      });
    }
    await this.$api
      .get("/api/player")
      .then(res => {
        this.playerList = res.data
          .map(x => {
            return x.headshot
              ? {
                  ROLE: x.role,
                  PLAYER: { ID: x.playerid, NAME: x.name, IMAGE: x.headshot },
                  TEAM: {
                    NAME: this.teamInfo.find(y => y.abbreviatedName === x.team)
                      .name,
                    ABBR: x.team
                  },
                  ELIM: Number(x.eliminations_avg_per_10m).toFixed(2),
                  DEATHS: Number(x.deaths_avg_per_10m).toFixed(2),
                  DAMAGE: Number(x.hero_damage_avg_per_10m).toFixed(0),
                  HEALING: Number(x.healing_avg_per_10m).toFixed(0),
                  "TIME PLAYED": this.getTimeStr(x.time_played_total),
                  EDIT: x.playerid
                }
              : {};
          })
          .filter(function(e) {
            return "PLAYER" in e;
          });
        this.totalRows = this.playerList.length;
      })
      .catch(err => console.log(err.response));
  },
  methods: {
    getTimeStr(t) {
      return (t / 60 / 60).toFixed(0) + "h " + (t % 60).toFixed(0) + "m";
    },
    playerSort(value) {
      return value.NAME;
    },
    playerFilter(value) {
      return value.NAME;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showUpdatePlayer(p) {
      this.disableChangeID = true;
      this.playerToUpdate = this.playerList.find(x => x.PLAYER.ID == p);
      let timeplayed = this.getTimePlayed(this.playerToUpdate["TIME PLAYED"]);
      this.playerToUpdate.H = timeplayed.h;
      this.playerToUpdate.M = timeplayed.m;
      this.show = true;
    },
    showCreatePlayer() {
      this.disableChangeID = false;
      this.playerToUpdate = {
        ROLE: "",
        PLAYER: {
          ID: "",
          NAME: "",
          IMAGE: ""
        },
        TEAM: { NAME: "", ABBR: "" },
        ELIM: "",
        DEATHS: "",
        HEALING: "",
        H: "",
        M: ""
      };
      this.show = true;
    },
    async updatePlayer() {
      let data = {
        key: this.getCurUserKey,
        ...this.formatPlayer(this.playerToUpdate)
      };
      this.$api
        .put("/api/player/" + data.playerid, data)
        .then((this.updateSuccess = true))
        .catch(err => {
          if ("response" in err) {
            console.log(err.response);
          } else {
            console.log(err);
          }
        });
    },
    async deletePlayer() {
      let data = {
        key: this.getCurUserKey,
        ...this.formatPlayer(this.playerToUpdate)
      };
      this.$api
        .delete("/api/player/" + data.playerid, { data: data})
        .then((this.deleteSuccess = true))
        .catch(err => {
          if ("response" in err) {
            console.log(err.response);
          } else {
            console.log(err);
          }
        });
    },
    async createPlayer() {
      let data = {
        key: this.getCurUserKey,
        ...this.formatPlayer(this.playerToUpdate)
      };
      this.$api
        .post("/api/player", data)
        .then(res => {
          this.createSuccess = true;
        })
        .catch(err => {
          if ("response" in err) {
            console.log(err.response);
          } else {
            console.log(err);
          }
        });
    },
    getTimePlayed(s) {
      let h = s.indexOf("h");
      let hour = s.substring(0, h);
      let minute = s.substring(h + 2, s.length - 1);
      return {
        h: hour,
        m: minute
      };
    },
    formatPlayer(p) {
      let t = this.teamInfo.find(x => x.name === p.TEAM.NAME);
      return {
        playerid: p.PLAYER.ID,
        teamid: t.id,
        role: p.ROLE,
        name: p.PLAYER.NAME,
        team: t.abbreviatedName,
        eliminations_avg_per_10m: p.ELIM,
        deaths_avg_per_10m: p.DEATHS,
        hero_damage_avg_per_10m: p.DAMAGE,
        healing_avg_per_10m: p.HEALING,
        time_played_total: p.H * 60 * 60 + p.M * 60,
        headshot: p.PLAYER.IMAGE
      };
    }
  },
  computed: {
    playerRows() {
      this.totalRows = this.playerList.length;
    },
    ...mapGetters(["getCurUserGroup", "getCurUserKey"])
  }
};
</script>