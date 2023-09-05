<template>
  <CContainer>
    <CRow>
      <CCol class="col-12 col-xl-6">
        <DishCreate/>
      </CCol>
      <CCol class="col-12 col-xl-6">
        <DishList/>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import DishList from "@/components/manager/dish/DishList.vue";
import DishCreate from "@/components/manager/dish/DishCreate.vue";

export default {
  components: {
    DishList,
    DishCreate
  },
}
</script>

<style scoped>

</style>