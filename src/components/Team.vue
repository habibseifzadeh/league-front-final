<template>
  <tr>
    <td>{{ team.id }}</td>
    <td>{{ team.name }}</td>
    <td>{{ team.strength }}</td>
    <td>
      <input class="me-2" type="text" placeholder="Name..." v-model="newName">
      <input class="me-2" type="number" placeholder="Strength" v-model="newStrength">
      <button class="btn btn-primary me-2" @click="updateClicked(team.id)">Update</button>
      <button class="btn btn-danger" @click="deleteClicked(team.id)">Delete</button>
    </td>
  </tr>

</template>

<script>
import axios from "axios";

export default {
  name: "Team",
  props: ['team'],
  data() {
    return {
      newName: '',
      newStrength: ''
    }
  },
  methods: {
    deleteClicked(id) {
      axios.delete(`team/${id}`).then((r) => {
        if(r.data === 1) {
          this.$emit('teamChanged');
        } else {
          alert('Could not remove the team!');
        }
      });
    },
    updateClicked(id) {
      if(this.newStrength < 0 || this.newStrength > 5) {
        alert('Strength must be between 0 to 5!');
        return;
      }
      axios.put(`team/${id}`, {
        name: this.newName,
        strength: this.newStrength
      }).then(() => {
        this.newName = '';
        this.newStrength = '';
        this.$emit('teamChanged');
      });
    }
  }
}
</script>

<style scoped>

</style>