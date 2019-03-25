<template>
  <div class="containerSets">
    <AppButtonArrow
      orientation="left"
      fill="grey"
      @onMouseDown="updateSetsByAmount(-1)"
      @onMouseUp="stopUpdateSetsLoop"
      @onTouchStart="updateSetsByAmount(-1)"
      @onTouchEnd="stopUpdateSetsLoop"
    />
    <span class="containerSets__text">
      <span class="containerSets__text__sets">{{ sets }}</span> x sets
    </span>
    <AppButtonArrow
      orientation="right"
      fill="grey"
      @onMouseDown="updateSetsByAmount(1)"
      @onMouseUp="stopUpdateSetsLoop"
      @onTouchStart="updateSetsByAmount(1)"
      @onTouchEnd="stopUpdateSetsLoop"
    />
  </div>
</template>

<script>
import AppButtonArrow from '../components/AppButtonArrow'
import { clearInterval, setInterval } from 'timers';

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
      this.updateSetsLoop = setInterval(() => {
        this.updateSets(this.sets + amount)
      }, this.loopSpeed)
    },
    stopUpdateSetsLoop () {
      clearInterval(this.updateSetsLoop)
    }
  }
}
</script>

<style lang="scss" scoped>
.containerSets {
  align-items: center;
  display: flex;
  justify-content: center;

  &__text {
    display: flex;
    font-size: 40px;
    margin: 0 20px;
    text-align: center;

    &__sets {
      display: block;
      min-width: 39px;
    }
  }
}
</style>
