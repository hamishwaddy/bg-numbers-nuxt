<template>
  <v-bottom-navigation
    app
    color="accent"
    class="hidden-sm-and-up"
  >
    <v-btn v-for="(item, i) in navItems" :key="i" router :to="item.path">
      <span>{{ item.title }}</span>
      <fa :icon="item.icon" />
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'NavbarBottom',
  props: {
    navItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
