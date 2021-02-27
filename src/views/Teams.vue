<template>
  <div id="teams" class="container">
    <div id="teams-creation" class="py-3">
      <button class="btn btn-success" @click="addClicked">Add Team</button>
      <team-create v-if="creationMode === true" @teamAdded="teamAdded"></team-create>
    </div>
    <div id="teams-table" class="table-responsive">
      <table class="table table-hover table-striped">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Strength</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <team v-for="team in teams" :team="team" :key="team.id" @teamChanged="fetchData">
        </team>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Team from "@/components/Team";
import TeamCreate from "@/components/TeamCreate";

export default {
  name: 'Home',
  components: {TeamCreate, Team},
  data() {
    return {
      teams: [],
      creationMode: false
    }
  },
  methods: {
    fetchData() {
      axios.get('/team').then(r => {
        this.teams = r.data;
      });
    },
    addClicked() {
      axios.get('/championship/count').then(r => {
        if(r.data == 0) {
          this.creationMode = true;
          return;
        }
        if(confirm('Adding a team in the middle of games not possible, Are you sure to delete the schedule?')) {
          axios.get('/championship/truncate').then(() => {
            this.creationMode = true;
          });
        }
      });
    },
    teamAdded() {
      this.creationMode = false;
      this.fetchData();
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
#teams-creation {
  text-align: left;
}
</style>
