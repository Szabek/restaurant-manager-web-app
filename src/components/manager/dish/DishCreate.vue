<template>
  <CCard>
    <CCardHeader>
      <strong>Dodaj nowe danie</strong>
    </CCardHeader>
    <CCardBody>
      <ValidationObserver ref="form">
        <CForm @submit.prevent="onSubmit" @reset.prevent="reset">
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
          <ValidationProvider name="Ingredient" rules="required" v-slot="{ errors }">
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
          <ValidationProvider name="Image" rules="required|image" v-slot="{ validate, errors }">
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
import {mapState} from "vuex";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      dish: this.newDishObject()
    }
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
    ...mapState('ingredient', ['ingredients'])
  },
  created() {
    this.$store.dispatch('category/fetchCategories')
    this.$store.dispatch('ingredient/fetchIngredients')
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        this.dish = this.IngredientsIdsToArray(this.dish);
        this.dish = this.IngredientsQuantitiesToArray(this.dish);
        this.createDish()
        this.dish = this.newDishObject()
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
      });
    },
    reset() {
      this.dish = this.newDishObject()
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    },
    handleFileUpload() {
      this.dish.image = this.$refs.image.files[0];
    },
    createDish() {
      this.$store.dispatch('dish/createDish', this.dish)
    },
    newDishObject() {
      return {
        name: '',
        description: '',
        categoryId: '',
        price: '',
        ingredients: [],
        image: ''
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
    IngredientsIdsToArray(obj) {
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
    }
  }
}
</script>

<style src="../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
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
