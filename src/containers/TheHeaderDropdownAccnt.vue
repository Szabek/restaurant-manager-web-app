<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >

    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar mr-2">
          <img
              src="/user_avatar.png"
              class="c-avatar-img">
        </div>
      </CHeaderNavLink>
    </template>

    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Profil</strong>
    </CDropdownHeader>

    <CDropdownItem @click="logout">
      <CIcon name="cilAccountLogout" /> Wyloguj
    </CDropdownItem>

  </CDropdown>
</template>

<script>
import {authComputed} from '@/store/helpers.js'

export default {
  computed: {
    ...authComputed
  },
  name: 'TheHeaderDropdownAccnt',
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  },
}
</script>

<style scoped>

</style>