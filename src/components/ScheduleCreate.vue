<template>
  <div id="schedule-create">
    <div :class="'alert ' + messageClass">{{ message }}</div>
    <button :disabled="scheduledDays > 0" class="me-2 btn btn-success" @click="scheduleClicked">Schedule All Days!</button>
    <button
        :class="'me-2 btn ' + (currentDay > days ? 'btn-danger' : 'btn-success')"
        :disabled="scheduledDays == days || scheduledDays > currentDay"
        @click="scheduleOneDayClicked">
      {{ scheduledDays == days ? 'Finished' : 'Play Day ' + currentDay }}
    </button>
    <button class="me-2 btn btn-danger" :disabled="scheduledDays == 0" @click="deleteClicked">Delete Schedule!</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ScheduleCreate",
  data() {
    return {
      scheduledDays: 0,
      days: 1,
      currentDay: 1,
      messageClass: 'alert-warning',
      message: 'Please note that clicking on the "Start Schedule!" button causes previous schedules to be removed!'
    }
  },
  methods: {
    scheduleClicked() {
      axios.get('/championship/schedule').then(r => {
        this.processScheduleOutput(r);
      });
    },
    scheduleOneDayClicked() {
      axios.get(`/championship/scheduleTillDay/${this.currentDay}`).then(r => {
        this.currentDay++;
        this.processScheduleOutput(r);
      });
    },
    processScheduleOutput(r) {
      this.setScheduledDays();
      if (r.data.error == 1) {
        this.messageClass = 'alert-danger';
      } else {
        this.$emit('scheduleUpdated');
        this.messageClass = 'alert-info';
      }
      this.message = r.data.message;
    },
    deleteClicked() {
      axios.get('championship/truncate').then(() => {
        this.$emit('scheduleUpdated');
        this.setScheduledDays();
        this.currentDay = 1;
        this.message = 'Schedule deleted!';
        this.messageClass = 'alert-info';
      });
    },
    setScheduledDays() {
      axios.get('championship/days').then(r => {
        this.scheduledDays = r.data.length;
        this.currentDay = this.scheduledDays + 1;
      });
    }
  },
  mounted() {
    axios.get('team/count').then(r => {
      this.days = r.data - 1;
    });
    this.setScheduledDays();
  }
}
</script>

<style scoped>

</style>