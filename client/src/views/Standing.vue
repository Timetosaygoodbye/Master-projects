<template>
  <div>
    <div class="mb-4 font-weight-bold">
      <b-row class="header my-2 d-flex flex-wrap">
        <b-col md="10" sm="12">
          <p class="h2 font-weight-bolder">STANDINGS</p>
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
      </b-row>

      <b-row>
        <b-col>
          <b-tabs
            class="mt-2 tab-border"
            pills
            v-model="selectedStanding"
            @input="standingTabChange"
            active-nav-item-class="first"
          >
            <b-tab
              v-for="(s, i) in standingList"
              :key="`stageList-${i}`"
              :title="s"
              title-link-class="text-dark"
            ></b-tab>
          </b-tabs>
        </b-col>
      </b-row>
      <b-row v-if="selectedStanding == 0">
        <b-col>
          <b-tabs
            class="tab-border"
            pills
            v-model="selectedStage"
            @input="stageTabChange"
            nav-class="bg-dark"
            active-nav-item-class="stage-tabs"
          >
            <b-tab
              v-for="(s, i) in stageList"
              :key="`standingList-${i}`"
              :title="s"
              title-link-class="text-white"
            ></b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </div>

    <div v-if="selectedStanding === 0" class="overflow-auto">
      <b-table
        :fields="teamFields"
        :items="teamList"
        class="mb-0"
        thead-class="bg-dark text-white header-font-size"
        tbody-tr-class="bg-white"
        sort-by="RANK"
        filter="true"
        :filter-function="filterStageTop"
        small
        fixed
      >
        <template v-slot:table-colgroup>
          <col
            v-for="field in teamFields"
            :key="field.key"
            :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
          />
        </template>
        <template v-slot:cell(TEAM)="row">
          <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
          <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
          <span v-else class="ml-2">{{ row.value.ABBR }}</span>
        </template>
        <template v-slot:cell(DIFF)="row">
          <div
            :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
            class="w-100 p-0"
          >
            <span v-if="row.value > 0">+</span>
            {{ row.value }}
          </div>
        </template>
      </b-table>
      <div class="split-table-text split-table-border">
        <span>STAGE PLAYOFFS CUTOFF</span>
      </div>
      <b-table
        :fields="teamFields"
        :items="teamList"
        thead-class="hide"
        tbody-tr-class="bg-white"
        sort-by="RANK"
        filter="true"
        :filter-function="filterStageBottom"
        small
        fixed
      >
        <template v-slot:table-colgroup>
          <col
            v-for="field in teamFields"
            :key="field.key"
            :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
          />
        </template>
        <template v-slot:cell(TEAM)="row">
          <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
          <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
          <span v-else class="ml-2">{{ row.value.ABBR }}</span>
        </template>
        <template v-slot:cell(DIFF)="row">
          <div
            :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
            class="w-100 p-0"
          >
            <span v-if="row.value > 0">+</span>
            {{ row.value }}
          </div>
        </template>
      </b-table>
    </div>

    <div v-else-if="selectedStanding === 1" class="overflow-auto">
      <b-table
        :fields="teamFields"
        class="mb-0"
        thead-class="bg-dark text-white header-font-size"
        tbody-tr-class="bg-white"
        sort-by="RANK"
        small
        fixed
      >
        <template v-slot:table-colgroup>
          <col
            v-for="field in teamFields"
            :key="field.key"
            :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
          />
        </template>
        <template v-slot:cell(TEAM)="row">
          <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
          <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
          <span v-else class="ml-2">{{ row.value.ABBR }}</span>
        </template>
        <template v-slot:cell(DIFF)="row">
          <div
            :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
          >
            <span v-if="row.value > 0">+</span>
            {{ row.value }}
          </div>
        </template>
      </b-table>
      <div class="split-table-text text-dark">
        <span>DIFF DIVISION LEADERS</span>
      </div>
      <b-table
        :fields="teamFields"
        :items="leader"
        class="mb-0"
        thead-class="hide"
        tbody-tr-class="bg-white"
        small
        fixed
      >
        <template v-slot:table-colgroup>
          <col
            v-for="field in teamFields"
            :key="field.key"
            :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
          />
        </template>
        <template v-slot:cell(TEAM)="row">
          <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
          <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
          <span v-else class="ml-2">{{ row.value.ABBR }}</span>
        </template>
        <template v-slot:cell(DIFF)="row">
          <div
            :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
          >
            <span v-if="row.value > 0">+</span>
            {{ row.value }}
          </div>
        </template>
      </b-table>
      <div class="split-table-text text-dark">
        <span>OTHER TEAMS</span>
      </div>
      <b-table
        :fields="teamFields"
        :items="teamList"
        thead-class="hide"
        tbody-tr-class="bg-white"
        sort-by="RANK"
        filter="true"
        :filter-function="filterPlayoffOther"
        small
        fixed
      >
        <template v-slot:table-colgroup>
          <col
            v-for="field in teamFields"
            :key="field.key"
            :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
          />
        </template>
        <template v-slot:cell(TEAM)="row">
          <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
          <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
          <span v-else class="ml-2">{{ row.value.ABBR }}</span>
        </template>
        <template v-slot:cell(DIFF)="row">
          <div
            :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
          >
            <span v-if="row.value > 0">+</span>
            {{ row.value }}
          </div>
        </template>
      </b-table>
      <div class="split-table-text split-table-border">
        <span>STAGE PLAYOFFS CUTOFF</span>
      </div>
      <b-table
        :fields="teamFields"
        :items="teamList"
        thead-class="hide"
        tbody-tr-class="bg-white"
        sort-by="RANK"
        filter="true"
        :filter-function="filterStageBottom"
        small
        fixed
      >
        <template v-slot:table-colgroup>
          <col
            v-for="field in teamFields"
            :key="field.key"
            :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
          />
        </template>
        <template v-slot:cell(TEAM)="row">
          <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
          <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
          <span v-else class="ml-2">{{ row.value.ABBR }}</span>
        </template>
        <template v-slot:cell(DIFF)="row">
          <div
            :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
          >
            <span v-if="row.value > 0">+</span>
            {{ row.value }}
          </div>
        </template>
      </b-table>
    </div>

    <div v-else-if="selectedStanding === 2">
      <b-row>
        <b-col>
          <p class="h5 mb-4 font-weight-bold">LEAGUE</p>
        </b-col>
      </b-row>

      <div class="overflow-auto">
        <b-table
          :fields="teamFields"
          :items="teamList"
          thead-class="bg-dark text-white header-font-size"
          tbody-tr-class="bg-white"
          sort-by="RANK"
          small
          fixed
        >
          <template v-slot:table-colgroup>
            <col
              v-for="field in teamFields"
              :key="field.key"
              :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
            />
          </template>
          <template v-slot:cell(TEAM)="row">
            <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
            <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
            <span v-else class="ml-2">{{ row.value.ABBR }}</span>
          </template>
          <template v-slot:cell(DIFF)="row">
            <div
              :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
            >
              <span v-if="row.value > 0">+</span>
              {{ row.value }}
            </div>
          </template>
        </b-table>
      </div>
    </div>

    <div v-else>
      <b-row>
        <b-col>
          <p class="h5 mb-4 font-weight-bold">ATLANTIC DIVISION</p>
        </b-col>
      </b-row>

      <div class="overflow-auto">
        <b-table
          :fields="teamFields"
          :items="ATLList"
          thead-class="bg-dark text-white header-font-size"
          tbody-tr-class="bg-white"
          small
          fixed
        >
          <template v-slot:table-colgroup>
            <col
              v-for="field in teamFields"
              :key="field.key"
              :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
            />
          </template>
          <template v-slot:cell(TEAM)="row">
            <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
            <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
            <span v-else class="ml-2">{{ row.value.ABBR }}</span>
          </template>
          <template v-slot:cell(DIFF)="row">
            <div
              :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
            >
              <span v-if="row.value > 0">+</span>
              {{ row.value }}
            </div>
          </template>
        </b-table>
      </div>

      <b-row>
        <b-col>
          <p class="h5 mb-4 font-weight-bold">PACIFIC DIVISION</p>
        </b-col>
      </b-row>

      <div class="overflow-auto">
        <b-table
          :fields="teamFields"
          :items="PACList"
          thead-class="bg-dark text-white header-font-size"
          tbody-tr-class="bg-white"
          small
          fixed
        >
          <template v-slot:table-colgroup>
            <col
              v-for="field in teamFields"
              :key="field.key"
              :style="{ 'width': (field.key === 'RANK') ? '3em' : ((field.key === 'TEAM') ? ($mq=='sm' ? '150px' :'auto') : (field.key === 'MAP W-L-T' ? '100px' : '75px')) }"
            />
          </template>
          <template v-slot:cell(TEAM)="row">
            <b-img class="logo-height" :src="row.value.IMAGE"></b-img>
            <span v-if="$mq !== 'sm'" class="ml-2">{{ row.value.NAME }}</span>
            <span v-else class="ml-2">{{ row.value.ABBR }}</span>
          </template>
          <template v-slot:cell(DIFF)="row">
            <div
              :style="{ 'color': (row.value > 0) ? '#00bd00' : ((row.value < 0) ? '#e50e47' : 'black')}"
            >
              <span v-if="row.value > 0">+</span>
              {{ row.value }}
            </div>
          </template>
        </b-table>
      </div>
    </div>

    <div>
      <p>Six teams will qualify for the playoffs, based on their Regular Season records. the top seed from each Division will receive a first-round bye. The next four teams, regardless of Division, will also advance.</p>
    </div>
  </div>
