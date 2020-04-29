<template>
  <div class="bugTable">
    <table class="table m-0 table-striped table-sm table-hover table-responsive table-bordered p-0">
      <thead class="thead-dark">
        <tr>
          <th>Title</th>
          <th>Reported By</th>
          <th>
            <div class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown">{{filterChoice}}</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#" @click="filterAll()">All</a>
                <a class="dropdown-item" href="#" @click="filterClosed()">Closed</a>
                <a class="dropdown-item" href="#" @click="filterOpen()">Open</a>
              </div>
            </div>
          </th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bug in bugs" :key="bug.id" :bugData="bug" @click="goToBug(bug)">
          <td>{{bug.title}}</td>
          <td>{{bug.creator.name}}</td>
          <td :class="{'table-success': bug.closed, 'table-danger': !bug.closed }">{{bug.closed}}</td>
          <td>{{new Date(bug.updatedAt).toDateString()}}</td>
          <!-- bug.updatedAt.split('T')[0] I can break my code like this -->
        </tr>
      </tbody>
      <!-- <template v-slot:cell(subject)="bug in bugs"> -->
    </table>
  </div>
</template>


<script>
import Bug from "../components/Bug.vue";
export default {
  name: "bugTable",
  data() {
    return {
      filterChoice: "Status"
    };
  },
  methods: {
    getBugs() {
      this.$store.dispatch("getBugs");
    },
    goToBug(bug) {
      this.$router.push("bugs/" + bug.id);
    },
    filterAll() {
      this.filterChoice = "Status";
    },
    filterClosed() {
      this.filterChoice = "Closed";
    },
    filterOpen() {
      this.filterChoice = "Open";
    }
  },
  computed: {
    bugs() {
      if (this.filterChoice == "Open") {
        return this.$store.state.bugs.filter(x => x.closed == false);
      } else if (this.filterChoice == "Closed") {
        return this.$store.state.bugs.filter(x => x.closed == true);
      } else {
        return this.$store.state.bugs;
      }
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