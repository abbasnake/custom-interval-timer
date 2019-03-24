<template>
  <div class="container" :style="{ backgroundColor: currentBlockColor }">
    <div>SETS: {{ currentSetNumber }}/{{ totalSetCount }}</div>
    <div class="container__timer">
      <template v-for="(char, index) in stringifyTimer(currentTimer)">
        <span
          class="container__timer__char"
          :key="index"
        >
          {{ char }}
        </span>
      </template>
    </div>
    <div>{{ currentBlockRepetitionsLeft }}x</div>
    <AppBlockProgressBar
      :currentTimerIndex="currentTimerIndex + 1"
      :totalTimerCount="totalSequence[currentBlockIndex].timers.length"
    />
    <AppButtonReset
      class="container__reset"
      v-show="!timerIsRunning"
      @onClick="goToSetupScreen"
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
import * as workerTimers from 'worker-timers'

import AppBlockProgressBar from '../components/AppBlockProgressBar'
import AppButtonPause from '../components/AppButtonPause'
import AppButtonPlay from '../components/AppButtonPlay'
import AppButtonReset from '../components/AppButtonReset'

import {
  stringifyTimerObject,
  cloneObject,
  decrementTimerObject,
  timerIsFinished,
  returnBlockColorByIndex,
  enableNoSleep,
  disableNoSleep,
  removeZeroTimeTimers
} from '../utils/helpers'

export default {
  name: 'Run',
  data () {
    return {
      audioWhistle: new Audio(require('../assets/whistle.mp3')),
      audioEndWhistle: new Audio(require('../assets/whistle3x.mp3')),
      audioBeep: new Audio(require('../assets/beep.mp3')),
      totalSequence: null,
      currentBlockIndex: 0,
      currentTimerIndex: 0,
      currentBlockRepetitionsLeft: null, // needs some other mechanism probably
      timerIsRunning: false,
      currentTimer: null,
      currentSetNumber: 1,
      timeout: null
    }
  },
  components: {
    AppBlockProgressBar,
    AppButtonPause,
    AppButtonPlay,
    AppButtonReset
  },
  computed: {
    currentBlockColor () {
      return returnBlockColorByIndex(this.totalSequence[this.currentBlockIndex].colorIndex)
    },
    totalSetCount () {
      return this.$store.getters.sets
    }
  },
  created () {
    this.setupTimer()
  },
  mounted () {
    this.runLoop()
  },
  methods: {
    runLoop () {
      enableNoSleep()

      this.timerIsRunning = true

      const interval = 1000
      let expected = Date.now() + interval

      const step = () => {
        const timeDrift = Date.now() - expected

        if (this.timerIsRunning) {
          expected += interval
          this.timeout = workerTimers.setTimeout(step, Math.max(0, interval - timeDrift))
          this.decrementCurrentTimer()
        }
      }

      this.timeout = workerTimers.setTimeout(step, interval)
    },
    stopLoop () {
      disableNoSleep()
      workerTimers.clearTimeout(this.timeout)
      this.timerIsRunning = false
    },
    goToSetupScreen () {
      this.$router.go(-1)
    },
    setupTimer () {
      this.currentBlockIndex = 0
      this.currentTimerIndex = 0
      this.totalSequence = removeZeroTimeTimers(this.$store.getters.timerBlocks)
      this.currentTimer = cloneObject(this.totalSequence[this.currentBlockIndex].timers[this.currentTimerIndex])
      this.currentBlockRepetitionsLeft = this.totalSequence[this.currentBlockIndex].repetitions
      this.currentSetNumber = 1
    },
    decrementCurrentTimer () {
      this.updateCurrentTimer(decrementTimerObject(this.currentTimer))
    },
    updateCurrentTimer (timerObject) {
      if (timerIsFinished(timerObject)) {
        this.switchToNextTimer()
      } else {
        if (this.timerShouldBeep(timerObject)) {
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
            if (this.isLastSet()) {
              this.finishAndResetSequence()
            } else {
              this.startNextSet()
            }
          } else {
            this.moveToNextBlock()
          }
        }
      } else {
        this.audioWhistle.play()
      }
    },
    startNextSet () {
      this.audioWhistle.play()
      this.currentSetNumber++
      this.currentBlockIndex = 0
      this.currentTimerIndex = 0
      this.currentTimer = this.getCurrentTimerFromSequnece()
      this.currentBlockRepetitionsLeft = this.totalSequence[this.currentBlockIndex].repetitions
    },
    timerShouldBeep (timerObject) {
      return timerObject.m === 0 && timerObject.s < 4
    },
    areMoreRepetitionsLeft () {
      return this.currentBlockRepetitionsLeft > 1
    },
    isLastSet () {
      return this.currentSetNumber === this.totalSetCount
    },
    startNextCurrentBlockRepetition () {
      this.audioWhistle.play()
      this.currentBlockRepetitionsLeft--
      this.currentTimerIndex = 0
      this.currentTimer = this.getCurrentTimerFromSequnece()
    },
    moveToNextBlock () {
      this.audioWhistle.play()
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
    finishAndResetSequence () {
      this.audioEndWhistle.play()
      disableNoSleep()

      this.setupTimer()
      this.timerIsRunning = false
    },
    updateTimer (timerObject) {
      this.timer = cloneObject(timerObject)
    },
    stringifyTimer (timerObject) {
      return stringifyTimerObject(timerObject)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px 0;
  position: relative;
  width: 100%;

  &__timer {
    display: flex;
    margin: 40px auto;
    max-width: 400px;
    width: 90%;

    &__char {
      font-size: 9rem;
      text-align: center;
      width: 25%;

      &:nth-of-type(3) {
        width: auto;
      }
    }
  }

  &__reset {
    bottom: 10px;
    left: 10px;
    position: absolute;
  }

  &__playPause {
    bottom: 10px;
    position: absolute;
    right: 10px;
  }
}
</style>
