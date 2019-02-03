<template>
  <div>
    <template v-for="(timer, index) in block.timers">
      <div class="containerTimer" :key="index">
        <AppButtonSvg
          orientation="left"
          :fill="renderFill()"
          @onClick="decrementOrRemove(index, timer)"
          :removeIcon="isTimerZero(timer)"
        />
        <span class="containerTimer__time" :style="renderColor()">
          {{ stringifyTimer(timer) }}
        </span>
        <AppButtonSvg
          orientation="right"
          :fill="renderFill()"
          @onClick="increment(index, timer)"
        />
      </div>
    </template>
  </div>
</template>

<script>
import {
  stringifyTimerObject,
  incrementTimerObject,
  decrementTimerObject,
  returnBlockColorByIndex
} from '../utils/helpers'

export default {
  name: 'AppTimerBlockTimer',
  props: {
    blockIndex: {
      type: Number,
      required: true
    },
    block: {
      type: Object,
      required: true
    }
  },
  components: {
    AppButtonSvg: () => import('./AppButtonSvg')
  },
  methods: {
    decrementOrRemove (timerIndex, timer) {
      if (timer.m === 0 && timer.s === 0) {
        this.$store.commit('removeTimerFromBlock', { blockIndex: this.blockIndex, timerIndex })
      } else {
        const timerObject = decrementTimerObject(timer)

        this.$store.commit('updateBlockTimer', { blockIndex: this.blockIndex, timerIndex, timerObject })
      }
    },
    increment (timerIndex, timer) {
      const timerObject = incrementTimerObject(timer)

      this.$store.commit('updateBlockTimer', { blockIndex: this.blockIndex, timerIndex, timerObject })
    },
    renderColor () {
      return `color: ${returnBlockColorByIndex(this.block.colorIndex)}`
    },
    renderFill () {
      return returnBlockColorByIndex(this.block.colorIndex)
    },
    stringifyTimer (timerObject) {
      return stringifyTimerObject(timerObject)
    },
    isTimerZero (timer) {
      return timer.m === 0 && timer.s === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.containerTimer {
  display: flex;
  align-items: center;
  justify-content: center;

  &__time {
    margin: 0 10px;
    font-size: 70px;
    height: 65px;
    line-height: 0.9;
  }
}
</style>
