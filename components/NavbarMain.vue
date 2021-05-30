<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon class="hidden-xs-only" @click="sideDrawer = !sideDrawer" />
      <v-app-bar-title class="primary--text">
        <span class="font-weight-bold">bg</span>
        <span class="font-weight-light">numbers</span>
      </v-app-bar-title>
      <v-spacer />
      <v-btn class="hidden-xs-only" text outlined>
        <span class="mr-2">Sign Out</span>
        <fa icon="sign-out-alt" />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="sideDrawer" app class="white">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="primary--text">
            <span class="font-weight-bold">bg</span>
            <span class="font-weight-light">numbers</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div class="greeting">
            <span>
              <v-avatar
                size="48"
              >
                <img
                  :src="avatarUrl"
                  :alt="username "
                >
              </v-avatar>
            </span>
            <span class="greeting-text"> Hi, {{ username }}</span>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list>
        <v-list-item-group
          color="accent"
        >
          <v-list-item
            v-for="(item, i) in navItems"
            :key="i"
            router
            :to="item.path"
          >
            <v-list-item-icon>
              <fa :icon="item.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'NavbarMain',
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    sideDrawer: false,
    username: 'Orrie'
  }),
  computed: {
    avatarUrl () {
      const avatarUrl = `https://api.multiavatar.com/${this.username}.png`
      return avatarUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.greeting {
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;

   .greeting-text {
     margin-left: 1rem;
     font-weight: 700;
   }
}
</style>
