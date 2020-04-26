<template>
  <div class="home container-fluid text-center">
    <div v-if="!this.$auth.isAuthenticated">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Welcome to BugLog</h1>
      <h4>Track your team's bug inside.</h4>
      <p>Log in to get access to your team's log.</p>
    </div>
    <div v-else>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Reported By</th>
            <th scope="col">Status</th>
            <th scope="col">Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <Bug v-for="bug in bugs" :key="bug.id" :bugData="bug" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
