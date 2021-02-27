<template>
  <div id="timetable" class="container">
    <div class="my-4 card">
      <div class="card-header">Timetable</div>
      <div class="card-body row">
        <timetable-days :schedule-updated="scheduleUpdated" @dayChanged="dayChanged"></timetable-days>
        <time-table-of-one-day :schedule-updated="scheduleUpdated" :day="selectedDay"></time-table-of-one-day>
      </div>
    </div>
  </div>
</template>

<script>
import TimetableDays from "@/components/TimetableDays";
import TimeTableOfOneDay from "@/components/TimeTableOfOneDay";

export default {
  name: "Timetable",
  components: {TimeTableOfOneDay, TimetableDays},
  props: ['scheduleUpdated'],
  data() {
    return {
      selectedDay: 0
    }
  },
  methods: {
    dayChanged(day) {
      this.selectedDay = day;
    }
  }
}
</script>

<style scoped>

</style>