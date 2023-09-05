<template>
  <CContainer>
    <CRow>
      <CCol class="col-12 col-xl-6">
        <TableCreate/>
      </CCol>
      <CCol class="col-12 col-xl-6">
        <TableList/>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import TableList from "@/components/manager/table/TableList.vue";
import TableCreate from "@/components/manager/table/TableCreate.vue";

export default {
  components: {
    TableList,
    TableCreate
  },
}
</script>

<style scoped>

</style>