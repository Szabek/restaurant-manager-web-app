<template>
  <CCard class="mt-4">
    <CCardHeader>
      <strong>Edytuj użytkownika: {{ user.firstname }} {{ user.lastname}}</strong>
    </CCardHeader>
    <CCardBody>
      <ValidationObserver v-slot="{ handleSubmit }">
        <CForm @submit.prevent="handleSubmit(updateUser)">
          <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="user.email"
                label="Email"
                horizontal
            />
          </ValidationProvider>
          <ValidationProvider name="Firstname" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="user.firstname"
                label="Imie"
                horizontal
            />
          </ValidationProvider>
          <ValidationProvider name="Lastname" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="user.lastname"
                label="Nazwisko"
                horizontal
            />
          </ValidationProvider>
          <CRow>
            <CCol tag="label" sm="3" class="col-form-label">
              Nadpisać hasło?
            </CCol>
            <CCol sm="9">
              <CInputCheckbox
                  @click="passwordChange = !passwordChange"
              />
            </CCol>
          </CRow>
          <ValidationProvider v-if="passwordChange" name="Password" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="user.password"
                label="Hasło"
                horizontal
                type="password"
            />
          </ValidationProvider>
          <ValidationProvider name="Role" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CSelect
                label="Rola"
                horizontal
                :value.sync="user.role"
                :options="selectOptions"
                placeholder="Wybierz rolę"
            />
          </ValidationProvider>
          <ValidationProvider name="Tables" rules="" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CRow class="mb-3">
              <CCol class="col-3">
                <label class="typo__label">Stoły</label>
              </CCol>
              <CCol class="col-9">
                <multiselect v-model="user.tables" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="id" :options="tablesSelect" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
              </CCol>
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
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    tables: {
      type: Array,
      required: false
    },
    toggled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      selectOptions: [
        { value: 'COOK', label: 'Kuchnia' },
        { value: 'WAITER', label: 'Kelner' },
        { value: 'MANAGER', label: 'Manager' },
        { value: 'ADMIN', label: 'Administrator' }
      ],
      user: {},
      passwordChange: false,
    }
  },
  computed: {
    tablesSelect() {
      return this.$store.state.table.tables.map(item => {
        return {id: item.id, name: item.name, seatsNumber: item.seatsNumber}
      })
    }
  },
  watch: {
    toggled(newValue) {
      if (newValue === true) {
        this.user = this.createUserObject()
      }
    }
  },
  created() {
    this.$store.dispatch('table/fetchTables')
  },
  methods: {
    updateUser() {
      this.user = this.tableIdsToArray(this.user);
      this.$store
          .dispatch('user/updateUser', this.user)
          .then(() => {
            this.user = this.createUserObject()
          })
    },
    deleteUser() {
      if (confirm('Jesteś pewny?')) {
        this.$store.dispatch('user/deleteUser', this.user.id)
      }
    },
    createUserObject() {
      return {
        id: this.id,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role,
        password: '',
        tables: this.tables
      }
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    tableIdsToArray(obj) {
      let ids = [];
      obj.tables.forEach((ing) => {
        ids.push(ing.id);
      });
      obj.tableIds = ids;
      return obj;
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

.card-body {
  background-color: #fffaf8;
}

.card-header {
  background-color: #3E2F2E !important;
  color: #FFF9F2 !important;
}

.card {
  --bs-card-border-radius: 0.100rem;
}

</style>
