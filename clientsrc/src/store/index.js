import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setActiveBug(state, bug) {
      state.activeBug = bug
    },
    setNotes(state, notes) {
      state.notes = notes
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit, dispatch }, query) {
      try {
        let res = await api.get('bugs')
        commit("setBugs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getBugDetails({ commit, dispatch }, bugId) {
      try {
        let res = await api.get("bugs/" + bugId)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getNotes({ commit, dispatch }, bugId) {
      try {
        let res = await api.get("bugs/" + bugId + "/notes")
        commit("setNotes", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async modifyBug({ commit, dispatch }, activeBug) {
      try {
        let res = await api.put("bugs/" + activeBug.id, activeBug)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createNote({ commit, dispatch }, newNote) {
      try {
        let res = await api.post("notes", newNote)
        dispatch("getNotes", newNote.bug)
      } catch (error) {
        console.error(error)
      }
    },
    async destroyNote({ commit, dispatch }, noteData) {
      try {
        await api.delete("notes/" + noteData.id)
        dispatch("getNotes", noteData.bug)
      } catch (error) {
        console.error(error)
      }
    }
  }
});
