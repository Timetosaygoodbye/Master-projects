<template>
  <div>
    <div class="mb-4 font-weight-bold">
      <b-row class="header my-2 d-flex flex-wrap">
        <b-col md="8" sm="12">
          <p class="h2 font-weight-bolder">MATCH SCHEDULE</p>
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
            id="teamDropdown"
            :text="selectedTeam"
            size="sm"
            class="py-1 w-100"
            variant="outline-primary"
            :menu-class="{'w-100':$mq=='sm'}"
            @hidden="filterTeam"
            no-flip
          >
            <b-dropdown-item
              v-for="(t, i) in teamList"
              :key="`teamList-${i}`"
              @click="selectedTeam=t"
            >{{ t }}</b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-tabs
            class="mt-2 tab-border"
            pills
            v-model="selectedStage"
            @input="stageTabChange"
            active-nav-item-class="first"
          >
            <b-tab
              v-for="(s, i) in stageList"
              :key="`stageList-${i}`"
              :title="s"
              title-link-class="text-dark"
            ></b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-tabs
            pills
            v-model="selectedWeek"
            @input="weekTabChange"
            class="tab-border"
            nav-class="bg-dark"
            active-nav-item-class="week-tabs"
          >
            <b-tab
              v-for="(w, i) in weekList"
              :key="`stageList-${i}`"
              :disabled="w === 'WEEKS' ? true : false"
              :title="w"
              title-link-class="text-white"
            ></b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </div>

    <b-row>
      <b-col>
        <p
          class="h5 mb-4 font-weight-bold"
        >{{ stageList[selectedStage] }} - {{ weekList[selectedWeek] }}</p>
      </b-col>
    </b-row>

    <b-row
      no-gutters
      class="mb-2 bg-white text-center"
      v-for="(m, i) in schedule"
      :key="`match-${i}`"
      style="height:4em;"
    >
      <b-col cols="2" class="d-flex justify-content-center align-items-center border-right">
        <div>
          <p :class="{'small-text': $mq=='sm'}" style="margin-bottom: -5px;">{{ m.date }}</p>
          <p class="mb-0 font-weight-bold" :class="{'small-text': $mq=='sm'}">FINAL</p>
        </div>
      </b-col>

      <b-col class="d-flex justify-content-center align-items-center">
        <b-row no-gutters class="w-100">
          <b-col cols="5">
            <div class="text-right">
              <span v-if="$mq == 'sm'">{{ m.team1abbr }}</span>
              <span v-else>{{m.team1}}</span>
              <img class="mx-2 teamLogo" :src="m.team1logo" />
            </div>
          </b-col>
          <b-col cols="2">
            <div class="h-100 d-flex justify-content-center align-items-center">
              <span
                class="mr-1"
                :class="{'font-weight-bold': m.team1Score > m.team2Score}"
              >{{ m.team1Score }}</span>
              -
              <span
                class="ml-1"
                :class="{'font-weight-bold': m.team1Score < m.team2Score}"
              >{{ m.team2Score }}</span>
            </div>
          </b-col>
          <b-col cols="5">
            <div class="text-left">
              <img class="mx-2 teamLogo" :src="m.team2logo" />
              <span v-if="$mq == 'sm'">{{ m.team2abbr }}</span>
              <span v-else>{{ m.team2}}</span>
            </div>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="2" class="d-flex justify-content-center align-items-center border-left">
        <div v-if="$mq == 'sm'">
          <b-icon-chevron-right></b-icon-chevron-right>
        </div>
        <div v-else class="my-auto font-weight-bold match-detail">
          <a :href="'https://www.overwatchleague.com/en-us/match/'+m.id">MATCH DETAILS</a>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style>
