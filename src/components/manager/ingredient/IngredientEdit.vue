<template>
  <CCard class="mt-4">
    <CCardHeader class="col-auto">
      <strong> Edytujesz składnik: {{ ingredient.name }} </strong>
    </CCardHeader>
    <CCardBody>
    <ValidationObserver v-slot="{ handleSubmit }">
      <CForm @submit.prevent="handleSubmit(updateIngredient)">
        <ValidationProvider name="Ingredient" rules="required" v-slot="{ errors }">
          <div class="alert-warning">{{ errors[0] }}</div>
          <CInput
              v-model="ingredient.name"
              label="Nowa nazwa:"
          />
        </ValidationProvider>
        <ValidationProvider name="Unit" rules="required" v-slot="{ errors }">
          <div class="alert-warning">{{ errors[0] }}</div>
          <CSelect
              :value.sync='ingredient.unitId'
              label="Jednostka:"
              horizontal
              :options="unitsSelect"
              placeholder="Wybierz jednostkę"
          />
        </ValidationProvider>

        <div class="d-flex">
        <CButton color="success" value="Submit" type="submit" style="flex-grow: 1;">
          Zapisz
        </CButton>
        <CButton color="danger" v-on:click="deleteIngredient" class="ml-1" style="flex-grow: 1;">
          Usuń
        </CButton>
        </div>
      </CForm>
    </ValidationObserver>
  </CCardBody>
  </CCard>
</template>

<script>
import {mapState} from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    unitId: {
      type: Number,
      required: true,
    },
    toggled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      ingredient: {}
    }
  },
  computed: {
    unitsSelect() {
      return this.units.map(item => {
        return {value: item.id, label: item.name}
      })
    },
    ...mapState('unit', ['units'])
  },
  watch: {
    toggled(newValue) {
      if (newValue === true) {
        this.ingredient = this.createIngredientObject()
      }
    }
  },
  methods: {
    updateIngredient() {
      this.$store
          .dispatch('ingredient/updateIngredient', this.ingredient)
          .then(() => {
            this.ingredient = this.createIngredientObject()
          })
    },
    deleteIngredient() {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('ingredient/deleteIngredient', this.ingredient.id)
      }
    },
    createIngredientObject() {
      return {
        id: this.id,
        name: this.name,
        unitId: this.unitId
      }
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
