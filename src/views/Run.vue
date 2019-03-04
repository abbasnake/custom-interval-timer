<template>
  <div class="container" :style="{ backgroundColor: currentBlockColor }">
    <!-- <AppTitlePage title="RUN" />
    <div>TIMER IS RUNNING: {{ timerIsRunning }}</div>
    <div>TOTAL TIME LEFT: {{ stringifyTimer(totalTimeLeft) }}</div>
    <div>TOTAL TIMER COUNT: {{ totalTimerCount }}</div>
    <div>REMAINING SETS: {{ sets }}</div>
    <div>Current block repetitions left: {{ currentBlockRepetitionsLeft }}</div>
    <div>Block Num - {{ currentBlockIndex + 1 }}/{{ totalSequence.length }}</div>
    <div>Current Timer Num - {{ currentTimerIndex + 1 }}/{{ totalSequence[currentBlockIndex].timers.length }}</div> -->
    <div>SETS: {{ sets }}x</div>
    <div class="container__timer">{{ stringifyTimer(currentTimer) }}</div>
    <div>Current block repetitions left: {{ currentBlockRepetitionsLeft }}/{{ totalSequence[currentBlockIndex].repetitions }}</div>
    <AppBlockProgressBar
      :currentTimerIndex="currentTimerIndex + 1"
      :totalTimerCount="totalSequence[currentBlockIndex].timers.length"
    />
    <AppButtonPause
      class="container__playPause"
      v-if="timerIsRunning"
    />
    <AppButtonPlay
      class="container__playPause"
      v-else
    />
  </div>
</template>

<script>
import { clearInterval } from 'timers'
import {
  stringifyTimerObject,
  cloneObject,
  setAndReturnInterval,
  decrementTimerObject,
  timerIsFinished,
  returnBlockColorByIndex
} from '../utils/helpers'

export default {
  name: 'Setup',
  data () {
    return {
      audioWhistle: new Audio(require('../assets/whistle.wav')),
      audioBeep: new Audio(require('../assets/beep.wav')),
      totalSequence: null,
      currentBlockIndex: 0,
      currentTimerIndex: 0,
      currentBlockRepetitionsLeft: null, // needs some other mechanism probably
      timerIsRunning: false,
      currentTimer: null,
      totalTimeLeft: null,
      looper: null,
      sets: null
    }
  },
  components: {
    AppTitlePage: () => import('../components/AppTitlePage'),
    AppBlockProgressBar: () => import('../components/AppBlockProgressBar'),
    AppButtonPause: () => import('../components/AppButtonPause'),
    AppButtonPlay: () => import('../components/AppButtonPlay')
  },
  computed: {
    totalTimerCount () {
      return this.$store.getters.totalTimerCount
    },
    currentBlockColor () {
      return returnBlockColorByIndex(this.totalSequence[this.currentBlockIndex].colorIndex);
    }
  },
  created () {
    this.totalTimeLeft = this.$store.getters.totalTime
    this.totalSequence = this.$store.getters.timerBlocks
    this.currentTimer = cloneObject(this.totalSequence[0].timers[0])
    this.currentBlockRepetitionsLeft = this.totalSequence[0].repetitions
    this.sets = this.$store.getters.sets
  },
  mounted () {
    this.looper = setAndReturnInterval(() => {
      this.timerIsRunning = true
      this.decrementTotalTime()
      this.decrementCurrentTimer()
    })
  },
  beforeDestroy () {
    clearInterval(this.looper)
  },
  methods: {
    decrementTotalTime () {
      this.totalTimeLeft = decrementTimerObject(this.totalTimeLeft)
    },
    decrementCurrentTimer () {
      const newTimerObject = decrementTimerObject(this.currentTimer)

      this.setCurrentTimer(newTimerObject)
    },
    setCurrentTimer (timerObject) {
      if (timerIsFinished(timerObject)) {
        this.audioWhistle.play()
        this.switchToNextTimer()
      } else {
        if (timerObject.m === 0 && timerObject.s < 4) {
          this.audioBeep.play()
        }
        this.currentTimer = timerObject
      }
    },
    switchToNextTimer () {
      this.currentTimerIndex++
      this.currentTimer = this.getCurrentTimerFromSequnece()

      if (this.currentTimer === undefined) {
        if (this.areMoreRepetitionsLeft()) {
          this.startNextCurrentBlockRepetition()
        } else {
          if (this.isLastTimerBlock()) {
            if (this.sets > 1) {
              this.startNextSet()
            } else {
              this.finishSequence()
            }
          } else {
            this.moveToNextBlock()
          }
        }
      }
    },
    startNextSet () {
      this.sets--
      this.currentBlockIndex = 0
      this.currentTimerIndex = 0
      this.currentTimer = this.getCurrentTimerFromSequnece()
      this.currentBlockRepetitionsLeft = this.totalSequence[this.currentBlockIndex].repetitions
    },
    areMoreRepetitionsLeft () {
      return this.currentBlockRepetitionsLeft > 1
    },
    startNextCurrentBlockRepetition () {
      this.currentBlockRepetitionsLeft--
      this.currentTimerIndex = 0
      this.currentTimer = this.getCurrentTimerFromSequnece()
    },
    moveToNextBlock () {
      this.currentBlockIndex++
      this.currentTimerIndex = 0
      this.currentTimer = this.getCurrentTimerFromSequnece()
      this.currentBlockRepetitionsLeft = this.totalSequence[this.currentBlockIndex].repetitions
    },
    getCurrentTimerFromSequnece () {
      return this.totalSequence[this.currentBlockIndex].timers[this.currentTimerIndex]
    },
    isLastTimerBlock () {
      return this.currentBlockIndex >= this.totalSequence.length - 1
    },
    finishSequence () {
      this.totalTimeLeft = { m: 0, s: 0 }
      this.currentTimer = { m: 0, s: 0 }
      this.currentTimerIndex = 0
      this.currentBlockIndex = 0
      this.stopInterval()
    },
    startInterval () {
      this.timerIsRunning = true

      this.looper = setAndReturnInterval(() => {
        const timer = decrementTimerObject(this.timer)
        this.updateTimer(timer)

        if (timerIsFinished(timer)) {
          this.stopInterval()
        }
      })
    },
    stopInterval () {
      clearInterval(this.looper)
      this.looper = null
      this.timerIsRunning = false
    },
    updateTimer (timerObject) {
      this.timer = cloneObject(timerObject)
    },
    stringifyTimer (timerObject) {
      return stringifyTimerObject(timerObject)
    },
    renderButtonTitle () {
      return this.timerIsRunning ? 'PAUSE' : 'START'
    },
    renderTimerTitle (index) {
      if (index === 0) {
        return 'PREPERATION'
      }
      if (index === this.totalSequence.length - 1) {
        return 'COOLDOWN'
      }

      return `CUSTOM TIMER ${index}`
    },
    startOrPauseTimer () {
      this.timerIsRunning ? this.stopInterval() : this.startInterval()
    },
    restartTimer () {
      if (this.timerIsRunning) {
        this.stopInterval()
      }

      this.updateTimer(this.initialTotalTime)
      this.startInterval()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.container {
  background-color: $black;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  &__timer {
    font-size: 9rem;
    margin: 40px 0;
  }

  &__playPause {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>
