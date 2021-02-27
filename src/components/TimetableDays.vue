<template>
  <div class="col-4">
    <div class="list-group">
      <button
          v-for="day in days"
          :id="'day-' + day.day"
          type="button"
          class="list-group-item list-group-item-action"
          @click="dayClicked(day)"
          :key="day.day">
        Day {{day.day}}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TimetableDays",
  props: ['scheduleUpdated'],
  watch: {
    scheduleUpdated() {
      this.fetchData();
    }
  },
  data() {
    return {
      days: []
    }
  },
  methods: {
    fetchData() {
      axios.get('/championship/days').then(r => {
        this.days = r.data;
      });
    },
    dayClicked(day) {
      const allButtons = document.querySelectorAll('button[id^="day-"]');
      allButtons.forEach(b => {
        b.classList.remove('active');
      });
      document.getElementById('day-' + day.day).classList.add('active');
      this.$emit('dayChanged', day.day);
    }
  },
  mounted() {
    this.fetchData();
  }

}
</script>

<style scoped>

</style>