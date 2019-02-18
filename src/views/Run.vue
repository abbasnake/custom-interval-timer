<template>
  <div class="container">
    <AppTitlePage title="RUN" />
    <div>TIMER IS RUNNING: {{ timerIsRunning }}</div>
    <div>TOTAL TIME LEFT: {{ stringifyTimer(totalTimeLeft) }}</div>
    <div>TOTAL TIMER COUNT: {{ totalTimerCount }}</div>
    <div>Current block repetitions left: {{ currentBlockRepetitionsLeft }}</div>
    <div>Block Num - {{ currentBlockIndex + 1 }}/{{ totalSequence.length }}</div>
    <div>Current Timer Num - {{ currentTimerIndex + 1 }}/{{ totalSequence[currentBlockIndex].timers.length }}</div>
    <div>Current Timer: {{ stringifyTimer(currentTimer) }}</div>
  </div>
</template>

<script>
import { clearInterval } from 'timers'
import {
  stringifyTimerObject,
  cloneObject,
  setAndReturnInterval,
  decrementTimerObject,
  timerIsFinished
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
      looper: null
    }
  },
  components: {
    AppTitlePage: () => import('../components/AppTitlePage')
  },
  computed: {
    totalTimerCount () {
      return this.$store.getters.totalTimerCount
    }
  },
  created () {
    this.totalTimeLeft = this.$store.getters.totalTime
    this.totalSequence = this.$store.getters.timerBlocks
    this.currentTimer = cloneObject(this.totalSequence[0].timers[0])
    this.currentBlockRepetitionsLeft = this.totalSequence[0].repetitions
  },
  mounted () {
    this.looper = setAndReturnInterval(() => {
      this.timerIsRunning = true
      this.decrementTotalTime()
      this.decrementCurrentTimer()
    })
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
            this.finishSequence()
          } else {
            this.moveToNextBlock()
          }
        }
      }
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
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
</style>
