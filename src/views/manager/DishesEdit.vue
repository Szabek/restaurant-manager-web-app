<template>
  <div>
    <DishEdit :id="this.id"/>
  </div>
</template>

<script>
import DishEdit from "@/components/manager/dish/DishEdit.vue";

export default {
  props: {
    id: {
      required: true,
    }
  },
  components: {
    DishEdit
  }
}
</script>

<style scoped>

</style>