<template>
  <div>
    <template v-for="(timer, index) in block.timers">
      <div class="containerTimer" :key="index">
        <AppButtonArrow
          orientation="left"
          :fill="renderFill()"
          @onClick="decrementOrRemove(index, timer)"
          :removeIcon="isTimerZero(timer)"
        />
        <span class="containerTimer__time">
          <template v-for="(char, index) in stringifyTimer(timer)">
            <span
              class="containerTimer__time__char"
              :style="renderColor()"
              :key="index"
            >
              {{ char }}
            </span>
          </template>
        </span>
        <AppButtonArrow
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

import AppButtonArrow from './AppButtonArrow'

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
    AppButtonArrow
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
@import '../scss/variables';

.containerTimer {
  align-items: center;
  display: flex;
  justify-content: center;

  &__time {
    display: flex;
    height: 65px;
    justify-content: center;
    margin: 0 10px;
    width: 150px;

    &__char {
      font-size: 70px;
      text-align: center;
      transition: color $transition-speed linear;
      width: 35px;

      &:nth-of-type(3) {
        width: auto;
      }
    }
  }
}
</style>
