<template>
  <div class="ProgressBar">
    <template v-if="totalCircleCount <= 10">
      <template v-for="timerIndex in totalCircleCount">
        <span
          class="ProgressBar__circle"
          :style="renderCircleStyles(timerIndex)"
          :key="timerIndex"
        />
      </template>
    </template>
    <div v-else class="ProgressBar__text">
      TIMER {{ currentCircleIndex }} OF {{ totalCircleCount }}
    </div>
  </div>
</template>

<script>
import { returnBlockColorByIndex } from '../utils/helpers.js'

export default {
  name: 'AppBlockProgressBar',
  props: {
    currentCircleIndex: {
      type: Number,
      required: true
    },
    totalCircleCount: {
      type: Number,
      required: true
    },
    totalSequence: {
      type: [Array, Boolean],
      default: false
    }
  },
  methods: {
    renderCircleStyles (index) {
      return this.totalSequence ? this.renderBlockStyles(index) : this.renderTimerStyles(index)
    },
    renderBlockStyles (index) {
      const color = returnBlockColorByIndex(this.totalSequence[index - 1].colorIndex)

      if (index < this.currentCircleIndex) return this.returnStylesByTemplate('black')
      if (index === this.currentCircleIndex) return this.returnStylesByTemplate(color, 5)

      return this.returnStylesByTemplate(color)
    },
    renderTimerStyles (index) {
      const color = 'rgba(0, 0, 0, .1)'

      if (index < this.currentCircleIndex) return this.returnStylesByTemplate('black')
      if (index === this.currentCircleIndex) return this.returnStylesByTemplate(color, 5)

      return this.returnStylesByTemplate(color)
    },
    returnStylesByTemplate (backgroundColor, borderWidth = 1) {
      const commonStyles = this.returnCommonStyles()

      return {
        ...commonStyles,
        'background-color': backgroundColor,
        'border-width': `${borderWidth}px`
      }
    },
    returnCommonStyles () {
      return {
        'width': `${52 - this.totalCircleCount * 3}px`,
        'height': `${52 - this.totalCircleCount * 3}px`,
        'border-width': '1px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.ProgressBar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &__circle {
    border-color: $black;
    border-style: solid;
    border-radius: 50%;
    margin: 5px;
    transition: all 300ms linear;
  }

  &__text {
    font-size: 40px;
  }
}

</style>
