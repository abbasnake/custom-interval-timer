<template>
  <svg
    class="Svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70.9 70.9"
    @click="resetTimer"
  >
    <path d="M0,0c0,23.6,0,47.2,0,70.9c23.6,0,47.2,0,70.9,0C70.9,31.7,39.1,0,0,0z M21.4,36.1c-4.5,4.3-4.3,11,0.4,15.1
      c3.9,3.4,11.6,3.7,15.7-3.5c2.4,1.2,4.8,2.3,7.2,3.5c-4,8.8-14.7,13.1-24,8.8c-9.7-4.4-13.6-16-8.6-25.1c2.5-4.6,6.2-7.7,11.3-9
      c6.7-1.7,12.7-0.1,18,4.8c1.4-1.5,2.8-2.9,4.2-4.3c0.7,5.6,1.5,11.2,2.2,17c-5.7-0.9-11.2-1.8-16.9-2.7c1.6-1.5,3-2.8,4.4-4.2
      C32.3,32.9,25.7,31.9,21.4,36.1z"/>
  </svg>
</template>

<script>
export default {
  name: 'AppButtonReset',
  methods: {
    resetTimer () {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.Svg {
  cursor: pointer;
  fill: $black;
  height: 70px;
  width: 70px;
}
</style>
