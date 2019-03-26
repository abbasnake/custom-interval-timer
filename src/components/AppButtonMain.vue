<template>
  <button class="button" @click="onClick" :style="renderWidth()">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'AppButtonMain',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    },
    renderWidth () {
      return `width: ${this.width}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.button {
  background-color: $black;
  border-radius: 10px;
  cursor: pointer;
  display: block;
  font-size: 30px;
  font-weight: 700;
  height: 70px;
  letter-spacing: 5px;
  margin: 10px auto;
  outline: none;
  width: 55%;
}
</style>
