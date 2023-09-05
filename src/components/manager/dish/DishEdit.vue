<template>
  <CCard v-if="dish.id === dishToEdit.id">
    <CCardHeader>
      <strong>Edytuj Danie</strong>
    </CCardHeader>
    <CCardBody>
      <ValidationObserver v-slot="{ handleSubmit }">
        <CForm @submit.prevent="handleSubmit(updateDish)">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="dish.name"
                label="Nazwa Dania"
                horizontal
            />
          </ValidationProvider>
          <ValidationProvider name="Description" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CTextarea
                v-model="dish.description"
                label="Opis"
                horizontal
                rows="6"
            />
          </ValidationProvider>
          <ValidationProvider name="Category" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CSelect
                :value.sync='dish.categoryId'
                label="Kategoria"
                horizontal
                :options="categoriesSelect"
                placeholder="Wybierz kategorię"
            />
          </ValidationProvider>
          <ValidationProvider name="Price" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CInput
                v-model="dish.price"
                label="Cena"
                type="number"
                horizontal
                step="0.01"
            />
          </ValidationProvider>
          <ValidationProvider name="Ingredients" rules="required" v-slot="{ errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <CRow class="mb-3">
              <CCol class="col-3">
                <label class="typo__label">Składniki</label>
              </CCol>
              <CCol class="col-9">
                <multiselect v-model="dish.ingredients" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="id" :options="ingredientsSelect" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
              </CCol>
            </CRow>
          </ValidationProvider>
          <div v-for="ingredient in dish.ingredients" :key="ingredient.id">
            <ValidationProvider name="Ingredient quantity" rules="required" v-slot="{ errors }">
              <div class="alert-warning">{{ errors[0] }}</div>
              <CRow>
                <CCol>
                  <label :for="`quantity_${ingredient.id}`">Ilość składnika {{ ingredient.name }} [{{ingredient.unit.name}}]:</label>
                </CCol>
                <CCol>
                  <CInput type="number" :id="`quantity_${ingredient.id}`" v-model="ingredient.quantity" min="0"/>
                </CCol>
              </CRow>
            </ValidationProvider>
          </div>
          <ValidationProvider name="Image" rules="image" v-slot="{ validate, errors }">
            <div class="alert-warning">{{ errors[0] }}</div>
            <div class="custom-file">
              <input
                  v-on:change="handleFileUpload()"
                  @change="validate"
                  type="file"
                  class="custom-file-input"
                  id="image"
                  ref="image"
              >
              <label class="custom-file-label" for="image">
                Wybrane zdjęcie: {{ dish.image ? dish.image.name : '' }}
              </label>
            </div>
          </ValidationProvider>
          <hr>
          <div class="d-flex">
            <CButton type="submit" color="success" style="flex-grow: 1;" value="Submit">
              Zapisz
            </CButton>
          </div>
        </CForm>
      </ValidationObserver>
    </CCardBody>
  </CCard>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {mapActions, mapState} from "vuex";
import router from "@/router";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      dish: {}
    }
  },
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    categoriesSelect() {
      return this.categories.map(item => {
        return {value: item.id, label: item.name}
      })
    },
    ingredientsSelect() {
      return this.ingredients.map(item => {
        return {id: item.id, name: item.name, unit: item.unit, quantity: 0}
      })
    },
    ...mapState('category', ['categories']),
    ...mapState('ingredient', ['ingredients']),
    ...mapState('dish', ['dishToEdit'])
  },
  created() {
    this.fetchCategories()
    this.fetchIngredients()
    this.fetchDishToEdit(this.id)
  },
  beforeUpdate() {
    delete this.dishToEdit.image
    this.dish = this.dishToEdit
    this.dish.ingredients = this.dishToEdit.dishIngredients.map(dishIngredient => {
      return {
        id: dishIngredient.ingredient.id,
        name: dishIngredient.ingredient.name,
        unit: dishIngredient.ingredient.unit,
        quantity: dishIngredient.quantity
      };
    });
    this.dish.categoryId = this.dishToEdit.category.id
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        this.updateDish()
      });
    },
    handleFileUpload() {
      this.dish.image = this.$refs.image.files[0];
    },
    updateDish() {
      this.dish = this.ingredientsIdsToArray(this.dish);
      this.dish = this.IngredientsQuantitiesToArray(this.dish);
      this.$store.dispatch('dish/updateDish', this.dish)
          .then(() => {
            router.push('/dishes')
          })
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    ingredientsIdsToArray(obj) {
      let ids = [];
      obj.ingredients.forEach((ing) => {
        ids.push(ing.id);
      });
      obj.ingredientIds = ids;
      return obj;
    },
    IngredientsQuantitiesToArray(obj) {
      let quantities = [];
      obj.ingredients.forEach((ing) => {
        quantities.push(ing.quantity);
      });
      obj.ingredientQuantities = quantities;
      return obj;
    },
    ...mapActions('dish', ['fetchDishToEdit'],),
    ...mapActions('category', ['fetchCategories'],),
    ...mapActions('ingredient', ['fetchIngredients'],)
  }
}
</script>

<style src="../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.card-body {
  background-color: #fffaf8;
}

.card-header {
  background-color: #3E2F2E !important;
  color: #FFF9F2 !important;
}
</style>
