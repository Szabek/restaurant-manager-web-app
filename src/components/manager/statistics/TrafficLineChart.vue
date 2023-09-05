<template>
  <div>
    <date-picker class="mr-2" v-model="date" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>
    <CChartLine
        :datasets="ordersDatasets"
        :labels="labels"
    />
  </div>
</template>

<script>
import { getDefaultEndDate } from '@/utils/dateUtils';
import { CChartLine } from '@coreui/vue-chartjs'
import DatePicker from "vue2-datepicker";
import {mapState} from "vuex";
import 'vue2-datepicker/index.css';

export default {
  components: {
    CChartLine,
    DatePicker
  },
  data() {
    return {
      date: getDefaultEndDate(),
    };
  },
  computed: {
    ordersDatasets () {
      return [
        {
          label: 'Ruch w restauracji',
          backgroundColor: 'rgb(0,216,255,0.9)',
          data: Object.values(this.trafficStatistics)
        }
      ]
    },
    labels () {
      return Object.keys(this.trafficStatistics).map(key => key);
    },
    ...mapState('statistic', ['trafficStatistics'])
  },
  methods: {
    fetchStatistics() {
      this.$store.dispatch('statistic/fetchTrafficStatistics', this.date)
    }
  },
  created() {
    this.fetchStatistics()
  }
}
</script>
