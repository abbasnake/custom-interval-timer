<template>
  <div class="container" :style="{ backgroundColor: currentBlockColor }">
    <div>SETS: {{ sets }}x</div>
    <div class="container__timer">{{ stringifyTimer(currentTimer) }}</div>
    <div>{{ currentBlockRepetitionsLeft }}x</div>
    <AppBlockProgressBar
      :currentTimerIndex="currentTimerIndex + 1"
      :totalTimerCount="totalSequence[currentBlockIndex].timers.length"
    />
    <AppButtonReset
      class="container__reset"
      v-show="!timerIsRunning"
      @onClick="restartTimer"
    />
    <AppButtonPause
      class="container__playPause"
      v-show="timerIsRunning"
      @onClick="stopLoop"
    />
    <AppButtonPlay
      class="container__playPause"
      v-show="!timerIsRunning"
      @onClick="runLoop"
    />
  </div>
</template>

<script>
import { clearInterval, clearTimeout, setTimeout } from 'timers'
import {
  stringifyTimerObject,
  cloneObject,
  setAndReturnInterval,
  decrementTimerObject,
  timerIsFinished,
  returnBlockColorByIndex
} from '../utils/helpers'

export default {
  name: 'Run',
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
      sets: null,
      timeout: null
    }
  },
  components: {
    AppTitlePage: () => import('../components/AppTitlePage'),
    AppBlockProgressBar: () => import('../components/AppBlockProgressBar'),
    AppButtonPause: () => import('../components/AppButtonPause'),
    AppButtonPlay: () => import('../components/AppButtonPlay'),
    AppButtonReset: () => import('../components/AppButtonReset')
  },
  computed: {
    totalTimerCount () {
      return this.$store.getters.totalTimerCount
    },
    currentBlockColor () {
      return returnBlockColorByIndex(this.totalSequence[this.currentBlockIndex].colorIndex)
    }
  },
  created () {
    this.setupTimer()
  },
  mounted () {
    this.runLoop()
  },
  beforeDestroy () {
    this.stopLoop()
  },
  methods: {
    runLoop () {
      this.timerIsRunning = true

      const interval = 1000
      let expected = Date.now() + interval

      const step = () => {
        const timeDrift = Date.now() - expected

        if (this.timerIsRunning) {
          expected += interval
          this.timeout = setTimeout(step, Math.max(0, interval - timeDrift))
          this.decrementTotalTime()
          this.decrementCurrentTimer()
        }
      }

      this.timeout = setTimeout(step, interval)
    },
    stopLoop () {
      clearTimeout(this.timeout)
      this.timerIsRunning = false
    },
    restartTimer () {
      this.setupTimer()
      this.runLoop()
    },
    setupTimer () {
      this.currentBlockIndex = 0
      this.currentTimerIndex = 0
      this.totalTimeLeft = this.$store.getters.totalTime
      this.totalSequence = this.$store.getters.timerBlocks
      this.currentTimer = cloneObject(this.totalSequence[this.currentBlockIndex].timers[this.currentTimerIndex])
      this.currentBlockRepetitionsLeft = this.totalSequence[this.currentBlockIndex].repetitions
      this.sets = this.$store.getters.sets
    },
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
      this.timerIsRunning = false
    },
    updateTimer (timerObject) {
      this.timer = cloneObject(timerObject)
    },
    stringifyTimer (timerObject) {
      return stringifyTimerObject(timerObject)
    }
    // renderButtonTitle () {
    //   return this.timerIsRunning ? 'PAUSE' : 'START'
    // },
    // renderTimerTitle (index) {
    //   if (index === 0) {
    //     return 'PREPERATION'
    //   }
    //   if (index === this.totalSequence.length - 1) {
    //     return 'COOLDOWN'
    //   }

    //   return `CUSTOM TIMER ${index}`
    // }
    // startOrPauseTimer () {
    //   this.timerIsRunning ? this.stopInterval() : this.startInterval()
    // },
    // restartTimer () {
    //   if (this.timerIsRunning) {
    //     this.stopInterval()
    //   }

    //   this.updateTimer(this.initialTotalTime)
    //   this.startInterval()
    // }
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

  &__reset {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  &__playPause {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>
