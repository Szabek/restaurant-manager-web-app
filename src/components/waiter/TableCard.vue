<template>
  <b-card
      class="table-card rounded-3 text-center"
      header="featured"
      header-tag="header"
      title=""
  >
    <template #header>
      <div class="d-flex align-items-center justify-content-between">
        <h2 class="mb-0">
          <b-badge variant="primary">{{ currentTable.seatsNumber }}</b-badge>  {{ currentTable.name }}
        </h2>
        <span v-if="statuses && statuses.isReadyToServe === true" @click="setServeStatus(statuses.id, false)">
          <CIcon class="warning-icon ml-2" size="xl" :content="$options.warningIcon"></CIcon>
        </span>
      </div>
    </template>

    <b-card-text v-on:click="processOrder">
      <b-card class="rounded-3 text-center mb-1" v-bind:style="{ backgroundColor: cardButtonColor }">
        <b-card-text class="font-weight-bold">
          {{ cardButtonText }}
        </b-card-text>
      </b-card>
    </b-card-text>
  </b-card>
</template>


<script>

import {mapState} from "vuex";
import { cilWarning } from '@coreui/icons'

export default {
  warningIcon: cilWarning,
  props: {
    table: {
      type: Object,
      required: true,
    },
    statuses: {
      type: Object,
      required: true,
    }
  },
  computed: {
    cardButtonText() {
      if (this.currentTable.isOccupied) {
        return 'Edytuj'
      } else {
        return 'Rezerwuj'
      }
    },
    cardButtonColor() {
      if (this.currentTable.isOccupied) {
        if (this.statuses.status) {
          switch(this.statuses.status) {
            case "IN_PROGRESS":
              return 'cornflowerblue'
            case "READY":
              return 'darkblue'
          }
        }
        return '#ff8f37'
      } else {
        return 'darkgreen'
      }
    },
    ...mapState('user', ['currentUser']),
    ...mapState('order', ['orders'])
  },
  data() {
    return {
      currentTable: {},
      order: {
        userId: '',
        tableId: ''
      }
    }
  },
  methods: {
    processOrder() {
      if (this.currentTable.isOccupied) {
        this.editOrder()
      } else {
        this.openOrder()
      }
    },
    openOrder() {
      this.$store.dispatch('order/createOrder', this.order)
          .then(() => this.bookTable())
    },
    editOrder() {
      const order = this.orders.find(order => order.table.id === this.table.id);
      this.$router.push({path: `/waiter/order/${order.id}`})
    },
    bookTable() {
      this.currentTable.isOccupied = true
      this.$store.dispatch('table/updateTable', this.currentTable)
          .then(() => {
            this.currentTable.isOccupied = true
          })
    },
    createTableObject() {
      return {
        id: this.table.id,
        name: this.table.name,
        seatsNumber: this.table.seatsNumber,
        isActive: this.table.isActive,
        isOccupied: this.table.isOccupied
      }
    },
    setServeStatus(id, isReady) {
      this.$store.dispatch('order/setReadyToServe', {
        id: id,
        isReady: isReady
      }).then(() => {
        this.$store.dispatch('order/fetchAllOrdersStatuses')
      })
    }
  },
  created() {
    this.order.tableId = this.table.id
    this.order.userId = this.currentUser.id
    this.currentTable = this.createTableObject()
  }
}
</script>

<style scoped>
.table-card {
  background-color: #3E2F2E;
  color: #FFF9F2;
}

.table-card:hover {
  opacity: 0.9;
  color: #FFF9F2;
}
.warning-icon{
  color: red;
}
</style>