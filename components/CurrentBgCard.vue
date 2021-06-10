<template>
  <div v-if="latestEntry" class="bg-card">
    <div class="bg-circle">
      <div class="bg-items">
        <h2>
          {{ ((latestEntry.sgv) / 18.018018).toFixed(1) }}
        </h2>
        <p>{{ currentBg.unit }}</p>
        <fa :icon="arrowDirection" :class="arrowClass" />
        <p>
          {{ calculateTimeAgo(latestEntry.date) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
export default {
  name: 'CurrentBgCard',
  props: {
    latestEntry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currentBg: {
        unit: 'mmol'
      },
      icons: [
        { direction: 'Flat', iconString: 'arrow-alt-circle-right' },
        { direction: 'FortyFiveUp', iconString: 'arrow-alt-circle-right' },
        { direction: 'SingleUp', iconString: 'arrow-alt-circle-up' },
        { direction: 'DoubleUp', iconString: 'angle-double-up' },
        { direction: 'FortyFiveDown', iconString: 'arrow-alt-circle-right' },
        { direction: 'SingleDown', iconString: 'arrow-alt-circle-down' },
        { direction: 'DoubleDown', iconString: 'angle-double-down' },
        { direction: 'NOT COMPUTABLE', iconString: 'poo-storm' }
      ]
    }
  },
  computed: {
    arrowClass () {
      return {
        'forty-five-up': this.latestEntry.direction === 'FortyFiveUp',
        'forty-five-down': this.latestEntry.direction === 'FortyFiveDown'
      }
    },
    arrowDirection () {
      let iconName
      this.icons.filter((i) => {
        if (i.direction === this.latestEntry.direction) {
          iconName = i.iconString
        }
        return iconName
      })
      return iconName
    }
  },
  methods: {
    calculateTimeAgo (value) {
      return formatDistanceToNow(value, { addSuffix: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-card {
  align-items: center;
  // box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  padding: 2rem;
}
.bg-circle {
  border: 5px solid black;
  border-radius: 50%;
  display: flex;
  height: 250px;
  text-align: center;
  width: 250px;
}
.bg-items {
  align-self: center;
  width: 100%;

  h2 {
    font-size: 4.5rem;
    margin-bottom: -22px;
  }

  svg {
      height: 36px;
      width: auto;
    }
}
.forty-five-down {
  transform: rotate(45deg);
}

.forty-five-up {
  transform: rotate(-45deg);
}
</style>
