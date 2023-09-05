<template>
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-pills justify-content-center">
        <li class="nav-item">
          <a class="nav-link active btn btn-primary" href="#1" @click="showTab('Pomoc')">Pomoc</a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <template>
        <CCard>
          <CCardHeader @click="showSubTab('Użytkownicy')" :class="{ active: selectedSubTab === 'Użytkownicy' }">
            <a :class="{ 'font-weight-bold': selectedSubTab === 'Użytkownicy' }">Jak zarządzać użytkownikami?</a>
          </CCardHeader>
          <CCardBody v-if="selectedSubTab === 'Użytkownicy'" :class="{ 'bg-primary': selectedSubTab === 'Użytkownicy' }">
            <a :class="{ 'text-white': selectedSubTab === 'Użytkownicy'}">
              {{ textMockup }}
            </a>
          </CCardBody>

          <CCardHeader @click="showSubTab('Stoły')" :class="{ active: selectedSubTab === 'Stoły' }">
            <a :class="{ 'font-weight-bold': selectedSubTab === 'Stoły' }">Jak zarządzać stołami?</a>
          </CCardHeader>
          <CCardBody v-if="selectedSubTab === 'Stoły'" :class="{ 'bg-primary': selectedSubTab === 'Stoły' }">
            <a :class="{ 'text-white': selectedSubTab === 'Stoły'}">
              {{ textMockup }}
            </a>
          </CCardBody>

          <CCardHeader @click="showSubTab('Kategorie')" :class="{ active: selectedSubTab === 'Kategorie' }">
            <a :class="{ 'font-weight-bold': selectedSubTab === 'Kategorie' }">Jak zarządzać kategoriami?</a>
          </CCardHeader>
          <CCardBody v-if="selectedSubTab === 'Kategorie'" :class="{ 'bg-primary': selectedSubTab === 'Kategorie' }">
            <a :class="{ 'text-white': selectedSubTab === 'Kategorie'}">
              {{ textMockup }}
            </a>
          </CCardBody>

          <CCardHeader @click="showSubTab('Dania')" :class="{ active: selectedSubTab === 'Dania' }">
            <a :class="{ 'font-weight-bold': selectedSubTab === 'Dania' }">Jak zarządzać daniami?</a>
          </CCardHeader>
          <CCardBody v-if="selectedSubTab === 'Dania'" :class="{ 'bg-primary': selectedSubTab === 'Dania' }">
            <a :class="{ 'text-white': selectedSubTab === 'Dania'}">
              {{ textMockup }}
            </a>
          </CCardBody>

          <CCardHeader @click="showSubTab('Składniki')" :class="{ active: selectedSubTab === 'Składniki' }">
            <a :class="{ 'font-weight-bold': selectedSubTab === 'Składniki' }">Jak zarządzać składnikami?</a>
          </CCardHeader>
          <CCardBody v-if="selectedSubTab === 'Składniki'" :class="{ 'bg-primary': selectedSubTab === 'Składniki' }">
            <a :class="{ 'text-white': selectedSubTab === 'Składniki'}">
              {{ textMockup }}
            </a>
          </CCardBody>

          <CCardHeader @click="showSubTab('Jednostki')" :class="{ active: selectedSubTab === 'Jednostki' }">
            <a :class="{ 'font-weight-bold': selectedSubTab === 'Jednostki' }">Jak zarządzać jednostkami?</a>
          </CCardHeader>
          <CCardBody v-if="selectedSubTab === 'Jednostki'" :class="{ 'bg-primary': selectedSubTab === 'Jednostki' }">
            <a :class="{ 'text-white': selectedSubTab === 'Jednostki'}">
              {{ textMockup }}
            </a>
          </CCardBody>
        </CCard>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: null,
      selectedSubTab: null,
      textMockup: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\n" +
                  " tempor incididunt ut labore et dolore magna aliqua. Tortor at auctor urna nunc id\n" +
                  " cursus. Dolor magna eget est lorem ipsum. Aenean vel elit scelerisque mauris. Arcu felis\n" +
                  " bibendum ut tristique et egestas quis ipsum. Vel pharetra vel turpis nunc eget lorem. Ante\n" +
          " metus dictum at tempor commodo ullamcorper. Sem integer vitae justo eget. Quisque non tellus orci ac\n" +
          " auctor augue mauris augue. Nunc sed blandit libero volutpat sed cras ornare arcu. Viverra nam libero\n" +
          " justo laoreet sit amet cursus sit. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi.\n" +
          " Metus dictum at tempor commodo ullamcorper. Ut faucibus pulvinar elementum integer enim neque volutpat ac.\n" +
          " Tempus egestas sed sed risus pretium quam vulputate. Integer quis auctor elit sed vulputate mi sit amet."
    };
  },
  methods: {
    showTab(tabName) {
      this.selectedTab = tabName;
      this.selectedSubTab = null;
    },
    showSubTab(subTabName) {
      this.selectedSubTab = subTabName;
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

.nav-pills {
  flex-wrap: wrap;
  justify-content: center;
}

.nav-item {
  display: flex;
  justify-content: center;
  margin: 0 5px;
}

.nav-link {
  padding: 0.5rem 1rem;
}

.CCard {
  margin-bottom: 1rem;
  border: 2px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.CCardHeader {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #3E2F2E;
  color: #FFF9F2;
  cursor: pointer;
}

.CCardBody {
  padding: 1.25rem;
}

.CCardBody p {
  margin-bottom: 0.5rem;
}

.card-body.bg-primary {
  background-color: #7C746C !important;
  color: #7C746C !important;
}

</style>
