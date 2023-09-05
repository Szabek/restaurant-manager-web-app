<template>
  <div>
    <div class="text-center">
      <h1>Zamówienie</h1>
    </div>
    <CListGroup class="list-container">
      <CListGroupItem v-for="dish in this.orderToEdit.dishes" :key="dish.id">
        <c-row>
          <c-col col="9">
            <h5>{{ dish.name }}</h5>
            {{ totalPricePrint(dish.price, dish.quantity) }}
            | {{ dish.quantity }}
          </c-col>
          <c-col col="3">
            <b-button v-if="!dish.ready" @click="removeDishFromOrder(dish)" class="float-right" pill size="lg" variant="danger">
              &#10005;
            </b-button>
          </c-col>
        </c-row>
      </CListGroupItem>
    </CListGroup>
    <div class="button-container rounded-4 p-2 text-center">
      <b-button @click="updateOrder" pill size="lg" variant="success">Gotowe</b-button>
      <b-button @click="redirectToWaiterPage" class="ml-1" pill size="lg" variant="danger">Anuluj</b-button>
      <b-button @click="finishOrder" class="close-button ml-1" pill size="lg">Zamknij</b-button>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import router from "@/router";

export default {
  data() {
    return {
      dishList: []
    }
  },
  props: {
    orderId: {
      required: true
    },
  },
  computed: {
    ...mapState('order', ['orderToEdit'])
  },
  created() {
    this.$store.dispatch('order/fetchOrderToEdit', this.orderId)
        .then(() => this.dishList = this.orderToEdit.dishes)
  },
  methods: {
    totalPricePrint(price, quantity) {
      return price * quantity;
    },
    updateOrder() {
      const orderItems = this.createOrderItems(this.orderToEdit.dishes);
      const totalPrice = this.orderToEdit.dishes.reduce((acc, dish) => acc + dish.price * dish.quantity, 0).toFixed(2);

      this.$store.dispatch('order/updateOrder', {
        id: this.orderToEdit.id,
        userId: this.orderToEdit.user.id,
        tableId: this.orderToEdit.table.id,
        orderItems: orderItems,
        isStartedProcessing: true,
        status: 'IN_PROGRESS',
        isReadyToServe: false,
        totalPrice: totalPrice
      }).then(() => this.redirectToWaiterPage())
    },
    finishOrder() {
      const orderItems = this.createOrderItems(this.orderToEdit.dishes);
      const totalPrice = this.orderToEdit.dishes.reduce((acc, dish) => acc + dish.price * dish.quantity, 0);

      this.$store.dispatch('order/updateOrder', {
        id: this.orderToEdit.id,
        userId: this.orderToEdit.user.id,
        tableId: this.orderToEdit.table.id,
        orderItems: orderItems,
        isStartedProcessing: true,
        status: 'CLOSED',
        isReadyToServe: false,
        totalPrice: totalPrice
      }).then(() => this.redirectToWaiterPage())
    },
    removeDishFromOrder(dish) {
      this.$store.dispatch('order/removeDishFromOrderToEdit', dish)
    },
    redirectToWaiterPage() {
      router.push('/waiter')
    },
    createOrderItems(dishes) {
      return dishes.map(dish => {
        return {
          dishId: dish.id,
          quantity: dish.quantity,
          ready: dish.ready || false
        };
      });
    }
  }
}
</script>

<style scoped>
.button-container {
  background: rgba(0, 0, 0, 0.3);
  position: sticky;
  bottom: 1rem;
}

.list-container {
  min-height: 80vh;
}

.close-button {
  background-color: #fd7e14;
  border: 0;
}

.text-center {
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 0;
}

h5 {
  margin-top: 0;
}

.c-row {
  align-items: center;
  justify-content: space-between;
}
</style>