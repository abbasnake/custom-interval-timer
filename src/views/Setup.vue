<template>
  <div class="SetupScreen">
    <AppSets class="SetupScreen__sets" />
    <div class="SetupScreen__timers">
      <template v-for="(block, index) in timerBlocks">
        <AppTimerBlock
          :block="block"
          :blockIndex="index"
          :key="index"
        />
      </template>
    </div>
    <footer class="SetupScreen__footer">
      <div class="SetupScreen__footer__total">TOTAL: {{ stringifyTimer(totalTime) }}</div>
      <AppButtonMain :title="mainButtonTitle" @onClick="runTimer"/>
    </footer>
  </div>
</template>

<script>
import { stringifyTimerObject, totalTimeExceedsZero } from '../utils/helpers'
import NoSleep from '../utils/noSleep.js'
import Audio from '../utils/audio.js'

import AppSets from '../components/AppSets'
import AppTimerBlock from '../components/AppTimerBlock'
import AppButtonMain from '../components/AppButtonMain'

export default {
  name: 'Setup',
  components: {
    AppSets,
    AppTimerBlock,
    AppButtonMain
  },
  computed: {
    totalTime () {
      return this.$store.getters.totalTime
    },
    timerBlocks () {
      return this.$store.getters.timerBlocks
    },
    sets () {
      return this.$store.getters.sets
    },
    isValidSetup () {
      return totalTimeExceedsZero(this.timerBlocks)
    },
    mainButtonTitle () {
      return this.isValidSetup ? 'START' : 'SET TIME'
    }
  },
  methods: {
    runTimer () {
      if (this.isValidSetup) {
        Audio.muteAll() // used for iOS compatability, audio files must be interacted with before use
        NoSleep.enable()
        this.$router.push({ path: '/run' })
      }
    },
    stringifyTimer (timerObject) {
      return stringifyTimerObject(timerObject)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.SetupScreen {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 100%;
  background-color: $black;

  &__sets {
    position: absolute;
    width: 100%;
    max-width: 500px;
    z-index: 2;
  }

  &__timers {
    flex: 1;
    overflow-y: auto;
    padding: 52px 30px 150px;
    width: 100%;
  }

  &__footer {
    background-image: linear-gradient(rgba(12, 18, 18, .4), $black, $black, $black);
    position: absolute;
    bottom: 0;
    padding: 10px 0;
    width: 100%;
    max-width: 500px;

    &__total {
      font-size: 26px;
      text-align: center;
    }
  }
}
</style>
