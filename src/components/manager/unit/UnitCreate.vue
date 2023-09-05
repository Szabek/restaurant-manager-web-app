<template>
  <div>
    <CCard>
    <CCardHeader>
      <strong>Dodaj jednostkę</strong>
    </CCardHeader>
    <CCardBody>
    <ValidationObserver ref="form">
      <CForm @submit.prevent="onSubmit">
        <ValidationProvider name="Unit" rules="required" v-slot="{ errors }">
          <div class="alert-warning">{{ errors[0] }}</div>
          <CInput
              v-model="unit.name"
              placeholder="Wprowadź jednostkę np.: kg, szt, l"
          />
        </ValidationProvider>
        <div class="d-flex">

        <CButton class="ml-1" style="flex-grow: 1;" color="success"  type="submit">Dodaj</CButton>
  </div>

  </CForm>
    </ValidationObserver>
    </CCardBody>
    </CCard>

  </div>

</template>

<script>

export default {
  data() {
    return {
      unit: {}
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        this.createUnit()
        this.unit = {};
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
      });
    },
    createUnit() {
      this.$store.dispatch('unit/createUnit', this.unit)
    }
  }
}
</script>

<style scoped>
span {
  display: block;
}
.card-body {
  background-color: #fffaf8;
}

.card-header {
  background-color: #3E2F2E !important;
  color: #FFF9F2 !important;
}

</style>
