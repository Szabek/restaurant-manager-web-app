<template>
  <CCard>
    <CCardHeader>
      <strong>Dodaj użytkownika</strong>
    </CCardHeader>
    <CCardBody>
      <ValidationObserver ref="form">
        <CForm @submit.prevent="onSubmit" @reset.prevent="reset">
          <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="user.email"
                label="Email"
                horizontal
            />
          </ValidationProvider>
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="user.firstname"
                label="Imie"
                horizontal
            />
          </ValidationProvider>
          <ValidationProvider name="LastName" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="user.lastname"
                label="Nazwisko"
                horizontal
            />
          </ValidationProvider>
          <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
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
                <label class="typo__label">Stoły kelnera</label>
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
import {mapState} from "vuex";
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      selectOptions: [
        { value: 'COOK', label: 'Kuchnia' },
        { value: 'WAITER', label: 'Kelner' },
        { value: 'MANAGER', label: 'Manager' },
        { value: 'ADMIN', label: 'Administrator' }
      ],
      user: this.newUserObject()
    }
  },
  computed: {
    tablesSelect() {
      return this.tables.map(item => {
        return {id: item.id, name: item.name, seatsNumber: item.seatsNumber}
      })
    },
    ...mapState('table', ['tables']),
    ...mapState('user', ['users'])
  },
  created() {
    this.$store.dispatch('table/fetchTables')
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        this.user = this.tableIdsToArray(this.user)
        this.createUser()
        this.user = this.newUserObject()
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
      });
    },
    reset() {
      this.user = this.newUserObject()
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
    createUser() {
      this.$store.dispatch('user/createUser', this.user)
    },
    newUserObject() {
      return {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        role: '',
        tables: ''
      };
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
</style>