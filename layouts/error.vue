<template>
  <v-app>
    <div class="error-container">
      <div class="error-message">
        <h1 class="mt-5">
          You've gone astray...
        </h1>
        <v-img src="/astray.jpeg" class="mt-5" contain />
      </div>
      <div class="error-info">
        <h2 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h2>
        <h2 v-else>
          {{ otherError }}
        </h2>
        <span>Return to the <NuxtLink to="/">Home page</NuxtLink></span>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
.error-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.error-message h1 {
  text-align: center;
}
.error-info {
  text-align: center;
}
a {
  text-decoration: none;
}
</style>
