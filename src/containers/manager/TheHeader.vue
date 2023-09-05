<template>
  <CHeader class="justify-content-end" fixed with-subheader light>
    <CToggler
        in-header
        class="ml-3 d-lg-none"
        @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
        in-header
        class="ml-3 d-md-down-none"
        @click="$store.commit('toggleSidebarDesktop')"
    />

    <nav class="navbar navbar-light bg-light">
      <span class="mb-0 h5">{{ getCurrentPageName }}</span>
    </nav>

    <CHeaderNav class="mr-auto">
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from '../TheHeaderDropdownAccnt.vue'
import sidebarNav from './_nav.js'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  computed: {
    getCurrentPageName() {
      const currentPage = this.findPageName(sidebarNav, this.$route.path);
      return currentPage ? currentPage.name : '';
    }
  },
  methods: {
    findPageName(navItems, path) {
      for (const navItem of navItems) {
        if (navItem._children) {
          const currentPage = this.findPageName(navItem._children, path);
          if (currentPage) {
            return currentPage;
          }
        } else if (navItem.to === path) {
          return navItem;
        }
      }
      return null;
    }
  }
}
</script>
