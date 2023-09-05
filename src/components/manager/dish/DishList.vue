<template>
  <CCard>
    <CCardHeader>
      <strong>Lista dań</strong>
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
            {{ Boolean(item._toggled) ? 'Cofnij' : 'Pokaż' }}
          </CButton>
        </td>
      </template>
      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <DishShow :id="item.id" :dish="item.dish" :toggled="item._toggled"/>
        </CCollapse>
      </template>
    </CDataTable>
  </CCardBody>
  </CCard>

</template>

<script>
import DishShow from "@/components/manager/dish/DishShow.vue";
import {mapState} from "vuex";

const fields = [
  {
    key: 'name',
    label: 'Nazwa Dania'
  },
  {
    key: 'categoryName',
    label: 'Kategoria'
  },
  {
    key: 'ingredientsCount',
    label: 'Składniki',
    _style: 'width:5%',
  },
  {
    key: 'price',
    label: 'Cena',
    _style: 'width:15%',
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
    DishShow
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
      return this.dishes.map((dish, rowId) => {
        return {
          id: dish.id,
          name: dish.name,
          categoryName: dish.category.name,
          price: dish.price,
          ingredientsCount: dish.dishIngredients.length,
          dish: dish,
          rowId}
      })
    },
    ...mapState('dish', ['dishes'])
  },
  created() {
    this.$store.dispatch('dish/fetchDishes')
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
