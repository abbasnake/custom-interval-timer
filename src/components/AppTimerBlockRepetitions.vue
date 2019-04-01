<template>
  <div class="containerRepetitions">
    <AppButtonArrow
        orientation="left"
        :fill="returnBlockColor()"
        @onMouseDown="updateRepetitionsByAmount(-1)"
        @onMouseUp="stopUpdateRepetitionsLoop"
        @onTouchStart="updateRepetitionsByAmount(-1)"
        @onTouchEnd="stopUpdateRepetitionsLoop"
      />
    <span
      class="containerRepetitions__text"
      :style="{ color: returnBlockColor() }"
    >
      {{ repetitions }}x
    </span>
    <AppButtonArrow
        orientation="right"
        :fill="returnBlockColor()"
        @onMouseDown="updateRepetitionsByAmount(1)"
        @onMouseUp="stopUpdateRepetitionsLoop"
        @onTouchStart="updateRepetitionsByAmount(1)"
        @onTouchEnd="stopUpdateRepetitionsLoop"
      />
  </div>
</template>

<script>
import AppButtonArrow from './AppButtonArrow'
import { returnBlockColorByIndex } from '../utils/helpers.js'
import WorkerTimers from '../utils/workerTimers.js'

export default {
  name: 'AppTimerBlockRepetitions',
  data () {
    return {
      loopSpeed: 100,
      updateRepetitionsLoop: null,
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
    },
    colorIndex: {
      type: Number,
      required: true
    }
  },
  components: {
    AppButtonArrow
  },
  methods: {
    updateRepetitions (repetitions) {
      if (repetitions > 0) {
        this.$store.commit('updateBlockRepetitions', { blockIndex: this.blockIndex, repetitions })
      }
    },
    updateRepetitionsByAmount (amount) {
      this.updateRepetitions(this.repetitions + amount)
      this.updateRepetitionsLoop = WorkerTimers.setInterval(() => {
        this.updateRepetitions(this.repetitions + amount)
      }, this.loopSpeed)
    },
    stopUpdateRepetitionsLoop () {
      WorkerTimers.clearInterval(this.updateRepetitionsLoop)
    },
    returnBlockColor () {
      return returnBlockColorByIndex(this.colorIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.containerRepetitions {
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    margin: 0 10px;
    font-size: 30px;
    text-align: center;
    transition: color $transition-speed linear;
    width: 30px;
  }
}
</style>
