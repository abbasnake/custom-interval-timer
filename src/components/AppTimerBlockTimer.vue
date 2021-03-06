<template>
  <div>
    <template v-for="(timer, index) in block.timers">
      <div class="Timer" :key="index">
        <AppButtonArrow
          orientation="left"
          :fill="renderFill()"
          :removeIcon="isTimerZero(timer)"
          @onMouseDown="decrementOrRemoveTimer(index, timer)"
          @onMouseUp="stopUpdateTimerLoop"
          @onTouchStart="decrementOrRemoveTimer(index, timer)"
          @onTouchEnd="stopUpdateTimerLoop"
        />
        <span class="Timer__time">
          <template v-for="(char, index) in stringifyTimer(timer)">
            <span
              class="Timer__time__char"
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
          @onMouseDown="incrementTimer(index, timer)"
          @onMouseUp="stopUpdateTimerLoop"
          @onTouchStart="incrementTimer(index, timer)"
          @onTouchEnd="stopUpdateTimerLoop"
        />
      </div>
    </template>
  </div>
</template>

<script>
import {
  stringifyTimerObject,
  incrementTimerObject,
  incrementTimerObjectBySeconds,
  decrementTimerObject,
  decrementTimerObjectBySeconds,
  timerIsFinished,
  returnBlockColorByIndex
} from '../utils/helpers'
import WorkerTimers from '../utils/workerTimers.js'

import AppButtonArrow from './AppButtonArrow'

export default {
  name: 'AppTimerBlockTimer',
  data () {
    return {
      loopSpeed: 100,
      updateTimerLoop: null
    }
  },
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
    decrementOrRemoveTimer (timerIndex, timer) {
      if (timerIsFinished(timer)) {
        this.$store.commit('removeTimerFromBlock', { blockIndex: this.blockIndex, timerIndex })
      } else {
        this.decrementTimer(timerIndex, timer)
      }
    },
    decrementTimer (timerIndex, timer) {
      let timerObject = decrementTimerObject(timer)
      this.updateBlockTimer(timerIndex, timerObject)

      let loopCounter = 0

      this.updateTimerLoop = WorkerTimers.setInterval(() => {
        const timerDecrement = this.timerSecondIncrement(loopCounter)

        timerObject = decrementTimerObjectBySeconds(timerObject, timerDecrement)
        this.updateBlockTimer(timerIndex, timerObject)
        loopCounter++
      }, this.loopSpeed)
    },
    incrementTimer (timerIndex, timer) {
      let timerObject = incrementTimerObject(timer)
      this.updateBlockTimer(timerIndex, timerObject)

      let loopCounter = 0

      this.updateTimerLoop = WorkerTimers.setInterval(() => {
        const timerIncrement = this.timerSecondIncrement(loopCounter)

        timerObject = incrementTimerObjectBySeconds(timerObject, timerIncrement)
        this.updateBlockTimer(timerIndex, timerObject)
        loopCounter++
      }, this.loopSpeed)
    },
    timerSecondIncrement (counter) {
      return counter / 25 < 4 ? Math.ceil(counter / 25) : Math.ceil(counter / 5)
    },
    updateBlockTimer (timerIndex, timerObject) {
      this.$store.commit('updateBlockTimer', { blockIndex: this.blockIndex, timerIndex, timerObject })
    },
    stopUpdateTimerLoop () {
      WorkerTimers.clearInterval(this.updateTimerLoop)
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

.Timer {
  align-items: center;
  display: flex;
  justify-content: center;

  &__time {
    display: flex;
    justify-content: center;
    margin: 0 10px;
    width: 130px;

    &__char {
      font-size: 50px;
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
