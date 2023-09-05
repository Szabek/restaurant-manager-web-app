<template>
  <CCard class="mt-4">
    <CCardHeader class="col-auto">
      <strong>Lista składników </strong>
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
          <IngredientEdit :id="item.id" :name="item.name" :unitId="item.unitId" :toggled="item._toggled"/>
        </CCollapse>
      </template>
    </CDataTable>
  </CCardBody>
  </CCard>

</template>

<script>
import IngredientEdit from "@/components/manager/ingredient/IngredientEdit.vue";
import {mapState} from "vuex";

const fields = [
  {
    key: 'name',
    label: 'Składnik'
  },
  {
    key: 'unit',
    label: 'Jednostka'
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
    IngredientEdit
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
      return this.ingredients.map((ingredient, rowId) => {
        return {
          id: ingredient.id,
          name: ingredient.name,
          unit: ingredient.unit.name,
          unitId: ingredient.unit.id,
          rowId}
      })
    },
    ...mapState('ingredient', ['ingredients'])
  },
  created() {
    this.$store.dispatch('ingredient/fetchIngredients')
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
