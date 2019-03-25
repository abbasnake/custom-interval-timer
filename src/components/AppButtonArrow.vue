<template>
  <svg
    v-if="!removeIcon"
    class="svg"
    :width="size"
    :height="size"
    :style="returnOrientation()"
    @mousedown.prevent="onMouseDown"
    @mouseup.prevent="onMouseUp"
    @touchstart.prevent="onTouchStart"
    @touchend.prevent="onTouchEnd"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 198.46 184.25"
  >
    <polygon
      class="svg__polygon"
      :fill="fill"
      points="198.46 0 164.8 0 102.97 118.9 36.74 0.02 0 0.02 102.63 184.25 198.46 0"
    />
  </svg>
  <svg
    v-else
    class="svg"
    :width="size"
    :height="size - 1"
    @mousedown.prevent="onMouseDown"
    @mouseup.prevent="onMouseUp"
    @touchstart.prevent="onTouchStart"
    @touchend.prevent="onTouchEnd"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 198.4 198.4"
  >
    <polygon
      class="svg__polygon"
      :fill="fill"
      points="178.1,3.2 179.2,1.3 143.1,1.3 142,3.2 100.4,70.2 62.4,3.2 61.3,1.3 28.3,1.3 29.3,3.2 84.4,100.2
        29,197.8 62.1,197.8 100.4,130.2 142.3,197.8 178.4,197.8 117.9,100.2"
    />
  </svg>
</template>

<script>
export default {
  name: 'AppButtonArrow',
  props: {
    size: {
      type: Number,
      default: 30
    },
    fill: {
      type: String,
      default: 'lightgreen'
    },
    orientation: {
      type: String,
      required: true,
      validator: value => ['left', 'right', 'up', 'down'].indexOf(value) !== -1
    },
    removeIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMouseDown () {
      this.$emit('onMouseDown')
    },
    onMouseUp () {
      this.$emit('onMouseUp')
    },
    onTouchStart () {
      this.$emit('onTouchStart')
    },
    onTouchEnd () {
      this.$emit('onTouchEnd')
    },
    returnOrientation () {
      let degrees = 0

      if (this.orientation === 'left') {
        degrees = 90
      }

      if (this.orientation === 'right') {
        degrees = -90
      }

      if (this.orientation === 'up') {
        degrees = 180
      }

      return `transform: rotate(${degrees}deg)`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.svg {
  opacity: .6;

  &:hover {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  &:active {
    opacity: 1;
  }

  &__polygon {
    transition: fill $transition-speed linear;
  }
}
</style>
