<template>
  <CListGroup>
    <CListGroupItem v-for="orderItem in orderItems" :key="orderItem.id">
      {{orderItem.dish.name}} {{orderItem.quantity}}szt. | {{orderItem.dish.price * orderItem.quantity}} zł
    </CListGroupItem>
  </CListGroup>
</template>

<script>

export default {
  props: {
    orderItems: {
      required: true
    },
  }
}
</script>

<style scoped>

</style>
