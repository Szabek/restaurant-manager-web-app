<template>
  <div>
    <date-picker class="mr-2" v-model="startDate" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>
    <date-picker v-model="endDate" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>
    <CChartLine
        :datasets="ordersDatasets"
        :labels="labels"
    />
  </div>
</template>

<script>
import { getDefaultStartDate, getDefaultEndDate } from '@/utils/dateUtils';
import { CChartLine } from '@coreui/vue-chartjs'
import DatePicker from 'vue2-datepicker';
import {mapState} from "vuex";
import 'vue2-datepicker/index.css';

export default {
  components: {
    CChartLine,
    DatePicker
  },
  data() {
    return {
      startDate: getDefaultStartDate(),
      endDate: getDefaultEndDate()
    };
  },
  computed: {
    ordersDatasets () {
      return [
        {
          label: 'Liczba zamówień',
          backgroundColor: '#f87979',
          data: Object.values(this.ordersCountStatistics)
        }
      ]
    },
    labels () {
      return Object.keys(this.ordersCountStatistics).map(key => key);
    },
    ...mapState('statistic', ['ordersCountStatistics'])
  },
  methods: {
    fetchStatistics() {
      this.$store.dispatch('statistic/fetchOrdersStatistics', {
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
