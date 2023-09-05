<template>
  <CCard class="mt-4">
    <CCardHeader>
      <strong>Edytujesz stół: {{ table.name }}</strong>
    </CCardHeader>
    <CCardBody>
      <ValidationObserver v-slot="{ handleSubmit }">
        <CForm @submit.prevent="handleSubmit(updateTable)">
          <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="table.name"
                label="Nazwa"
                horizontal
            />
          </ValidationProvider>
          <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="table.seatsNumber"
                label="Liczba miejsc"
                type="number"
                horizontal
            />
          </ValidationProvider>
          <ValidationProvider name="Title" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CRow>
              <div class="col-sm-3">Aktywny:</div>

              <div class="col-sm-9">
                <input type="radio" id="one" value="true" v-model="table.isActive" />
                <label class="pl-1 pr-3" for="one">Tak</label>

                <input type="radio" id="two" value="false" v-model="table.isActive" />
                <label class="pl-1" for="two">Nie</label>
              </div>
            </CRow>
          </ValidationProvider>
          <hr>
          <div class="d-flex">
            <CButton type="submit" color="success" style="flex-grow: 1;">
              Zapisz
            </CButton>
            <CButton type="reset" color="danger" class="ml-1" style="flex-grow: 1;">
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
    seatsNumber: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isOccupied: {
      type: Boolean,
      required: true,
    },
    toggled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      table: {}
    }
  },
  watch: {
    toggled(newValue) {
      if (newValue === true) {
        this.table = this.createTableObject()
      }
    }
  },
  methods: {
    updateTable() {
      this.$store
          .dispatch('table/updateTable', this.table)
          .then(() => {
            this.table = this.createTableObject()
          })
    },
    deleteTable() {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('table/deleteTable', this.table.id)
      }
    },
    createTableObject() {
      return {
        id: this.id,
        name: this.name,
        seatsNumber: this.seatsNumber,
        isActive: this.isActive,
        isOccupied: this.isOccupied,
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
