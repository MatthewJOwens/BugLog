<template>
  <div class="home container-fluid text-center">
    <div v-if="!this.$auth.isAuthenticated">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Welcome to BugLog</h1>
      <h4>Track your team's bug inside.</h4>
      <p>Log in to get access to your team's log.</p>
    </div>
    <div class="row d-flex" v-else>
      <table
        class="col-10 table table-striped table-sm table-hover table-responsive table-bordered"
      >
        <thead class="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Reported By</th>
            <th scope="col">Status</th>
            <th scope="col">Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bug in bugs" :key="bug.id" :bugData="bug">
            <td>{{bug.title}}</td>
            <td>{{bug.creator.name}}</td>
            <td :class="{'table-success': bug.closed, 'table-danger': !bug.closed }">{{bug.closed}}</td>
            <td>{{bug.updatedAt}}</td>
          </tr>
        </tbody>
      </table>
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
      pageBugs: []
    };
  },
  methods: {
    getBugs() {
      this.$store.dispatch("getBugs");
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
