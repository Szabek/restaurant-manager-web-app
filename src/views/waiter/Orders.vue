<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col sm="12" md="6">
        <MenuList></MenuList>
      </b-col>
      <b-col sm="12" md="6">
        <OrderEdit :order-id="this.id"></OrderEdit>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import MenuList from "@/components/waiter/MenuList.vue";
import OrderEdit from  "@/components/waiter/OrderEdit.vue"

export default {
  components: {
    MenuList,
    OrderEdit
  },
  props: {
    id: {
      required: true,
    }
  },
}
</script>

<style scoped>

</style>