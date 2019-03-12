<template>
  <svg
    class="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70.9 70.9"
    @click="playTimer"
  >
    <path d="M0,70.9c23.6,0,47.2,0,70.9,0c0-23.6,0-47.2,0-70.9C31.7,0,0,31.7,0,70.9z M30,62.5V23.7l32.6,18.5L30,62.5z"/>
  </svg>
</template>

<script>
export default {
  name: 'AppButtonPlay',
  methods: {
    playTimer () {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.svg {
  cursor: pointer;
  fill: $black;
  height: 70px;
  width: 70px;
}
</style>
