<template>
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-pills justify-content-center">
        <li class="nav-item">
          <a class="nav-link active btn btn-primary" href="#3" @click="showTab('Kontakt')">Kontakt</a>
        </li>
      </ul>
    </div>
    <div class="card-body">

      <template>
            <p>W razie pytań lub wątpliwości, jesteśmy do Twojej dyspozycji.</p>
            <p>Skontaktuj się z nami, aby uzyskać wsparcie techniczne lub dodatkowe informacje.</p>
            <p>Nasz zespół jest gotowy, aby odpowiedzieć na Twoje pytania i pomóc rozwiązać problemy.</p>
            <p>Zapewniamy szybką odpowiedź i profesjonalną obsługę.</p>
            <p></p>
            <strong>dev@restaurant-manager.pl</strong>
            <p>Jesteśmy dostępni 24/7</p>
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
