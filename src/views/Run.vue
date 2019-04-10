<template>
  <div class="RunScreen" :style="{ backgroundColor: currentBlockColor }">
    <div class="RunScreen__loopInfo">
      <svg
        class="RunScreen__loopInfo__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 53 39.29"
      >
        <path d="M52.42,15.68l0-.06q-.09-.31-.2-.62l-.11-.29L52,14.34,51.82,14l-.14-.31-.17-.35-.14-.27-.19-.35-.14-.24-.22-.36-.13-.21-.24-.37-.12-.18L50.06,11,50,10.85l-.32-.4-.08-.09-.37-.42h0A14.48,14.48,0,0,0,36.24,5.44h0a14.09,14.09,0,0,0-3.43,1h0a14.38,14.38,0,0,0-2.36,1.28h0a14.4,14.4,0,0,0-2.69,2.35h0a14.53,14.53,0,0,0-3.53,7.55l5.69,1.26a8.63,8.63,0,0,1,7.25-7.7h0q.42-.06.84-.09h1l.28,0h0a8.59,8.59,0,0,1,2.67.72h0a8.64,8.64,0,0,1,2.63,1.85h0a8.61,8.61,0,0,1-5.74,14.62V23.06c-3.59,2.7-7.41,5.4-11.1,8.17,3.65,2.71,7.43,5.34,11.09,8.06V34.18a14.46,14.46,0,0,0,13.5-18.5Z"/>
        <path d="M28.78,21.66,23.09,20.4a8.63,8.63,0,0,1-7.26,7.7h0q-.42.06-.84.08h-1l-.28,0h0a8.6,8.6,0,0,1-2.66-.72h0a8.64,8.64,0,0,1-2.63-1.85h0A8.61,8.61,0,0,1,14.08,11v5.26c3.59-2.7,7.42-5.4,11.1-8.16C21.52,5.35,17.75,2.72,14.09,0V5.11A14.46,14.46,0,0,0,.58,23.6l0,.06q.09.31.2.62l.11.29.14.37.14.33.13.31.17.35.14.27.19.35.14.24.22.36.13.21.24.37.12.18.28.38.11.14.32.4.08.09.37.42h0a14.48,14.48,0,0,0,12.93,4.49h0a14.09,14.09,0,0,0,3.43-1h0a14.38,14.38,0,0,0,2.36-1.28h0a14.4,14.4,0,0,0,2.7-2.35h0A14.53,14.53,0,0,0,28.78,21.66Z"/>
      </svg>
      {{ currentSetNumber }} OF {{ totalSetCount }}
    </div>
    <div class="RunScreen__timer">
      <template v-for="(char, index) in stringifyTimer(currentTimer)">
        <span
          class="RunScreen__timer__char"
          :key="index"
        >
          {{ char }}
        </span>
      </template>
    </div>
    <AppBlockProgressBar
      :currentCircleIndex="currentBlockIndex + 1"
      :totalCircleCount="totalSequence.length"
      :totalSequence="totalSequence"
      :size="35"
    />
    <AppBlockProgressBar
      :currentCircleIndex="currentBlockProgress"
      :totalCircleCount="returnCurrentBlockProgressLength()"
    />
    <AppButtonReset
      class="RunScreen__reset"
      v-show="!timerIsRunning"
      @onClick="goToSetupScreen"
    />
    <AppButtonPause
      class="RunScreen__playPause"
      v-show="timerIsRunning"
      @onClick="stopLoop"
    />
    <AppButtonPlay
      class="RunScreen__playPause"
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
          this.makeBeepSound(timerObject)
        }
        this.currentTimer = timerObject
      }
    },
    makeBeepSound (timerObject) {
      const { s } = timerObject

      if (s === 3) return Audio.beepOn3.play()
      if (s === 2) return Audio.beepOn2.play()
      if (s === 1) return Audio.beepOn1.play()
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
      Audio.endBlockSound.play()
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
      Audio.endBlockSound.play()
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
      Audio.endSound.play()
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

.RunScreen {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 0;
  width: 100%;

  &__loopInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 40px;
    text-shadow: -1px 0 $black, 0 1px $black, 1px 0 $black, 0 -1px $black;

    &__svg {
      fill: $black;
      width: 80px;
    }
  }

  &__timer {
    display: flex;
    margin: 20px auto;
    max-width: 400px;
    width: 90%;

    &__char {
      font-size: 9rem;
      text-align: center;
      text-shadow: -1px 0 $black, 0 1px $black, 1px 0 $black, 0 -1px $black;
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
