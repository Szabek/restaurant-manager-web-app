<template>
  <CContainer>
    <CRow>
      <CCol class="col-12 col-sm-6">
        <CategoryCreate/>
      </CCol>
      <CCol class="col-12 col-sm-6">
        <CategoryList/>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import CategoryList from "@/components/manager/category/CategoryList";
import CategoryCreate from "@/components/manager/category/CategoryCreate";

export default {
  components: {
    CategoryList,
    CategoryCreate
  },
}
</script>

<style scoped>

</style>