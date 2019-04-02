<template>
  <svg
    class="Svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70.9 70.9"
    @click="removeBlock"
  >
    <path
      class="Svg__path"
      :fill="renderFill()"
      d="M70.9,0C47.2,0,23.6,0,0,0c0,23.6,0,47.2,0,70.9C39.1,70.9,70.9,39.1,70.9,0z M50.5,27.8v6H11.5v-6H50.5z"
    />
  </svg>
</template>

<script>
import { returnBlockColorByIndex } from '../utils/helpers'

export default {
  name: 'AppButtonRemoveBlock',
  props: {
    colorIndex: {
      type: Number,
      required: true
    },
    blockIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeBlock () {
      this.$store.commit('removeBlockByIndex', this.blockIndex)
    },
    renderFill () {
      return returnBlockColorByIndex(this.colorIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.Svg {
  height: 50px;
  width: 50px;
  z-index: 2;

  &:hover {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  &__path {
    transition: fill $transition-speed linear;
  }
}
</style>
