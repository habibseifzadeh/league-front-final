<template>
  <div id="results" class="container">
    <div class="my-4 card col-8 mx-auto">
      <div class="card-header">Results</div>
      <div class="card-body table-responsive">
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Award</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="team in teams" :key="team.id">
            <td>{{team.id}}</td>
            <td>{{team.name}}</td>
            <td>{{team.award}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Results",
  props: ['scheduleUpdated'],
  watch: {
    scheduleUpdated() {
      this.fetchData();
    }
  },
  data() {
    return {
      teams: []
    }
  },
  methods: {
    fetchData() {
      axios.get('team/allAwards').then( r => {
        this.teams = r.data;
        this.teams.sort((t1, t2) => {
          return t1.award < t2.award ? 1 : -1;
        });
      })
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>

</style>