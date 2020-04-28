<template>
  <div class="bugTable">
    <b-table
      class="table m-0 table-striped table-sm table-hover table-responsive table-bordered p-0"
      :fields="fields"
    >
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
        <tr v-for="bug in filterBugs" :key="bug.id" :bugData="bug" @click="goToBug(bug)">
          <td>{{bug.title}}</td>
          <td>{{bug.creator.name}}</td>
          <td :class="{'table-success': bug.closed, 'table-danger': !bug.closed }">{{bug.closed}}</td>
          <td>{{bug.updatedAt}}</td>
        </tr>
      </tbody>
      <!-- <template v-slot:cell(subject)="bug in bugs"> -->
    </b-table>
  </div>
</template>


<script>
import Bug from "../components/Bug.vue";
export default {
  name: "bugTable",
  data() {
    return {
      filterBugs: [],
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
      this.filterBugs = this.bugs;
    },
    filterClosed() {
      this.filterChoice = "Closed";
      this.filterBugs = this.bugs.filter(x => x.closed == true);
    },
    filterOpen() {
      this.filterChoice = "Open";
      this.filterBugs = this.bugs.filter(x => x.closed == false);
    }
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  created() {
    this.getBugs();
    this.filterBugs = this.bugs;
  },
  components: { Bug }
};
</script>


<style scoped>
</style>