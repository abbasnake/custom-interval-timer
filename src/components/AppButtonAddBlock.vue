<template>
  <svg
    class="button"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70.9 70.9"
    @click="addBlock"
  >
    <path
      :fill="renderFill()"
      d="M0,70.9c23.6,0,47.2,0,70.9,0c0-23.6,0-47.2,0-70.9C31.7,0,0,31.7,0,70.9z M20.4,43.1v-6h16.5V20.3h6v16.8h16.5
	      v6H42.9v16.8h-6V43.1H20.4z"
    />
  </svg>
</template>

<script>
import { returnBlockColorByIndex } from '../utils/helpers'

export default {
  name: 'AppButtonAddBlock',
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
    addBlock () {
      this.$store.commit('addNewBlock', this.blockIndex)
    },
    renderFill () {
      return returnBlockColorByIndex(this.colorIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.button {
  height: 50px;
  width: 50px;
}
</style>
