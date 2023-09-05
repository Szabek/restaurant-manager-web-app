<template>
  <b-container>
    <div v-if="loading" class="d-flex justify-content-center mb-3">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <b-row>
      <b-col v-for="table in userActiveTables" :key="table.id" sm="12" md="6" xl="4">
        <TableCard :table="table" :statuses="getStatusesForTable(table)"></TableCard>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TableCard from "@/components/waiter/TableCard.vue";
import {mapState} from "vuex";

export default {
  components: {
    TableCard
  },
  data() {
    return {
      loading: true,
      userActiveTables: []
    }
  },
  computed: {
    ...mapState('user', ['currentUser']),
    ...mapState('order', ['ordersStatuses']),
    ...mapState('order', ['orders'])
  },
  created() {
    this.$store.dispatch('table/fetchTables')
    this.$store.dispatch('user/fetchCurrentUser')
        .then(() => this.userActiveTables = this.currentUser.tables.filter(table => table.isActive))
        .then(() => this.loading = false)
    this.$store.dispatch('order/fetchAllOrdersStatuses', )
        .then(() => {
          this.startOrderUpdateInterval();
        });
    this.$store.dispatch('order/fetchAllOpenedOrders')
  },
  beforeDestroy() {
    this.stopOrderUpdateInterval();
  },
  methods: {
    startOrderUpdateInterval() {
      this.orderUpdateInterval = setInterval(() => {
        this.fetchOrders();
      }, 10000);
    },
    stopOrderUpdateInterval() {
      clearInterval(this.orderUpdateInterval);
    },
    fetchOrders() {
      this.$store.dispatch('order/fetchAllOrdersStatuses')
    },
    getStatusesForTable(table) {
      if (this.ordersStatuses.length) {
        return this.ordersStatuses.find(status => status.tableId === table.id) || {};
      } else {
        return {}
      }
    }
  },
}

</script>

<style scoped>

</style>