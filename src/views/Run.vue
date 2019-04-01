<template>
  <div class="container" :style="{ backgroundColor: currentBlockColor }">
    <div>LOOP {{ currentSetNumber }} OF {{ totalSetCount }}</div>
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
    <AppBlockProgressBar
      :currentCircleIndex="currentBlockProgress"
      :totalCircleCount="returnCurrentBlockProgressLength()"
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
  removeZeroTimeTimers
} from '../utils/helpers'
import NoSleep from '../utils/noSleep.js'
import Audio from '../utils/audio.js'
import WorkerTimers from '../utils/workerTimers.js'

export default {
  name: 'Run',
  data () {
    return {
      totalSequence: null,
      currentBlockIndex: 0,
      currentTimerIndex: 0,
      currentBlockCurrentRepetition: 1,
      currentBlockProgress: 1,
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
  destroyed () {
    if (this.timerIsRunning) {
      this.stopLoop()
    }
  },
  methods: {
    runLoop () {
      Audio.unmuteAll()
      NoSleep.enable()

      this.timerIsRunning = true

      const interval = 1000
      let expected = Date.now() + interval

      const step = () => {
        const timeDrift = Date.now() - expected

        if (this.timerIsRunning) {
          expected += interval
          this.timeout = WorkerTimers.setTimeout(step, Math.max(0, interval - timeDrift))
          this.decrementCurrentTimer()
        }
      }

      this.timeout = WorkerTimers.setTimeout(step, interval)
    },
    stopLoop () {
      NoSleep.disable()
      WorkerTimers.clearTimeout(this.timeout)
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
      this.currentBlockCurrentRepetition = 1
      this.currentBlockProgress = 1
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
          Audio.beep.play()
        }
        this.currentTimer = timerObject
      }
    },
    switchToNextTimer () {
      this.currentTimerIndex++
      this.currentBlockProgress++
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
        Audio.whistle.play()
      }
    },
    startNextSet () {
      Audio.endBlockWhistle.play()
      this.currentSetNumber++
      this.currentBlockIndex = 0
      this.currentTimerIndex = 0
      this.currentTimer = this.getCurrentTimerFromSequnece()
      this.currentBlockCurrentRepetition = 1
      this.currentBlockProgress = 1
    },
    timerShouldBeep (timerObject) {
      return timerObject.m === 0 && timerObject.s < 4
    },
    areMoreRepetitionsLeft () {
      return this.currentBlockCurrentRepetition < this.totalSequence[this.currentBlockIndex].repetitions
    },
    isLastSet () {
      return this.currentSetNumber === this.totalSetCount
    },
    startNextCurrentBlockRepetition () {
      Audio.whistle.play()
      this.currentBlockCurrentRepetition++
      this.currentTimerIndex = 0
      this.currentTimer = this.getCurrentTimerFromSequnece()
    },
    moveToNextBlock () {
      Audio.endBlockWhistle.play()
      this.currentBlockIndex++
      this.currentTimerIndex = 0
      this.currentTimer = this.getCurrentTimerFromSequnece()
      this.currentBlockCurrentRepetition = 1
      this.currentBlockProgress = 1
    },
    getCurrentTimerFromSequnece () {
      return this.totalSequence[this.currentBlockIndex].timers[this.currentTimerIndex]
    },
    isLastTimerBlock () {
      return this.currentBlockIndex >= this.totalSequence.length - 1
    },
    finishAndResetSequence () {
      Audio.endWhistle.play()
      NoSleep.disable()

      this.setupTimer()
      this.timerIsRunning = false
    },
    returnCurrentBlockProgressLength () {
      const currentBlockLength = this.totalSequence[this.currentBlockIndex].timers.length
      const currentBlockRepetitions = this.totalSequence[this.currentBlockIndex].repetitions

      return currentBlockLength * currentBlockRepetitions
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
  height: 100%;
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
