<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5">
          <CCardGroup>
            <img class="loginRestauratManagerLogo" :src="require('@/../public/img/custom_img/RM_ICON_SVG.svg')" alt="Logo_Rest_Mena">
            <CCard class="p-4">
              <CCardBody>
                <ValidationObserver v-slot="{ handleSubmit }">
                  <CForm @submit.prevent="handleSubmit(login)">
                    <h1 class="loginHeaderLogin">Przypomnij hasło</h1>
                    <p class="text-center">Wpisz swój adres e-mail</p>
                    <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
                      <span class="alert-warning fw-bolder">{{ errors[0] }}</span>
                      <CInput
                          placeholder="E-mail"
                          autocomplete="username phone"
                          v-model="email"
                      >
                        <template #prepend-content>
                          <CIcon name="cil-user"/>
                        </template>
                      </CInput>
                    </ValidationProvider>
                    <CRow>
                      <CCol col="6" class="text-left">
                        <CButton type="submit" color="primary" class="px-4">Wyślij nowe hasło</CButton>
                      </CCol>
                      <CCol col="6" class="text-right">
                        <CButton type="submit" color="primary" @click="backToLogin" class="px-4">Wróc do logowania</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </ValidationObserver>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>



<script>
export default {
  name: "RestorePassword.vue",

  methods: {
    backToLogin(){
      this.$router.push({name: 'login'})
    },
    }
}


</script>



<style scoped>
span {
  background-color: transparent;
  text-align: left;
  color: #FFF9F2;
}
.loginRestauratManagerLogo {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.loginHeaderLogin {
  color: #FFF9F2;
  text-align: center;
}
.card.p-4 {
  background-color: #3E2F2E;
  border-radius: 10px;
}
.input-group {
  background-color: #FFF9F2;
  border-radius: 0.375rem;
}
.form-control {
  background-color: #FFF9F2;
}
button.btn.px-4.btn-primary {
  --bs-btn-color: #3E2F2E;
  --bs-btn-bg: #FFF9F2;
  --bs-btn-border-color: rgba(108, 91, 70, 0.84);
  --bs-btn-hover-color: #3E2F2E;
  --bs-btn-hover-bg: #C6C2BD;
  --bs-btn-hover-border-color: solid black;
  --bs-btn-focus-shadow-rgb: 49, 132, 253;
  --bs-btn-active-color: #fff;
}
.btn-link {
  --bs-btn-font-weight: 400;
  --bs-btn-color: #FFF9F2;
  --bs-btn-bg: transparent;
  --bs-btn-border-color: transparent;
  --bs-btn-hover-color: #C6C2BD;
  --bs-btn-hover-border-color: transparent;
  --bs-btn-active-color: #C6C2BD;
  --bs-btn-active-border-color: transparent;
  --bs-btn-disabled-color: #6c757d;
  --bs-btn-disabled-border-color: transparent;
  --bs-btn-box-shadow: none;
  --bs-btn-focus-shadow-rgb: 49, 132, 253;
  text-decoration: underline;
}
</style>
