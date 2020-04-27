import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curUser: {
      username: "",
      password: "",
      key: "",
      usergroup: ""
    }
  },
  mutations: {
    setCurUser(state, curUser) {
      state.curUser = { ...curUser };
    }
  },
  actions: {
    updateCurUser(context, curUser) {
      context.commit("setCurUser", curUser);
    }
  },
  getters: {
    getCurUserGroup(state) {
      return state.curUser.usergroup;
    },
    getCurUserKey(state) {
      return state.curUser.key;
    },
    getCurUser(state) {
      return state.curUser;
    }
  },
  modules: {}
});
