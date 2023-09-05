<template>
  <div>
    <date-picker class="mr-2" v-model="startDate" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>
    <date-picker v-model="endDate" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>

    <CChartBar
        :datasets="dishesOrdersDatasets"
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
    dishesOrdersDatasets () {
      return [
        {
          label: 'Wydane dania',
          backgroundColor: '#4b2311',
          data: Object.values(this.dishesStatistics)
        }
      ]
    },
    labels () {
      return Object.keys(this.dishesStatistics).map(key => key);
    },
    ...mapState('statistic', ['dishesStatistics'])
  },
  methods: {
    fetchStatistics() {
      this.$store.dispatch('statistic/fetchDishesStatistics', {
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
