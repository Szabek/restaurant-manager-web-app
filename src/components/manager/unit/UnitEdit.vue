<template>
  <CCard class="mt-4">
    <CCardHeader class="col-auto">
      <strong>Edytujesz jednostkę: {{ unit.name }}</strong>
    </CCardHeader>
  <CCardBody>
    <ValidationObserver v-slot="{ handleSubmit }">
      <CForm @submit.prevent="handleSubmit(updateUnit)">
        <ValidationProvider name="Unit" rules="required" v-slot="{ errors }">
          <div class="alert-warning">{{ errors[0] }}</div>
          <CInput
              v-model="unit.name"
              label="Nowa nazwa:"
          />
        </ValidationProvider>
        <div class="d-flex">
        <CButton type="submit" color="success" style="flex-grow: 1;" value="Submit">
          Zapisz
        </CButton>
        <CButton color="danger" class="ml-1" style="flex-grow: 1;" v-on:click="deleteUnit">
          Usuń
        </CButton>
        </div>
      </CForm>
    </ValidationObserver>
  </CCardBody>
  </CCard>
</template>

<script>
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
    toggled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      unit: {}
    }
  },
  watch: {
    toggled(newValue) {
      if (newValue === true) {
        this.unit = this.createUnitObject()
      }
    }
  },
  methods: {
    updateUnit() {
      this.$store
          .dispatch('unit/updateUnit', this.unit)
          .then(() => {
            this.unit = this.createUnitObject()
          })
    },
    deleteUnit() {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('unit/deleteUnit', this.unit.id)
      }
    },
    createUnitObject() {
      return {
        id: this.id,
        name: this.name
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