</template>

<style>
.dropdown > button {
  border-radius: 0px !important;
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
a.nav-link.active.stage-tabs {
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
.header-font-size {
  font-size: 0.8em;
}
.split-table-border {
  border-bottom: 1px dashed #00a0ea;
}
.split-table-text {
  width: 100%;
  color: #00a0ea;
  line-height: 0.2em;
  margin: 10px 0 10px;
}
.split-table-text > span {
  background: #f2f2f2;
  font-weight: bold;
  padding: 0 10px;
}
.hide {
  display: none !important;
}
.logo-height {
  height: 2.5em;
}
.teamTd {
  line-height: 3em;
  padding: 0px 0px 0px 0.3em !important;
}
.rankAlign {
  margin-left: 5em;
  height: 3em;
  width: 5em;
  padding-right: 2em;
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
}
</style>

<script>
export default {
  data: function() {
    return {
      seasonList: ["2019 SEASON"],
      standingList: ["STAGE", "PLAYOFFS", "LEAGUE", "DIVISIONS"],
      stageList: ["STAGE 1", "STAGE 2", "STAGE 3", "STAGE 4"],
      rawData: [],
      teamList: [],
      PACList: [],
      ATLList: [],
      leader: [],
      teamFields: [
        {
          key: "RANK",
          tdClass: "teamTd text-center"
        },
        {
          key: "TEAM",
          tdClass: "teamTd"
        },
        {
          key: "DIV",
          tdClass: "teamTd"
        },
        {
          key: "W",
          tdClass: "teamTd"
        },
        {
          key: "L",
          tdClass: "teamTd"
        },
        {
          key: "MP",
          tdClass: "teamTd"
        },
        {
          key: "MAP W-L-T",
          tdClass: "teamTd"
        },
        {
          key: "DIFF",
          tdClass: "teamTd"
        }
      ],
      selectedSeason: 0,
      selectedStanding: 0,
      selectedStage: 0
    };
  },
  beforeMount: async function() {
    await this.$api
      .get("/api/team")
      .then(res => {
        this.rawData = res.data
          .map(x => {
            return x.logo
              ? {
                  META: {
                    ID: x.id,
                    TEAM: {
                      NAME: x.name,
                      ABBR: x.abbreviatedName,
                      IMAGE: x.logo
                    },
                    DIV: x.div
                  },
                  STAGE1: {
                    RANK: x.stage1ranking,
                    W: x.stage1win,
                    L: x.stage1lose,
                    MP: x.stage1win + x.stage1lose,
                    "MAP W-L-T":
                      x.stage1mapwin +
                      "-" +
                      x.stage1maplose +
                      "-" +
                      x.stage1maptie,
                    DIFF: x.stage1mapwin - x.stage1maplose
                  },
                  STAGE2: {
                    RANK: x.stage2ranking,
                    W: x.stage2win,
                    L: x.stage2lose,
                    MP: x.stage2win + x.stage2lose,
                    "MAP W-L-T":
                      x.stage2mapwin +
                      "-" +
                      x.stage2maplose +
                      "-" +
                      x.stage2maptie,
                    DIFF: x.stage2mapwin - x.stage2maplose
                  },
                  STAGE3: {
                    RANK: x.stage3ranking,
                    W: x.stage3win,
                    L: x.stage3lose,
                    MP: x.stage3win + x.stage3lose,
                    "MAP W-L-T":
                      x.stage3mapwin +
                      "-" +
                      x.stage3maplose +
                      "-" +
                      x.stage3maptie,
                    DIFF: x.stage3mapwin - x.stage3maplose
                  },
                  STAGE4: {
                    RANK: x.stage4ranking,
                    W: x.stage4win,
                    L: x.stage4lose,
                    MP: x.stage4win + x.stage4lose,
                    "MAP W-L-T":
                      x.stage4mapwin +
                      "-" +
                      x.stage4maplose +
                      "-" +
                      x.stage4maptie,
                    DIFF: x.stage4mapwin - x.stage4maplose
                  },
                  TOTAL: {
                    RANK: Number(x.rank),
                    W: x.totalwin,
                    L: x.totallose,
                    MP: x.totalwin + x.totallose,
                    "MAP W-L-T":
                      x.totalmapwin +
                      "-" +
                      x.totalmaplose +
                      "-" +
                      x.totalmaptie,
                    DIFF: x.totalmapwin - x.totalmaplose
                  }
                }
              : {};
          })
          .filter(x => "META" in x);

        this.PACList = this.rawData
          .map(x => {
            return { ...x.META, ...x.TOTAL };
          })
          .filter(x => x.DIV == "PAC")
          .sort((x, y) => (x.RANK < y.RANK ? -1 : 1));
        this.ATLList = this.rawData
          .map(x => {
            return { ...x.META, ...x.TOTAL };
          })
          .filter(x => x.DIV == "ATL")
          .sort((x, y) => (x.RANK < y.RANK ? -1 : 1));
        this.leader = [this.PACList[0], this.ATLList[0]];
        this.teamList = this.rawData.map(x => {
          return { ...x.META, ...x.STAGE1 };
        });
      })
      .catch(err => console.log(err.response));
  },
  methods: {
    standingTabChange() {
      switch (this.selectedStanding) {
        case 0:
          this.selectedStage = 0;
          break;
        case 1:
          this.teamList = this.rawData
            .map(x => {
              return { ...x.META, ...x.TOTAL };
            })
            .filter(x => !this.leader.map(y => y.ID).includes(x.ID));
          break;
        case 2:
        case 3:
          this.teamList = this.rawData.map(x => {
            return { ...x.META, ...x.TOTAL };
          });
          break;
        default:
          break;
      }
    },
    stageTabChange() {
      switch (this.selectedStage) {
        case 0:
          this.teamList = this.rawData.map(x => {
            return { ...x.META, ...x.STAGE1 };
          });
          break;
        case 1:
          this.teamList = this.rawData.map(x => {
            return { ...x.META, ...x.STAGE2 };
          });
          break;
        case 2:
          this.teamList = this.rawData.map(x => {
            return { ...x.META, ...x.STAGE3 };
          });
          break;
        case 3:
          this.teamList = this.rawData.map(x => {
            return { ...x.META, ...x.STAGE4 };
          });
          break;

        default:
          break;
      }
    },
    filterStageTop(value, c) {
      return value.RANK < 9;
    },
    filterStageBottom(value, c) {
      return value.RANK > 8;
    },
    filterPlayoffOther(value, c) {
      return value.RANK < 9;
    }
  }
};
</script>