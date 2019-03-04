<template>
  <svg
    class="button"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70.9 70.9"
    @click="pauseTimer"
  >
    <path d="M0,70.9c23.6,0,47.2,0,70.9,0c0-23.6,0-47.2,0-70.9C31.7,0,0,31.7,0,70.9z M40.6,58.3H30V24.5h10.5V58.3z
      M58.1,58.3H47.6V24.5h10.5V58.3z" />
  </svg>
</template>

<script>
export default {
  name: 'AppButtonPause',
  methods: {
    pauseTimer () {
			console.log('TCL: pause -> pauseTimer')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.button {
  fill: $black;
  height: 70px;
  width: 70px;
}
</style>
