<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'hour',
                stepSize: this.timeStepSize(this.chartData.labels.length)
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 24,
                stepSize: 4,
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        responsive: true,
        legend: {
          display: false
        },
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    console.log(this.chartData)
    this.renderChart({
      labels: this.chartData.labels,
      datasets: [
        {
          label: 'BG Data',
          data: this.chartData.bgValues
        }
      ]
    }, this.options)
  },
  methods: {
    timeStepSize (value) {
      switch (value) {
        case 72:
          return 2
        case 144:
          return 3
        case 288:
          return 4
        default:
          return 1
      }
    }
  }
}
</script>
