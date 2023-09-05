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
      startDate: getDefaultStartDate(),
      endDate: getDefaultEndDate()
    };
  },
  computed: {
    ordersDatasets () {
      return [
        {
          label: 'Dochód',
          backgroundColor: 'rgb(0,216,255,0.9)',
          data: Object.values(this.totalPriceStatistics)
        }
      ]
    },
    labels () {
      return Object.keys(this.totalPriceStatistics).map(key => key);
    },
    ...mapState('statistic', ['totalPriceStatistics'])
  },
  methods: {
    fetchStatistics() {
      this.$store.dispatch('statistic/fetchTotalPriceStatistics', {
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
