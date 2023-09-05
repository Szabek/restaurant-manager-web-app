<template>
  <CCard>
    <CCardHeader>
      <strong>Lista użytkowników</strong>
    </CCardHeader>
  <CCardBody>
    <CDataTable
        :items="itemsInList"
        :fields="fields"
        :loading="loading"
        :items-per-page="10"
        column-filter
        items-per-page-select
        :itemsPerPageSelect="{label: 'Na stronie:'}"
        hover
        sorter
        pagination
    >
      <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
              color="primary"
              variant="ghost"
              square
              @click="toggleDetails(item, index)"
          >
            {{ Boolean(item._toggled) ? 'Cofnij' : 'Edytuj' }}
          </CButton>
        </td>
      </template>
      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <UserEdit
              :id="item.id"
              :email="item.email"
              :firstname="item.firstname"
              :lastname="item.lastname"
              :role="item.role"
              :tables="item.tables"
              :toggled="item._toggled"
          />
        </CCollapse>
      </template>
    </CDataTable>
  </CCardBody>
  </CCard>
</template>

<script>
import {mapState} from "vuex";
import UserEdit from "@/components/manager/user/UserEdit.vue";

const fields = [
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'firstname',
    label: 'Imie'
  },
  {
    key: 'lastname',
    label: 'Nazwisko'
  },
  {
    key: 'role',
    label: 'Rola'
  },
  {
    key: 'show_details',
    label: '',
    _style: 'width:1%',
    sorter: false,
    filter: false
  },
]

export default {
  components: {
    UserEdit
  },
  data() {
    return {
      loading: true,
      fields: fields,
      details: [],
      collapseDuration: 0
    }
  },
  computed: {
    itemsInList() {
      return this.users.map((user, rowId) => {
        return {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          tables: user.tables,
          rowId}
      })
    },
    ...mapState('user', ['users'])
  },
  created() {
    this.$store.dispatch('user/fetchUsers')
        .then(() => this.loading = false)
  },
  methods: {
    toggleDetails(item) {
      item._toggled = !item._toggled
      this.collapseDuration = 300
      this.$nextTick(() => {
        this.collapseDuration = 0
      })
    }
  }
}
</script>

<style scoped>

.card-body {
  background-color: #fffaf8;
}

.card-header {
  background-color: #3E2F2E !important;
  color: #FFF9F2 !important;
}
</style>
