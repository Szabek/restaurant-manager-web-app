<template>
  <CCard>
  <CCardHeader>
    <strong>Lista stołów</strong>
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
          <TableEdit
              :id="item.id"
              :name="item.name"
              :seatsNumber="item.seatsNumber"
              :isActive="item.isActive"
              :isOccupied="item.isOccupied"
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
import TableEdit from "@/components/manager/table/TableEdit.vue";

const fields = [
  {
    key: 'name',
    label: 'Nazwa'
  },
  {
    key: 'seatsNumber',
    label: 'Liczba miejsc'
  },
  {
    key: 'isActive',
    label: 'Aktywny'
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
    TableEdit
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
      return this.tables.map((table, rowId) => {
        return {
          id: table.id,
          name: table.name,
          seatsNumber: table.seatsNumber,
          isActive: table.isActive,
          isOccupied: table.isOccupied,
          rowId}
      })
    },
    ...mapState('table', ['tables'])
  },
  created() {
    this.$store.dispatch('table/fetchTables')
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
