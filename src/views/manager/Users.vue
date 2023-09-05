<template>
  <CContainer>
    <CRow>
      <CCol class="col-12 col-xl-6">
        <UserCreate/>
      </CCol>
      <CCol class="col-12 col-xl-6">
        <UserList/>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import UserList from "@/components/manager/user/UserList.vue";
import UserCreate from "@/components/manager/user/UserCreate.vue";

export default {
  components: {
    UserList,
    UserCreate
  },
}
</script>

<style scoped>

</style>