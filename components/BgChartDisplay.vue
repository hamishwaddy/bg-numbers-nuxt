<template>
  <v-card class="bg-chart-display">
    <v-card-actions>
      <v-btn
        v-for="(item, index) in buttons"
        :key="index"
        x-small
        text
        @click="loadChart(item.duration)"
      >
        {{ item.name }}
      </v-btn>
    </v-card-actions>
    <LineChart v-if="loaded" :chart-data="chartData" :height="250" />
  </v-card>
</template>

<script>
import LineChart from '@/components/LineChart.vue'

const CHART_REFRESH_INTERVAL = 15000

export default {
  name: 'BgChartDisplay',
  components: { LineChart },
  props: {
    initialData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      buttons: [
        { name: '3 hours', duration: 3 },
        { name: '6 hours', duration: 6 },
        { name: '12 hours', duration: 12 },
        { name: '24 hours', duration: 24 }
      ],
      loaded: false,
      setIntervalId: null
    }
  },
  computed: {
    chartData () {
      return {
        labels: [],
        bgValues: []
      }
    },
    lastThreeHours () {
      return this.$store.getters.lastThreeHours
    },
    lastSixHours () {
      return this.$store.getters.lastSixHours
    },
    lastTwelveHours () {
      return this.$store.getters.lastTwelveHours
    },
    lastTwentyFourHours () {
      return this.$store.getters.lastTwentyFourHours
    }
  },
  mounted () {
    this.loadInitialChart()
  },
  beforeDestroy () {
    clearInterval(this.setIntervalId)
  },
  methods: {
    convertMgdlToMmol (val) {
      return Number((val / 18.018018).toFixed(1))
    },
    loadInitialChart () {
      this.loaded = false
      this.chartData.bgValues = []
      this.chartData.bgValues = this.initialData.map(entry => this.convertMgdlToMmol(entry.sgv))
      this.chartData.labels = this.initialData.map(entry => entry.date)
      this.loaded = true
      this.refreshThreeHourData()
    },
    async getThreeHourData () {
      this.loaded = false
      await this.$store.dispatch('fetchLastThreeHourBgData')
      this.chartData.bgValues = []
      this.chartData.bgValues = this.lastThreeHours.map(entry => this.convertMgdlToMmol(entry.sgv))
      this.chartData.labels = this.lastThreeHours.map(entry => entry.date)
      console.log(this.chartData.bgValues)
      this.loaded = true
    },
    refreshThreeHourData () {
      clearInterval(this.setIntervalId)
      this.getThreeHourData()
      this.setIntervalId = setInterval(() => {
        this.getThreeHourData()
      }, CHART_REFRESH_INTERVAL)
    },
    async getSixHourData () {
      this.loaded = false
      await this.$store.dispatch('fetchLastSixHourBgData')
      this.chartData.bgValues = []
      this.chartData.bgValues = this.lastSixHours.map(entry => this.convertMgdlToMmol(entry.sgv))
      this.chartData.labels = this.lastSixHours.map(entry => entry.date)
      this.loaded = true
    },
    refreshSixHourData () {
      clearInterval(this.setIntervalId)
      this.getSixHourData()
      this.setIntervalId = setInterval(() => {
        this.getSixHourData()
      }, CHART_REFRESH_INTERVAL)
    },
    async getTwelveHourData () {
      this.loaded = false
      await this.$store.dispatch('fetchLastTwelveHourBgData')
      this.chartData.bgValues = []
      this.chartData.bgValues = this.lastTwelveHours.map(entry => this.convertMgdlToMmol(entry.sgv))
      this.chartData.labels = this.lastTwelveHours.map(entry => entry.date)
      this.loaded = true
    },
    refreshTwelveHourData () {
      clearInterval(this.setIntervalId)
      this.getTwelveHourData()
      this.setIntervalId = setInterval(() => {
        this.getTwelveHourData()
      }, CHART_REFRESH_INTERVAL)
    },
    async getTwentyFourHourData () {
      this.loaded = false
      await this.$store.dispatch('fetchLastTwentyFourHourBgData')
      this.chartData.bgValues = []
      this.chartData.bgValues = this.lastTwentyFourHours.map(entry => this.convertMgdlToMmol(entry.sgv))
      this.chartData.labels = this.lastTwentyFourHours.map(entry => entry.date)
      this.loaded = true
    },
    refreshTwentyFourHourData () {
      clearInterval(this.setIntervalId)
      this.getTwentyFourHourData()
      this.setIntervalId = setInterval(() => {
        this.getTwentyFourHourData()
      }, CHART_REFRESH_INTERVAL)
    },
    loadChart (value) {
      switch (value) {
        case 6:
          this.refreshSixHourData()
          break
        case 12:
          this.refreshTwelveHourData()
          break
        case 24:
          this.refreshTwentyFourHourData()
          break
        default:
          this.refreshThreeHourData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__actions {
  justify-content: space-around;
}
</style>
