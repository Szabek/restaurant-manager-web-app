<template>
  <CContainer>
    <CRow>
      <CCol class="col-12 col-sm-6">
        <IngredientCreate/>
      </CCol>
      <CCol class="col-12 col-sm-6">
        <IngredientList/>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import IngredientList from "@/components/manager/ingredient/IngredientList.vue";
import IngredientCreate from "@/components/manager/ingredient/IngredientCreate.vue";

export default {
  components: {
    IngredientList,
    IngredientCreate
  },
}
</script>

<style scoped>

</style>