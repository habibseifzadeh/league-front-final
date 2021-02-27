<template>
  <div class="championships container">
    <schedule-create @scheduleUpdated="refresh"></schedule-create>
    <timetable :schedule-updated="scheduleUpdated"></timetable>
    <results :schedule-updated="scheduleUpdated"></results>
  </div>
</template>
<script>
import ScheduleCreate from "@/components/ScheduleCreate";
import Timetable from "@/components/Timetable";
import Results from "@/components/Results";
export default {
  name: 'Championships',
  components: {Results, Timetable, ScheduleCreate},
  data() {
    return {
      scheduleUpdated: 0
    }
  },
  methods: {
    refresh() {
      this.scheduleUpdated++;
    }
  }
}
</script>
<style scoped>
  .championships {
    text-align: left;
  }
</style>