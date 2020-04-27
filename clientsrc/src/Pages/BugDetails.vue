<template>
  <div class="bugDetailsPage container">
    <div class="row" @keyup.esc="editing = false">
      <div class="col-10">
        <button
          :class="{'btn-danger': !activeBug.closed, 'btn-success': activeBug.closed, 'btn': activeBug, 'disabled': activeBug.closed || this.$auth.userInfo.email != activeBug.creatorEmail}"
          @click="closeIfOpen()"
        >Closed: {{activeBug.closed}}</button>
        <button
          v-if="!activeBug.closed && this.$auth.userInfo.email == activeBug.creatorEmail"
          class="btn btn-warning"
          @click="editing = !editing"
        >Edit</button>
        <h2>{{activeBug.title.toUpperCase()}}</h2>
        <div v-if="!editing">
          <h5>{{activeBug.description}}</h5>
        </div>
        <div v-else>
          <textarea v-model="activeBug.description" cols="100" rows="10" />
          <button class="btn btn-outline-dark" @click="editBug()">Submit</button>
        </div>
        <h6>Created:{{activeBug.createdAt}} by {{activeBug.creatorEmail}}</h6>
        <h6>Updated:{{activeBug.updatedAt}}</h6>
      </div>
    </div>
    <br />
    <div class="row">
      <Note class="col-7" v-for="note in notes" :key="note.id" :noteData="note"></Note>
      <div class="col-6">
        <div>-------------------</div>
        <label for="noteForm">Submit Note:</label>
        <input
          type="text"
          v-model="newNote.content"
          name="noteForm"
          size="60"
          @keyup.enter="makeNote()"
        />
      </div>
    </div>
  </div>
</template>


<script>
import Note from "../components/Note.vue";
export default {
  name: "bugDetailsPage",
  data() {
    return {
      editing: false,
      newNote: {}
    };
  },
  components: { Note },
  computed: {
    activeBug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    }
  },
  methods: {
    async closeIfOpen() {
      let confirm = window.confirm(
        "Are you sure you wish to close this bug? (This can not be undone.)"
      );
      if (confirm) {
        this.activeBug.closed = true;
        await this.$store.dispatch("modifyBug", this.activeBug);
      }
    },
    async editBug() {
      await this.$store.dispatch("modifyBug", this.activeBug);
      this.editing = false;
    },
    async makeNote() {
      this.newNote.bug = this.activeBug.id;
      await this.$store.dispatch("createNote", this.newNote);
      this.newNote.content = "";
      await this.$store.dispatch("modifyBug", this.activeBug);
    }
  },
  created() {
    this.$store.dispatch("getBugDetails", this.$route.params.bugId);
    this.$store.dispatch("getNotes", this.$route.params.bugId);
  }
};
</script>


<style scoped>
</style>