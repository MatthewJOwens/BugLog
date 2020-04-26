<template>
  <div class="bugComp">
    <tr>
      <td>{{bugData.title}}</td>
      <td>{{bugData.creator.name}}</td>
      <td
        :class="{'table-success': bugData.closed, 'table-danger': !bugData.closed }"
      >{{bugData.closed}}</td>
      <td>{{bugData.updatedAt}}</td>
    </tr>
  </div>
</template>


<script>
export default {
  name: "bugComp",
  props: ["bugData"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>