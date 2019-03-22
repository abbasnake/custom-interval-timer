<template>
  <div class="containerAddRemoveTimer">
    <AppButtonArrow
      class="containerAddRemoveTimer__button"
      orientation="up"
      fill="grey"
      @onMouseDown="removeLastTimerFromBlock"
      @onTouchStart="removeLastTimerFromBlock"
    />
    <AppButtonArrow
      class="containerAddRemoveTimer__button"
      orientation="down"
      fill="grey"
      @onMouseDown="addTimerToBlock"
      @onTouchStart="addTimerToBlock"
    />
  </div>
</template>

<script>
import AppButtonArrow from './AppButtonArrow'

export default {
  name: 'AppTimerBlockAddRemoveTimer',
  components: {
    AppButtonArrow
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
