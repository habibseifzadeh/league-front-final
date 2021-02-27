<template>
  <div class="col-8 table-responsive">
    <table class="table table-hover table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Goals</th>
        <th>Award</th>
        <th>Name</th>
        <th>Goals</th>
        <th>Award</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in games" :key="game.id">
        <td :class="game.first_team_award > 1 ? 'my-bg-success' : game.first_team_award == 1 ? 'my-bg-warning' : 'my-bg-danger'">{{game.first_team_name}}</td>
        <td :class="game.first_team_award > 1 ? 'my-bg-success' : game.first_team_award == 1 ? 'my-bg-warning' : 'my-bg-danger'">{{game.first_team_goals}}</td>
        <td :class="game.first_team_award > 1 ? 'my-bg-success' : game.first_team_award == 1 ? 'my-bg-warning' : 'my-bg-danger'">{{game.first_team_award}}</td>
        <td :class="game.second_team_award > 1 ? 'my-bg-success' : game.second_team_award == 1 ? 'my-bg-warning' : 'my-bg-danger'">{{game.second_team_name}}</td>
        <td :class="game.second_team_award > 1 ? 'my-bg-success' : game.second_team_award == 1 ? 'my-bg-warning' : 'my-bg-danger'">{{game.second_team_goals}}</td>
        <td :class="game.second_team_award > 1 ? 'my-bg-success' : game.second_team_award == 1 ? 'my-bg-warning' : 'my-bg-danger'">{{game.second_team_award}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TimeTableOfOneDay",
  props: ['day', 'scheduleUpdated'],
  watch: {
    day() {
      this.fetchData();
    },
    scheduleUpdated() {
      this.games = [];
    }
  },
  data() {
    return {
      games: []
    }
  },
  methods: {
    fetchData() {
      if(this.day != 0) {
        axios.get(`/championship/oneDay/${this.day}`).then(r => {
          this.games = r.data;
        });
      } else {
        this.games = [];
      }
    }
  }

}
</script>

<style scoped>
.my-bg-warning {
  background-color: #feffcf;
}

.my-bg-success {
  background-color: #e5ffca;
}

.my-bg-danger {
  background-color: #ffddd6;
}

</style>