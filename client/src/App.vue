<template>
  <div id="app" class="container">
    <Navbar />
    <router-view />
    <PageFooter />
  </div>
</template>

<style>
body {
  background-color: #f2f2f2;
}
.dropdown-menu {
  border-radius: 0rem;
}
#app {
  font-family: "Industry";
}
</style>

<script>
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Navbar, PageFooter },
  beforeMount: async function() {
    if (typeof Storage !== "undefined") {
      let sessionUser = JSON.parse(sessionStorage.getItem("user"));
      if (sessionUser) {
        this.$store.dispatch("updateCurUser", sessionUser);
        return;
      }
      let localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser) {
        this.$store.dispatch("updateCurUser", localUser);
        return;
      }
      await this.getGuest();
    }
  },
  methods: {
    async getGuest() {
      await this.$api
        .get("/api/guest")
        .then(res => {
          this.$store.dispatch("updateCurUser", res.data);
          if (typeof Storage !== "undefined") {
            sessionStorage.setItem("user", JSON.stringify(res.data));
          }
        })
        .catch(err => {
          if ("response" in err) {
            console.log(err.response)
          } else {
            console.log(err);
          }
        });
    }
  },
  computed: {
    ...mapActions(["updateCurUser"])
  }
};
</script>