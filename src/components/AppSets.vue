<template>
  <div class="Sets">
    <div class="Sets__arrow Sets__arrow__left">
      <AppButtonArrow
        orientation="left"
        fill="white"
        @onMouseDown="updateSetsByAmount(-1)"
        @onMouseUp="stopUpdateSetsLoop"
        @onTouchStart="updateSetsByAmount(-1)"
        @onTouchEnd="stopUpdateSetsLoop"
      />
    </div>
    <span class="Sets__sets">{{ sets }}</span>
    <svg
      class="Sets__svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 53 39.29"
    >
      <path d="M52.42,15.68l0-.06q-.09-.31-.2-.62l-.11-.29L52,14.34,51.82,14l-.14-.31-.17-.35-.14-.27-.19-.35-.14-.24-.22-.36-.13-.21-.24-.37-.12-.18L50.06,11,50,10.85l-.32-.4-.08-.09-.37-.42h0A14.48,14.48,0,0,0,36.24,5.44h0a14.09,14.09,0,0,0-3.43,1h0a14.38,14.38,0,0,0-2.36,1.28h0a14.4,14.4,0,0,0-2.69,2.35h0a14.53,14.53,0,0,0-3.53,7.55l5.69,1.26a8.63,8.63,0,0,1,7.25-7.7h0q.42-.06.84-.09h1l.28,0h0a8.59,8.59,0,0,1,2.67.72h0a8.64,8.64,0,0,1,2.63,1.85h0a8.61,8.61,0,0,1-5.74,14.62V23.06c-3.59,2.7-7.41,5.4-11.1,8.17,3.65,2.71,7.43,5.34,11.09,8.06V34.18a14.46,14.46,0,0,0,13.5-18.5Z"/>
      <path d="M28.78,21.66,23.09,20.4a8.63,8.63,0,0,1-7.26,7.7h0q-.42.06-.84.08h-1l-.28,0h0a8.6,8.6,0,0,1-2.66-.72h0a8.64,8.64,0,0,1-2.63-1.85h0A8.61,8.61,0,0,1,14.08,11v5.26c3.59-2.7,7.42-5.4,11.1-8.16C21.52,5.35,17.75,2.72,14.09,0V5.11A14.46,14.46,0,0,0,.58,23.6l0,.06q.09.31.2.62l.11.29.14.37.14.33.13.31.17.35.14.27.19.35.14.24.22.36.13.21.24.37.12.18.28.38.11.14.32.4.08.09.37.42h0a14.48,14.48,0,0,0,12.93,4.49h0a14.09,14.09,0,0,0,3.43-1h0a14.38,14.38,0,0,0,2.36-1.28h0a14.4,14.4,0,0,0,2.7-2.35h0A14.53,14.53,0,0,0,28.78,21.66Z"/>
    </svg>
    <div class="Sets__arrow Sets__arrow__right">
      <AppButtonArrow
        orientation="right"
        fill="white"
        @onMouseDown="updateSetsByAmount(1)"
        @onMouseUp="stopUpdateSetsLoop"
        @onTouchStart="updateSetsByAmount(1)"
        @onTouchEnd="stopUpdateSetsLoop"
      />
    </div>
  </div>
</template>

<script>
import WorkerTimers from '../utils/workerTimers.js'
import AppButtonArrow from '../components/AppButtonArrow'

export default {
  name: 'AppSets',
  data () {
    return {
      loopSpeed: 100,
      updateSetsLoop: null
    }
  },
  components: {
    AppButtonArrow
  },
  computed: {
    sets () {
      return this.$store.getters.sets
    }
  },
  methods: {
    updateSets (sets) {
      if (sets > 0) {
        this.$store.commit('updateSets', sets)
      }
    },
    updateSetsByAmount (amount) {
      this.updateSets(this.sets + amount)
      this.updateSetsLoop = WorkerTimers.setInterval(() => {
        this.updateSets(this.sets + amount)
      }, this.loopSpeed)
    },
    stopUpdateSetsLoop () {
      WorkerTimers.clearInterval(this.updateSetsLoop)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.Sets {
  align-items: center;
  background-image: linear-gradient($black, $black, $black, rgba(12, 18, 18, .4));
  display: flex;
  justify-content: space-around;
  padding: 10px 0;

  &__arrow {
    flex: 10;

    &__left {
      text-align: right;
    }

    &__right {
      text-align: left;
    }
  }

  &__sets {
    flex: 30px;
    font-size: 40px;
    text-align: center;
  }

  &__svg {
    align-self: center;
    fill: white;
    flex: auto;
    height: 30px;
  }
}
</style>
