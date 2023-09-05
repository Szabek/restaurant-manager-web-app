<template>
  <div class="error404">
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="w-100 justify-content-center">
      <CCol md="6" class="text-center">
        <img class="w-80" src="/img/custom_img/RM_ICON_SVG.svg" alt="Logo_Rest_Mena">
        <h1 class="display-3 mr-4">404</h1>
        <h4 class="pt-3">Ups! Zgubiłeś się.</h4>
        <p class="text-muted">Strona, której szukasz nie została znaleziona.</p>
        <router-link :to="{ name: 'Home'}">
          <CButton @click="goBack">
            <h1>
              Powrót
            </h1>
          </CButton>
        </router-link>
      </CCol>
    </CRow>
  </CContainer>
  </div>
</template>


<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.error404 {
  background-color: #FFF9F2 !important;
  background-image: url('/public/img/custom_img/4.png');
  background-repeat: repeat;
  background-position: center;
}


button {
  position: relative;
  background-color: #3E2F2E;
  color: #FFF9F2;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  animation: pulse 1s infinite alternate;
  cursor: pointer;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}

button > span {
  position: relative;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

button:hover > span {
  opacity: 1;
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

button:hover::before {
  opacity: 1;
}

button:hover {
  background-color: #FFFFFF;
  color: #3E2F2E;
}

button:active {
  color: #3E2F2E !important;
}

button:active::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
  pointer-events: none;
  z-index: 1;
}


</style>
