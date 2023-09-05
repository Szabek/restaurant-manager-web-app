<template>
  <CCard>
    <CCardHeader>
      <strong>Dodaj stół</strong>
    </CCardHeader>
    <CCardBody>
      <ValidationObserver ref="form">
        <CForm @submit.prevent="onSubmit" @reset.prevent="reset">
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
            Wyczyść
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
  data() {
    return {
      table: this.newTableObject()
    }
  },
  computed: {
    ...mapState('table', ['tables'])
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        this.createTable()
        this.table = this.newTableObject()
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
      });
    },
    reset() {
      this.table = this.newTableObject()
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
    createTable() {
      this.$store.dispatch('table/createTable', this.table)
    },
    newTableObject() {
      return {
        name: '',
        seatsNumber: '',
        isActive: '',
        isOccupied: false,
      };
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
