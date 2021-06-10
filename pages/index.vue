<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <section class="current-bg">
        <CurrentBgCard :latest-entry="latestEntry" />
      </section>
      <div>
        <BgChartDisplay :initial-data="lastThreeHours" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import CurrentBgCard from '@/components/CurrentBgCard.vue'
import BgChartDisplay from '@/components/BgChartDisplay.vue'

export default {
  name: 'HomePage',
  components: {
    CurrentBgCard,
    BgChartDisplay
  },
  data () {
    return {
      setIntervalId: null
    }
  },
  computed: {
    latestEntry () {
      return this.$store.getters.latestEntry
    },
    lastThreeHours () {
      return this.$store.getters.lastThreeHours
    }
  },
  mounted () {
    this.refreshLatestEntry()
  },
  beforeDestroy () {
    clearInterval(this.setIntervalId)
  },
  methods: {
    refreshLatestEntry () {
      clearInterval(this.setIntervalId)
      this.setIntervalId = setInterval(() => {
        return this.latestEntry
      }, 10000)
    }
  }
}
</script>
