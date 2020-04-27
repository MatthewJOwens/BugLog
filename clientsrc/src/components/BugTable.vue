<template>
  <div class="bugTable">
    <table class="table m-0 table-striped table-sm table-hover table-responsive table-bordered p-0">
      <thead class="thead-dark">
        <tr>
          <th>Title</th>
          <th>Reported By</th>
          <th>Status</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bug in bugs" :key="bug.id" :bugData="bug" @click="goToBug(bug)">
          <td>{{bug.title}}</td>
          <td>{{bug.creator.name}}</td>
          <td :class="{'table-success': bug.closed, 'table-danger': !bug.closed }">{{bug.closed}}</td>
          <td>{{bug.updatedAt}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import Bug from "../components/Bug.vue";
export default {
  name: "bugTable",
  data() {
    return {};
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


<style scoped>
</style>