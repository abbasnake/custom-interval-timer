<template>
  <button class="button" @click="onClick" :style="renderButtonStyle()">
    <span class="button__text" :style="renderTextStyle()">
      {{ title }}
    </span>
  </button>
</template>

<script>
import { returnBlockColorByIndex } from '../utils/helpers'

export default {
  name: 'AppButtonCorner',
  props: {
    title: {
      type: String,
      required: true
    },
    colorIndex: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      required: true,
      validator: value => ['topLeft', 'bottomRight'].indexOf(value) !== -1
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    },
    renderButtonStyle () {
      const backgroundColor = `background-color: ${returnBlockColorByIndex(this.colorIndex)}`
      const isTopLeft = this.position === 'topLeft'
      const borderRadiusPosition = isTopLeft ? 'border-bottom-right-radius: 50px' : 'border-top-left-radius: 50px'

      return `${backgroundColor}; ${borderRadiusPosition};`
    },
    renderTextStyle () {
      const isTopLeft = this.position === 'topLeft'
      const position = isTopLeft ? 'top: -5px; left: 12px' : 'right: 8px; bottom: -5px'

      return `${position};`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.button {
  display: block;
  height: 50px;
  font-size: 40px;
  width: 50px;
  outline: none;

  &__text {
    color: $black;
    position: absolute;
  }
}
</style>
