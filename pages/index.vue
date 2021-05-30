<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <section class="current-bg">
        <CurrentBgCard :latest-entry="latestEntry" />
      </section>
      <section class="bg-chart">
        bg line charts
      </section>
    </v-col>
  </v-row>
</template>

<script>
import CurrentBgCard from '@/components/CurrentBgCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    CurrentBgCard
  },
  data: () => ({
    setIntervalId: null
  }),
  async fetch ({ store, error }) {
    try {
      await store.dispatch('entries/fetchLatestEntry')
    } catch (e) {
      console.log(e)
    }
  },
  computed: mapState({
    latestEntry: state => state.entries.latestEntry
  }),
  beforeDestroy () {
    clearInterval(this.setIntervalId)
  }
}
</script>
