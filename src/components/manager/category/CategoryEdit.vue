<template>
  <CCard class="mt-4">
    <CCardHeader class="col-auto">
      <strong> Edytujesz kategorię: {{ name }} </strong>
    </CCardHeader>
  <CCardBody>
    <ValidationObserver v-slot="{ handleSubmit }">
      <CForm @submit.prevent="handleSubmit(updateCategory)">
        <ValidationProvider name="Category" rules="required" v-slot="{ errors }">
          <div class="alert-warning">{{ errors[0] }}</div>
          <CInput
              v-model="category.name"
              label="Nowa nazwa:"
          />
        </ValidationProvider>

        <div class="d-flex">
        <CButton color="success" class="ml-1" style="flex-grow: 1;" value="Submit" type="submit">
          Zapisz
        </CButton>
        <CButton color="danger" class="ml-1" style="flex-grow: 1;" v-on:click="deleteCategory">
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
      category: {}
    }
  },
  watch: {
    toggled(newValue) {
      if (newValue === true) {
        this.category = this.createCategoryObject()
      }
    }
  },
  methods: {
    updateCategory() {
      this.$store
          .dispatch('category/updateCategory', this.category)
          .then(() => {
            this.category = this.createCategoryObject()
          })
    },
    deleteCategory() {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('category/deleteCategory', this.category.id)
      }
    },
    createCategoryObject() {
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
