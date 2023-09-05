<template>
  <div>
    <date-picker class="mr-2" v-model="startDate" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>
    <date-picker v-model="endDate" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>
    <CChartBar
        :datasets="waitersOrdersDatasets"
        :labels="labels"
    />
  </div>
</template>

<script>
import {CChartBar} from '@coreui/vue-chartjs'
import DatePicker from "vue2-datepicker";
import {getDefaultEndDate, getDefaultStartDate} from "@/utils/dateUtils";
import {mapState} from "vuex";
import 'vue2-datepicker/index.css';

export default {
  components: {
    CChartBar,
    DatePicker
  },
  data() {
    return {
      startDate: getDefaultStartDate(),
      endDate: getDefaultEndDate()
    };
  },
  computed: {
    waitersOrdersDatasets () {
      return [
        {
          label: 'Obsłużone zamówienia',
          backgroundColor: '#f87979',
          data: Object.values(this.waitersStatistics)
        }
      ]
    },
    labels () {
      return Object.keys(this.waitersStatistics).map(key => key);
    },
    ...mapState('statistic', ['waitersStatistics'])
  },
  methods: {
    fetchStatistics() {
      this.$store.dispatch('statistic/fetchWaitersStatistics', {
        startDate: this.startDate,
        endDate: this.endDate
      })
    }
  },
  created() {
    this.fetchStatistics()
  }
}
</script>
