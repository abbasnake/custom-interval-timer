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
      default: '90%'
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
  border-radius: 5px;
  display: block;
  height: 50px;
  margin: 10px auto;
  font-size: 30px;
}
</style>
