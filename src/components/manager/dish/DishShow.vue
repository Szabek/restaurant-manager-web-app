<template>
  <CCard class="mt-3">
    <CRow>
      <CCol md="6">
        <c-card-img :src="STORAGE_URL + dish.image" alt="Image" class="rounded-1 m-2"></c-card-img>
      </CCol>
      <CCol md="6">
          <CCardBody>
            <CCardTitle>
              <strong>{{ dish.name }}</strong>
              | {{ dish.price }} zł
            </CCardTitle>
            <CCardText>
              {{dish.category.name}}
            </CCardText>
            <CCardText>
              {{ dish.description }}
            </CCardText>
            <ul>
              <li v-for="item in dish.dishIngredients" :key="item.id">
                {{ item.ingredient.name }} | {{item.quantity}}{{ item.ingredient.unit.name }}
              </li>
            </ul>
          </CCardBody>
      </CCol>
    </CRow>

    <CCardHeader>
      <div class="row">
        <div class="col-sm">
          <router-link :to="{ name: 'Dishes-edit', params: { id: this.dish.id }}">
            <CButton color="info" class="w-100">
              Edytuj
            </CButton>
          </router-link>
        </div>
        <div class="col-sm">
          <CButton color="danger" class="w-100 ml-1" v-on:click="deleteDish">
            Usuń
          </CButton>
        </div>
      </div>
    </CCardHeader>

  </CCard>
</template>

<script>
import {STORAGE_URL} from "/constans";

export default {
  props: {
    dish: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      STORAGE_URL: STORAGE_URL
    }
  },
  methods: {
    deleteDish() {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('dish/deleteDish', this.dish.id)
      }
    }
  }
}
</script>

<style scoped>

</style>
