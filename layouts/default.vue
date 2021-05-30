<template>
  <v-app dark>
    <NavbarMain :nav-items="navItems" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <NavbarBottom :nav-items="navItems" class="hidden-sm-and-up" />
    <Footer class="hidden-xs-only" />
  </v-app>
</template>

<script>
import NavbarMain from '~/components/NavbarMain'
import NavbarBottom from '~/components/NavbarBottom'
import Footer from '~/components/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    NavbarMain,
    NavbarBottom,
    Footer
  },
  data () {
    return {
      navItems: [
        {
          title: 'Live Dash',
          icon: 'tachometer-alt',
          path: '/'
        },
        {
          title: 'Stats',
          icon: 'chart-line',
          path: '/stats'
        },
        {
          title: 'Profile',
          icon: 'id-card-alt',
          path: '/profile'
        }
      ]
    }
  }
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>
