<template>
  <CCard>
    <CCardHeader>
      <strong>Lista Zamówień</strong>
    </CCardHeader>
    <CCardBody>
      <date-picker v-model="startDate" valueType="format" @input="fetchReport"></date-picker>
      <date-picker class="ml-2" v-model="endDate" valueType="format" @input="fetchReport"></date-picker>
      <CDataTable
          :items="itemsInList"
          :fields="fields"
          :loading="loading"
          :items-per-page="20"
          column-filter
          items-per-page-select
          :itemsPerPageSelect="{label: 'Na stronie:'}"
          hover
          sorter
          pagination
      >
        <template #show_details="{item, index}">
          <td class="py-2">
            <CButton
                color="primary"
                variant="ghost"
                square
                size="sm"
                @click="toggleDetails(item, index)"
            >
              {{ Boolean(item._toggled) ? 'Cofnij' : 'Dania' }}
            </CButton>
          </td>
        </template>
        <template #details="{item}">
          <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
            <OrderShow :orderItems="item.orderItems" :toggled="item._toggled"/>
          </CCollapse>
        </template>
      </CDataTable>
      <CButton color="primary" @click="exportToCsv">
        Exportuj do CSV
      </CButton>
    </CCardBody>
  </CCard>

</template>

<script>
import {mapState} from "vuex";
import moment from 'moment';
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import {getDefaultEndDate, getDefaultStartDate} from "@/utils/dateUtils";
import OrderShow from "@/components/manager/analysis/OrderShow.vue";

const fields = [
  {
    key: 'id',
    label: 'ID',
    _style: 'width:5%'
  },
  {
    key: 'totalPrice',
    label: 'Cena Całkowita',
    _style: 'width:10%'
  },
  {
    key: 'orderProcessingStart',
    label: 'Data'
  },
  {
    key: 'duration',
    label: 'Czas trwania ',
    _style: 'width:10%'
  },
  {
    key: 'table',
    label: 'stół'
  },
  {
    key: 'waiter',
    label: 'kelner'
  },
  {
    key: 'dishCount',
    label: 'ilość dań',
    _style: 'width:5%'
  },
  {
    key: 'show_details',
    label: '',
    _style: 'width:15%',
    sorter: false,
    filter: false
  },
]

export default {
  components: {
    DatePicker,
    OrderShow
  },
  data() {
    return {
      loading: true,
      fields: fields,
      details: [],
      collapseDuration: 0,
      startDate: getDefaultStartDate(),
      endDate: getDefaultEndDate()
    }
  },
  computed: {
    itemsInList() {
      return this.orders.map((order, rowId) => {
        const orderProcessingStart = order.orderProcessingStart.split('T')[0];
        const duration = moment.duration(order.duration);
        const hours = Math.floor(duration.asHours());
        const minutes = Math.floor(duration.asMinutes()) % 60;

        return {
          id: order.id,
          duration: hours + 'h ' + minutes + 'm',
          orderProcessingStart: orderProcessingStart,
          dishCount: this.totalQuantity(order.orderItems),
          orderItems: order.orderItems,
          table: order.table.name,
          totalPrice: order.totalPrice,
          waiter: order.userName,
          rowId}
      })
    },
    itemsToCsv() {
      return this.orders.map((order) => {
        const orderProcessingStart = order.orderProcessingStart.split('T')[0];
        const duration = moment.duration(order.duration);
        const hours = Math.floor(duration.asHours());
        const minutes = Math.floor(duration.asMinutes()) % 60;

        return {
          id: order.id,
          duration: hours + 'h ' + minutes + 'm',
          orderProcessingStart: orderProcessingStart,
          dishCount: this.totalQuantity(order.orderItems),
          table: order.table.name,
          totalPrice: order.totalPrice,
          waiter: order.userName
          }
      })
    },
    ...mapState('order', ['orders'])
  },
  methods: {
    toggleDetails(item) {
      item._toggled = !item._toggled
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    },
    exportToCsv() {
      const csvData = this.convertToCsv(this.itemsToCsv);
      const csvFile = new Blob([csvData], {type: 'text/csv'});
      const csvUrl = URL.createObjectURL(csvFile);
      const link = document.createElement('a');
      link.href = csvUrl;
      link.download = 'raport.csv';
      link.click();
      URL.revokeObjectURL(csvUrl);
    },
    convertToCsv(items) {
      const headers = Object.keys(items[0]).join(',') + '\n';
      const csvRows = items.map(item => Object.values(item).join(',')).join('\n');

      return headers + csvRows;
    },
    fetchReport() {
      this.loading = true
      this.$store.dispatch('order/fetchOrdersInRange', {
        startDate: this.startDate,
        endDate: this.endDate,
        status: 'CLOSED'
      }).then(() => {
        this.loading = false
      })
    },
    totalQuantity(orderItems) {
      return orderItems.reduce((sum, orderItem) => sum + orderItem.quantity, 0);
    },
  },
  created() {
    this.fetchReport()
  },
}
</script>

<style scoped>
.card-body {
  background-color: #fffaf8;
}

.card-header {
  background-color: #3E2F2E !important;
  color: #FFF9F2 !important;
}

</style>
