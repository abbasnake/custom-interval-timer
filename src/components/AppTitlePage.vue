<template>
  <h1 class="title">{{ title }}</h1>
</template>

<script>
export default {
  name: 'AppTitlePage',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 22px;
}
</style>
