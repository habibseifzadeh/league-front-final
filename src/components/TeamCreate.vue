<template>
  <div id="team-create" class="py-2">
    <label>Name:</label>
    <input type="text" class="form-control mb-2" v-model="name">
    <label>Strength:</label>
    <input type="number" class="form-control mb-2" v-model="strength" placeholder="0 to 5">
    <button class="btn btn-primary me-2" @click="addClicked">Add Team</button>
    <button class="btn btn-secondary" @click="$emit('teamAdded')">Cancel</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeamCreate",
  data() {
    return {
      name: '',
      strength: 3
    }
  },
  methods: {
    addClicked() {
      if(this.strength < 0 || this.strength > 5) {
        alert('Strength must be between 0 to 5');
        return;
      }
      axios.post('/team', {
        name: this.name,
        strength: this.strength
      }).then(() => {
        this.$emit('teamAdded');
      });
    }
  }
}
</script>

<style scoped>

</style>