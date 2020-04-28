<template>
  <div class="home container-fluid text-center justify-content-center d-flex">
    <div v-if="!this.$auth.isAuthenticated">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Welcome to BugLog</h1>
      <h4>Track your team's bug inside.</h4>
      <p>Log in to get access to your team's log.</p>
    </div>
    <div class="row justify-content-center" v-else>
      <!-- Button trigger modal -->
      <div class="col-12">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#addBugModalScrollable"
        >Add Bug</button>
      </div>
      <div class="col-10 p-0 m-1">
        <BugTable />
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addBugModalScrollable"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addBugModalScrollableTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addBugModalScrollableTitle">Add bug to track</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="title">Subject:</label>
            <input
              name="title"
              v-model="newBug.title"
              type="text"
              size="55"
              placeholder="Enter a subject here."
            />
            <label for="description">Description:</label>
            <textarea
              name="description"
              v-model="newBug.description"
              cols="60"
              rows="10"
              placeholder="Enter a description of the bug."
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="addBug()"
            >Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BugTable from "../components/BugTable.vue";
export default {
  name: "home",
  data() {
    return {
      newBug: {}
    };
  },
  computed: {
    activeBug() {
      return this.$store.state.activeBug;
    }
  },
  methods: {
    addBug() {
      this.$store.dispatch("createBug", this.newBug);
    }
  },
  components: { BugTable }
};
</script>
