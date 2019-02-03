<template>
  <div class="containerAddRemoveTimer">
    <AppButtonSvg
      class="containerAddRemoveTimer__button"
      orientation="up"
      fill="grey"
      @onClick="removeLastTimerFromBlock"
    />
    <AppButtonSvg
      class="containerAddRemoveTimer__button"
      orientation="down"
      fill="grey"
      @onClick="addTimerToBlock"
    />
  </div>
</template>

<script>
export default {
  name: 'AppTimerBlockAddRemoveTimer',
  components: {
    AppButtonSvg: () => import('./AppButtonSvg')
  },
  props: {
    blockIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeLastTimerFromBlock () {
      this.$store.commit('removeLastTimerFromBlock', this.blockIndex)
    },
    addTimerToBlock () {
      this.$store.commit('addTimerToBlock', this.blockIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.containerAddRemoveTimer {
  display: flex;
  justify-content: center;

  &__button {
    margin: 0 20px;
  }
}
</style>
