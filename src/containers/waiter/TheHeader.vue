<template>
  <CHeader class="justify-content-end" fixed with-subheader light>
    <CHeaderNav class="d-md-down-none mr-auto">
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <div @click="navigateToTablesEdit">
        <b-badge
            class="info-button mr-2 py-2 px-3 rounded-5"
            variant="primary"
        >Stoły</b-badge>
      </div>
      <b-badge
          @click="infoModal = true"
          class="info-button mr-4 py-2 px-3 rounded-5"
          variant="primary"
      >?</b-badge>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CModal
        size="lg"
        color="secondary"
        :show.sync="infoModal"
    >
      <ModalInfoContent></ModalInfoContent>
      <template #footer>
        <CButton
            color="secondary"
            @click="infoModal = false"
        >
          OK
        </CButton>
      </template>
    </CModal>
  </CHeader>
</template>

<script>
import router from "@/router";
import TheHeaderDropdownAccnt from '../TheHeaderDropdownAccnt.vue'
import ModalInfoContent from '@/components/waiter/ModalInfoContent.vue'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt,
    ModalInfoContent
  },
  data() {
    return {
      infoModal: false
    }
  },
  methods: {
    navigateToTablesEdit() {
      router.push('/waiter/tables/edit')
    }
  }
}
</script>

<style scoped>
.info-button:hover {
  background-color: #3E2F2E;
}
</style>