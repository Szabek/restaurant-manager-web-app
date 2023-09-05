<template>
  <CContainer>
    <CRow>
      <CCol sm="12" xl="6">
        <OrdersChart></OrdersChart>
      </CCol>
      <CCol sm="12" xl="6">
        <TotalPriceLineChart></TotalPriceLineChart>
      </CCol>
    </CRow>
    <CRow class="mt-4">
      <CCol sm="12" xl="6">
        <TrafficLineChart></TrafficLineChart>
      </CCol>
      <CCol sm="12" xl="6">
        <WaiterBarChart></WaiterBarChart>
      </CCol>
    </CRow>
    <CRow class="mt-4">
      <CCol sm="12" xl="6">
        <DishBarChart></DishBarChart>
      </CCol>
      <CCol sm="12" xl="6">
        <IngredientBarChart></IngredientBarChart>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import OrdersChart from "@/components/manager/statistics/OrdersBarChart.vue";
import TotalPriceLineChart from "@/components/manager/statistics/TotalPriceLineChart.vue";
import WaiterBarChart from "@/components/manager/statistics/WaiterBarChart.vue";
import DishBarChart from "@/components/manager/statistics/DishBarChart.vue";
import IngredientBarChart from "@/components/manager/statistics/IngredientBarChart.vue";
import TrafficLineChart from "@/components/manager/statistics/TrafficLineChart.vue";

export default {
  components: {
    OrdersChart,
    TotalPriceLineChart,
    WaiterBarChart,
    DishBarChart,
    IngredientBarChart,
    TrafficLineChart
  }
}
</script>

<style scoped>
.mx-datepicker {
  width: 140px !important;
}

</style>