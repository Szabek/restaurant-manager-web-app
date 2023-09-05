<template>
    <CCard>
      <CCardHeader>
        <strong>Dodaj nową kategorię</strong>
      </CCardHeader>
      <CCardBody>
    <div>
    <ValidationObserver ref="form">
      <CForm @submit.prevent="onSubmit">
        <ValidationProvider name="Category" rules="required" v-slot="{ errors }">
          <div class="alert-warning">{{ errors[0] }}</div>
          <CInput
              v-model="category.name"
              placeholder="Wprowadź kategorię"
          />
        </ValidationProvider>
        <div class="d-flex">
          <CButton type="submit" color="success" style="flex-grow: 1;">
            Zapisz
          </CButton>
        </div>
      </CForm>
    </ValidationObserver>
  </div>
    </CCardBody>
    </CCard>
</template>

<script>

export default {
  data() {
    return {
      category: {}
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        this.createCategory()
        this.category = {};
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
      });
    },
    createCategory() {
      this.$store.dispatch('category/createCategory', this.category)
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