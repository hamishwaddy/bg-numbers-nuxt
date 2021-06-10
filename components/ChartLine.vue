<template>
  <v-card title="Line">
    <v-btn-toggle tile group>
      <v-btn
        v-for="(item, index) in btn"
        :key="index"
        v-model="chartType"
        x-small
        text
        :value="item.value"
        @click="updateChart(item.value)"
      >
        {{ item.text }}
      </v-btn>
    </v-btn-toggle>
    <ChartLineBase :chart-data="chartData" />
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      btn: [
        { text: '3 hours', value: 'three' },
        { text: '6 hours', value: 'six' },
        { text: '12 hours', value: 'twelve' },
        { text: '24 hours', value: 'twentyfour' }
      ],
      chartData: null,
      data: {
        three: [218, 190, 180, 170, 145, 159, 172, 181, 187, 196, 202, 219, 224, 227, 231, 246, 261, 245, 237, 212, 216, 205, 177, 153, 116, 116, 95, 95, 103, 93, 90, 92, 98, 102, 107, 118]
      },
      labels: {
        three: [1622708117000, 1622706317000, 1622706017000, 1622705717000, 1622705417000, 1622705117000, 1622704817000, 1622704517000, 1622704217000, 1622703917000, 1622703617000, 1622703317000, 1622703017000, 1622702717000, 1622702417000, 1622701519000, 1622696118000, 1622695819000, 1622695518000, 1622695218000, 1622694919000, 1622694618000, 1622694319000, 1622694019000, 1622693718000, 1622693419000, 1622693118000, 1622692819000, 1622692518000, 1622692218000, 1622691918000, 1622691618000, 1622691319000, 1622691019000, 1622690719000, 1622690419000]
      },
      chartType: null
    }
  },
  computed: {
    threeHourBgData () {
      return this.extractBgValues(this.$store.getters.lastThreeHours)
    },
    threeHourBgLabels () {
      return this.extractBgTimes(this.$store.getters.lastThreeHours)
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    extractBgValues (entriesArray) {
      const bgArray = entriesArray.map((entry) => {
        return entry.sgv
      })
      return bgArray
    },
    extractBgTimes (entriesArray) {
      const timesArray = entriesArray.map((entry) => {
        return entry.date
      })
      return timesArray
    },
    fillData () {
      this.chartData = {
        labels: this.labels.three,
        datasets: [
          {
            borderColor: '#bada55',
            data: this.data.three
          }
        ]
      }
      // console.log('labels: ', this.labels)
    },
    updateChart (val) {
      this.chartType = val
      this.$nextTick(() => {
        this.fillData()
      })
    }
  }
}
</script>