.dropdown > button {
  border-radius: 0px !important;
}
.teamLogo {
  width: 2em;
}
.small-text {
  font-size: 0.75em;
}
.nav {
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow-x: auto;
}
.nav-item {
  width: auto;
}
.nav-tabs > li > a:hover {
  background-color: transparent;
  border: none;
}
a.nav-link.active.first {
  background-color: #ff8900 !important;
  color: white !important;
}
a.nav-link.active.week-tabs {
  background-color: transparent !important;
  color: #ff8900 !important;
}
a.nav-link.disabled {
  color: silver !important;
}
.nav-pills .nav-link {
  border-radius: 0em;
}
.tab-border {
  border-bottom: 5px solid #ff8900;
}
.match-detail {
  color: #ff8900;
}
a,
a:hover {
  color: inherit;
}
</style>

<script>
export default {
  data: function() {
    return {
      seasonList: ["2019 SEASON"],
      stageList: ["STAGE 1", "STAGE 2", "STAGE 3", "STAGE 4", "PLAYOFFS"],
      weekList: [
        "WEEK 1",
        "WEEK 2",
        "WEEK 3",
        "WEEK 4",
        "WEEK 5",
        "STAGE PLAYOFFS"
      ],
      teamList: [
        "GUANGZHOU CHARGE",
        "WASHINGTON JUSTICE",
        "TORONTO DEFIANT",
        "HANGZHOU SPARK",
        "FLORIDA MAYHEM",
        "SAN FRANCISCO SHOCK",
        "LOS ANGELES GLADIATORS",
        "NEW YORK EXCELSIOR",
        "BOSTON UPRISING",
        "VANCOUVER TITANS",
        "HOUSTON OUTLAWS",
        "LOS ANGELS VALIANT",
        "PARIS ETERNAL",
        "SEOUL DYNASTY",
        "ATLANTA REIGN",
        "CHENGDU HUNTERS",
        "PHILADELPHIA FUSION",
        "DALLAS FUEL",
        "LONDON SPITFIRE",
        "ALL TEAMS"
      ],
      allMatches: [],
      schedule: [],
      selectedSeason: 0,
      selectedStage: 0,
      selectedWeek: 0,
      selectedTeam: "ALL TEAMS"
    };
  },
  beforeMount: async function() {
    await this.$api
      .get("/api/team")
      .then(res => {
        this.teamInfo = res.data;
      })
      .catch(err => console.log(err));
    await this.getMatch();
  },
  methods: {
    stageTabChange() {
      this.selectedWeek = 0;
      this.getMatch();
    },
    weekTabChange() {
      console.log(
        "/api/match/" +
          this.stageList[this.selectedStage].replace(/\s/g, "").toLowerCase() +
          "/" +
          this.weekList[this.selectedWeek].replace(/\s/g, "").toLowerCase()
      );
      this.getMatch();
    },
    async getMatch() {
      await this.$api
        .get(
          "/api/match/" +
            this.stageList[this.selectedStage]
              .replace(/\s/g, "")
              .toLowerCase() +
            "/" +
            this.weekList[this.selectedWeek].replace(/\s/g, "").toLowerCase()
        )
        .then(res => {
          this.allMatches = res.data.map(x => {
            let t1 = this.teamInfo.find(t => t.id === x.team1id);
            let t2 = this.teamInfo.find(t => t.id === x.team2id);
            let date = new Date(x.date);
            let month = new Intl.DateTimeFormat("en", {
              month: "short"
            }).format(date);
            let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
              date
            );
            return {
              id: x.id,
              date: x.week + ", " + month + " " + day,
              team1: t1.name,
              team2: t2.name,
              team1abbr: x.team1,
              team2abbr: x.team2,
              team1logo: t1.logo,
              team2logo: t2.logo,
              team1Score: x.team1Score,
              team2Score: x.team2Score
            };
          });
          this.filterTeam();
        })
        .catch(err => console.log(err));
    },
    filterTeam() {
      if (this.selectedTeam == "ALL TEAMS") {
        this.schedule = { ...this.allMatches };
      } else {
        this.schedule = this.allMatches.filter(
          x =>
            x.team1.toLowerCase() === this.selectedTeam.toLowerCase() ||
            x.team2.toLowerCase() === this.selectedTeam.toLowerCase()
        );
      }
    }
  }
};
</script>