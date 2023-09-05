<template>
  <CCard class="mt-4">
    <CCardHeader>
      <strong>Zmień przypisane stoły</strong>
    </CCardHeader>
    <CCardBody>
      <ValidationObserver v-slot="{ handleSubmit }">
        <CForm @submit.prevent="handleSubmit(updateUser)">
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
            <CButton color="warning" class="ml-1" @click="returnToPreviousPage" style="flex-grow: 1;">
              Anuluj
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
  created() {
    this.$store.dispatch('table/fetchTables')
    this.user = this.createUserObject()
  },
  methods: {
    updateUser() {
      this.user = this.tableIdsToArray(this.user);
      this.$store
          .dispatch('user/updateUserTables', this.user)
          .then(() => {
            this.returnToPreviousPage()
          })
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
    },
    returnToPreviousPage() {
      this.$router.go(-1);
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
