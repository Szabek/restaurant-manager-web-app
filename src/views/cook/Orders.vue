<template>
  <div class="order-list-container d-flex overflow-x-auto">
    <div v-for="order in this.orders" :key="order.id" class="order-item">
      <OrderList :order="order"></OrderList>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import OrderList from '@/components/cook/OrderList.vue'

  export default {
    components: {
      OrderList
    },
    data() {
      return {
        loading: true
      }
    },
    computed: {
      ...mapState('order', ['orders'])
    },
    created() {
      this.$store.dispatch('order/fetchOrdersByStatus', 'IN_PROGRESS')
        .then(() => {
          this.loading = false
          this.startOrderUpdateInterval();
        });
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
        this.$store.dispatch('order/fetchOrdersByStatus', 'IN_PROGRESS')
      },
    },
  }
</script>

<style scoped>
.order-list-container {
  white-space: nowrap;
  overflow-x: scroll;
  height: 90vh;
  overflow-y: auto;
}

.order-item {
  margin-right: 20px;
  padding: 10px;
  background-color: #f1f1f1;
}

.order-list-container::-webkit-scrollbar {
  height: 10px;
  width: 10px;
  background-color: #f0f0f0;
}

.order-list-container::-webkit-scrollbar-thumb {
  background-color: #7C746C;
  border-radius: 5px;
}

.order-list-container::-webkit-scrollbar-thumb:hover {
  background-color: #3E2F2E;
}
</style>