<template>
  <div class="ProgressBar">
    <div class="ProgressBar__title" v-if="title">{{ title }}</div>
    <div class="ProgressBar__circleContainer" :style="renderCircleContainerStyles()">
      <template v-for="timerIndex in totalCircleCount">
        <span
          class="ProgressBar__circleContainer__circle"
          :style="renderCircleStyles(timerIndex)"
          :key="timerIndex"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { returnBlockColorByIndex } from '../utils/helpers.js'

export default {
  name: 'AppBlockProgressBar',
  data () {
    return {
      circleSpace: 40
    }
  },
  props: {
    currentCircleIndex: {
      type: Number,
      required: true
    },
    totalCircleCount: {
      type: Number,
      required: true
    },
    title: {
      type: [String, Boolean],
      default: false
    },
    size: {
      type: Number,
      default: 30
    },
    totalSequence: {
      type: [Array, Boolean],
      default: false
    }
  },
  methods: {
    renderCircleContainerStyles () {
      return { 'left': `calc(45% - ${(this.size + (this.circleSpace - this.size)) * (this.currentCircleIndex - 1)}px)` }
    },
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
        'border-width': '1px',
        'width': `${this.size}px`,
        'height': `${this.size}px`,
        'margin': `${(this.circleSpace - this.size) / 2}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

$transition: all 300ms linear;

.ProgressBar {
  overflow: hidden;
  width: 100%;

  &__title {
    font-size: 30px;
    margin-bottom: 5px;
    text-align: center;
  }

  &__circleContainer {
    display: inline-flex;
    transition: $transition;

    &__circle {
      border-color: $black;
      border-style: solid;
      border-radius: 50%;
      transition: $transition;
    }
  }
}

</style>
