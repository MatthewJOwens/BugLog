<template>
  <div class="home container-fluid text-center justify-content-center d-flex">
    <div v-if="!this.$auth.isAuthenticated">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Welcome to BugLog</h1>
      <h4>Track your team's bug inside.</h4>
      <p>Log in to get access to your team's log.</p>
    </div>
    <div class="row justify-content-center w-100" v-else>
      <div class="col-10 p-0 m-1">
        <table
          class="row table m-0 table-striped table-sm table-hover table-responsive table-bordered p-0"
        >
          <thead class="thead-dark">
            <tr>
              <th class="w-25">Title</th>
              <th class="w-25">Reported By</th>
              <th class="w-25">Status</th>
              <th class="w-25">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bug in bugs" :key="bug.id" :bugData="bug" @click="goToBug(bug)">
              <td>{{bug.title}}</td>
              <td>{{bug.creator.name}}</td>
              <td
                :class="{'table-success': bug.closed, 'table-danger': !bug.closed }"
              >{{bug.closed}}</td>
              <td>{{bug.updatedAt}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-primary" @click="getBugs()">Get Bugs</button>
      </div>
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug.vue";
export default {
  name: "home",
  data() {
    return {
      // pageBugs: []
    };
  },
  methods: {
    getBugs() {
      this.$store.dispatch("getBugs");
    },
    goToBug(bug) {
      this.$router.push("bugs/" + bug.id);
    }
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  created() {
    this.getBugs();
  },
  components: { Bug }
};
</script>
