<template>
  <div class="containerRepetitions">
    <AppButtonArrow
        orientation="left"
        :fill="color"
        @onClick="updateRepetitions(repetitions - 1)"
      />
    <span class="containerRepetitions__text">{{ repetitions }}x</span>
    <AppButtonArrow
        orientation="right"
        :fill="color"
        @onClick="updateRepetitions(repetitions + 1)"
      />
  </div>
</template>

<script>
export default {
  name: 'AppTimerBlockRepetitions',
  data () {
    return {
      color: 'grey'
    }
  },
  props: {
    repetitions: {
      type: Number,
      required: true
    },
    blockIndex: {
      type: Number,
      required: true
    }
  },
  components: {
    AppButtonArrow: () => import('./AppButtonArrow')
  },
  methods: {
    updateRepetitions (repetitions) {
      if (repetitions > 0) {
        this.$store.commit('updateBlockRepetitions', { blockIndex: this.blockIndex, repetitions })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.containerRepetitions {
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    margin: 0 10px;
    font-size: 30px;
  }
}
</style>
