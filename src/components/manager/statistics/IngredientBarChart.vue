<template>
  <div>
    <date-picker class="mr-2" v-model="startDate" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>
    <date-picker v-model="endDate" valueType="format" :clearable="false" @input="fetchStatistics"></date-picker>
    <CChartBar
        :datasets="ingredientsOrdersDatasets"
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
    ingredientsOrdersDatasets () {
      return [
        {
          label: 'Wydane dania',
          backgroundColor: '#069f13',
          data: Object.values(this.ingredientsStatistics)
        }
      ]
    },
    labels () {
      return Object.keys(this.ingredientsStatistics).map(key => key);
    },
    ...mapState('statistic', ['ingredientsStatistics'])
  },
  methods: {
    fetchStatistics() {
      this.$store.dispatch('statistic/fetchIngredientsStatistics', {
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
