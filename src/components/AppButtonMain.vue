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
    },
    width: {
      type: String,
      default: '100%'
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
.button {
  background-color: transparent;
  border-radius: 10px;
  cursor: pointer;
  display: block;
  height: 70px;
  margin: 10px auto;
  font-size: 30px;
}
</style>
