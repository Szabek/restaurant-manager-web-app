<template>
  <CContainer>
    <CRow>
      <CCol class="col-12 col-sm-6">
        <UnitCreate/>
      </CCol>
      <CCol class="col-12 col-sm-6">
        <UnitList/>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import UnitList from "@/components/manager/unit/UnitList.vue";
import UnitCreate from "@/components/manager/unit/UnitCreate.vue";

export default {
  components: {
    UnitList,
    UnitCreate
  },
}
</script>

<style scoped>

</style>