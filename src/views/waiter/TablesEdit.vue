<template>
  <div v-if="!loading">
    <TableEdit
        :id="currentUser.id"
        :email="currentUser.email"
        :firstname="currentUser.firstname"
        :lastname="currentUser.lastname"
        :role="currentUser.role"
        :tables="currentUser.tables"
    />
  </div>
</template>

<script>
import {mapState} from "vuex";
import TableEdit from "@/components/waiter/TableEdit.vue";

export default {
  components: {
    TableEdit
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapState('user', ['currentUser'])
  },
  created() {
    this.$store.dispatch('user/fetchCurrentUser')
        .then(() => this.loading = false)
  }
}
</script>

<style scoped>

</style>
