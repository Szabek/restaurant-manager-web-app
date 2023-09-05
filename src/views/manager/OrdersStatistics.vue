<template>
  <CContainer>
    <OrdersChart></OrdersChart>


    <TotalPriceLineChart class="mt-5"></TotalPriceLineChart>
  </CContainer>
</template>

<script>
import OrdersChart from "@/components/manager/statistics/OrdersBarChart.vue";
import TotalPriceLineChart from "@/components/manager/statistics/TotalPriceLineChart.vue";

export default {
  components: {
    OrdersChart,
    TotalPriceLineChart
  }
}
</script>

<style scoped>

</style>