<template>
  <CCard class="mt-4">
    <CCardHeader class="col-auto">
      <strong>Dodaj składnik</strong>
    </CCardHeader>
    <CCardBody>
  <div>
    <ValidationObserver ref="form">
      <CForm @submit.prevent="onSubmit">
        <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
          <div class="alert-warning">{{ errors[0] }}</div>
          <CInput
              v-model="ingredient.name"
              placeholder="Wprowadź nazwę"
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
          <CButton color="success" type="submit" class="ml-1" style="flex-grow: 1;">Dodaj</CButton>
        </div>
      </CForm>
    </ValidationObserver>
  </div>
    </CCardBody>
  </CCard>
</template>

<script>

import {mapState} from "vuex";

export default {
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
  created() {
    this.$store.dispatch('unit/fetchUnits')
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        this.createIngredient()
        this.ingredient = {};
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
      });
    },
    createIngredient() {
      this.$store.dispatch('ingredient/createIngredient', this.ingredient)
    },
    newIngredientObject() {
      return {
        name: '',
        unitId: '',
      };
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