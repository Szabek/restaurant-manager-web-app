<template>
  <div>
    <CRow>
      <CCol>
        <b-card-text>
          <b-card class="card-free rounded-3 text-center mb-1">
            <b-card-text class="font-weight-bold">
              Rezerwuj
            </b-card-text>
          </b-card>
        </b-card-text>
      </CCol>
      <CCol>
        Stół wolny, po kliknięciu rezerwujesz stolik i otwierasz puste zamówienie.
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <b-card-text>
          <b-card class="card-open rounded-3 text-center mb-1">
            <b-card-text class="font-weight-bold">
              Edytuj
            </b-card-text>
          </b-card>
        </b-card-text>
      </CCol>
      <CCol>
        Stolik zarezerwowany, można złożyć zamówienie.
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <b-card-text>
          <b-card class="card-in-progress rounded-3 text-center mb-1">
            <b-card-text class="font-weight-bold">
              Edytuj
            </b-card-text>
          </b-card>
        </b-card-text>
      </CCol>
      <CCol>
        Stolik zarezerwowany, zamówienie złożone.
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <b-card-text>
          <b-card class="card-ready rounded-3 text-center mb-1">
            <b-card-text class="font-weight-bold">
              Edytuj
            </b-card-text>
          </b-card>
        </b-card-text>
      </CCol>
      <CCol>
        Zamówienie zrealizowane przez kuchnię.
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CIcon class="warning-icon float-right" size="xl" :content="$options.warningIcon"></CIcon>
      </CCol>
      <CCol>
        Dania czekają na wydanie.
      </CCol>
    </CRow>
  </div>
</template>


<script>
import {cilWarning} from "@coreui/icons";

export default {
  warningIcon: cilWarning,
}
</script>

<style scoped>
.card-free {
  background-color: darkgreen;
  color: #f1f1f1;
}

.card-open {
  background-color: #ff8f37;
  color: #f1f1f1;
}

.card-in-progress {
  background-color: cornflowerblue;
  color: #f1f1f1;
}

.card-ready {
  background-color: darkblue;
  color: #f1f1f1;
}

.warning-icon{
  color: red;
}
</style>
