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
      <AppButtonMain @onClick="runTimer"/>
    </footer>
  </div>
</template>

<script>
import { totalTimeExceedsZero } from '../utils/helpers'
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
    }
  },
  methods: {
    runTimer () {
      if (this.isValidSetup) {
        // used for iOS compatability, audio files must be interacted with before use
        Audio.muteAll()
        NoSleep.enable()
        this.$router.push({ path: '/run' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.SetupScreen {
  width: 100%;
  max-width: 500px;
  height: 100%;
  background-color: $black;

  &__sets {
    position: absolute;
    width: 100%;
    max-width: 500px;
    z-index: 3;
  }

  &__timers {
    height: 95%;
    overflow-y: auto;
    padding: 52px 30px 0;
    width: 100%;

    // adding this instead of padding-bottom because of a bug in firefox
    // where padding does not work when overflow is used
    &::after {
      content: '';
      display: block;
      height: 100px;
    }
  }

  &__footer {
    background-image: linear-gradient(rgba(12, 18, 18, .4), $black, $black, $black);
    position: absolute;
    bottom: 0;
    padding-bottom: 5px;
    width: 100%;
    max-width: 500px;
    text-align: center;
    z-index: 3;
  }
}
</style>
