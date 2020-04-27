<template>
  <div class="noteComp" @mouseover="show=true" @mouseleave="show=false">
    <p class="m-0">{{noteData.content}}</p>
    <p class="p-0 mb-2">
      --{{noteData.creatorEmail}}
      <span
        class="text-danger"
        @click.stop="deleteNote()"
        v-if="noteData.creatorEmail == this.$auth.userInfo.email"
        v-show="show"
      >
        <i class="far fa-trash-alt text-danger"></i>
      </span>
    </p>
  </div>
</template>

//TODO make an emit to update the bug Updated time when a note is deleted
<script>
export default {
  name: "noteComp",
  props: ["noteData"],
  data() {
    return {
      show: false
    };
  },
  computed: {},
  methods: {
    deleteNote() {
      let confirm = window.confirm(
        "Are you sure you wish to delete this note? (This can not be undone.)"
      );
      if (confirm) {
        this.$store.dispatch("destroyNote", this.noteData);
      }
    }
  },
  components: {}
};
</script>


<style scoped>
</style>