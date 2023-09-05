<template>
  <CCardBody>
    <CCardTitle class="text-center menu-card-title">
      <h1 class="text-center">Menu</h1>
    </CCardTitle>

    <CDataTable
        :items="itemsInList"
        :fields="fields"
        :loading="loading"
        hover
        :header="false"
    >

      <template #name="{item, index}">
        <div class="py-2 mb-1 mt-1 menu-category-header rounded-2" @click="toggleDetails(item, index)">
          <h3>{{item.name}}</h3>
        </div>
      </template>

      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CListGroup>
            <CListGroupItem
                class="menu-item"
                v-for="dish in dishesByCategory(item.id)" :key="dish.id"
                @click="addDishToOrder(dish)"
            >
              <h5>{{dish.name}}</h5>
              {{dish.price}} zł
            </CListGroupItem>
          </CListGroup>
        </CCollapse>
      </template>


    </CDataTable>
  </CCardBody>
</template>


<script>
import {mapState} from "vuex";

const fields = [
  {
    key: 'name',
    label: 'Kategoria'
  }
]

export default {
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
      return this.categories.map((category, rowId) => {
        return {...category, rowId}
      })
    },
    ...mapState('category', ['categories']),
    ...mapState('dish', ['dishes'])
  },
  created() {
    this.$store.dispatch('category/fetchCategories')
        .then(() => this.loading = false)

    this.$store.dispatch('dish/fetchDishes')
  },
  methods: {
    dishesByCategory(categoryId) {
      return this.dishes.filter(dish => dish.category.id === categoryId);
    },
    addDishToOrder(dish) {
      this.$store.dispatch('order/addDishToOrderToEdit', dish)
    },
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
.menu-category-header {
  border: 2px solid #7C746C;
  background-color: #3E2F2E !important;
  color: #FFF9F2;
  transition: background-color 0.3s;
}

.menu-category-header:hover {
  background-color: #7C746C !important;
}

.menu-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #7C746C;
  color: #FFF9F2;
}
</style>
