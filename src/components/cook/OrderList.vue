<template>
  <div class="template-wrapper">
    <CListGroup class="order-list-group">

      <CListGroupItem class="list-header">
        <h1>{{ order.table.name }}</h1>
        <h4>{{getStartTime(order)}}</h4>
        <div class="mb-2">
          <b-button @click="updateOrder" class="order-is-ready font-weight-bold w-100 p-3 order-card-button">
            Wydaj całość
          </b-button>
        </div>
        <div>
          <b-button class="call-waiter font-weight-bold w-100 p-3 order-card-button"
                    @click="setReadyToServe(order.id, true)">
            Zawołaj kelnera
          </b-button>
        </div>
      </CListGroupItem>

      <CListGroupItem
          v-for="item in sortedOrderItems" :key="item.id"
          @click="toggleDishReady(item)"
          class="order-item"
      >
        <h4 class="text-break">
          {{ item.dish.name }}
          <div class="float-right">
            <b-badge :class="{'ready-background': item.ready}" variant="primary">{{ item.quantity }}</b-badge>
          </div>
        </h4>
        <c-card-img :src="STORAGE_URL + item.dish.image" alt="Image"
                    class="rounded-1 m-2 w-50 order-image"></c-card-img>
      </CListGroupItem>
    </CListGroup>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {STORAGE_URL} from "/constans";

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      STORAGE_URL: STORAGE_URL
    }
  },
  computed: {
    sortedOrderItems() {
      return this.order.orderItems.slice().sort((a, b) => {
        if (a.ready && !b.ready) {
          return 1;
        } else if (!a.ready && b.ready) {
          return -1;
        } else {
          return this.order.orderItems.indexOf(a) - this.order.orderItems.indexOf(b);
        }
      });
    },
    ...mapState('order', ['dishes'])
  },
  methods: {
    toggleDishReady(item) {
      item.ready = !item.ready
      this.checkAllReady()
    },
    checkAllReady() {
      const allReady = this.order.orderItems.every(orderItem => orderItem.ready);
      if (allReady) {
        this.updateOrder();
      }
    },
    updateOrder() {
      const totalPrice = this.order.orderItems.reduce((acc, orderItem) => {
        return acc + orderItem.dish.price * orderItem.quantity;
      }, 0).toFixed(2);

      const orderItemsRequest = this.order.orderItems.map((orderItem) => {
        return {
          dishId: orderItem.dish.id,
          quantity: orderItem.quantity,
          ready: true
        };
      });

      this.$store.dispatch('order/updateOrder', {
        id: this.order.id,
        userId: this.order.userId,
        tableId: this.order.table.id,
        orderItems: orderItemsRequest,
        isStartedProcessing: true,
        status: 'READY',
        isReadyToServe: true,
        totalPrice: totalPrice
      }).then(() => {
        this.$store.dispatch('order/fetchOrdersByStatus', 'IN_PROGRESS')
      })
    },
    setReadyToServe(id, isReady) {
      this.$store.dispatch('order/setReadyToServe', {
        id: id,
        isReady: isReady
      })
    },
    getStartTime(order) {
      const startTime = new Date(order.orderProcessingStart);
      const timeString = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return timeString;
    },
  },
}

</script>

<style scoped>
  .template-wrapper {
    max-width: 50%;
    min-width: 300px;
    width: 30%;
    margin: 0 auto;
  }
.list-header {
  background-color: #C6C2BD;
}
.ready-background {
  background-color: darkgreen;
}
.order-list-group {
  max-width: 320px;
}
.order-card-button {
  background-color: #3E2F2E;
}


.order-is-ready{
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #FFF9F2 !important;
}
.order-is-ready:active{
  background-color: #FFF9F2 !important;
  color: #3E2F2E !important;
}
order-is-ready:after{
  color: #FFF9F2 !important;
}

.call-waiter{
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #FFF9F2 !important;
}
.call-waiter:active {
  background-color: #FFF9F2 !important;
  color: #3E2F2E !important;
}
.call-waiter:after {
  color: #FFF9F2 !important;
}

</style>