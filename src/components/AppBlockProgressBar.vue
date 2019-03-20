<template>
  <div class="ProgressBar">
    <template v-for="timerIndex in totalTimerCount">
      <span
        class="ProgressBar__circle"
        :style="renderBackground(timerIndex)"
        :key="timerIndex"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppBlockProgressBar',
  props: {
    currentTimerIndex: {
      type: Number,
      required: true
    },
    totalTimerCount: {
      type: Number,
      required: true
    }
  },
  methods: {
    renderBackground (index) {
      const backgroundTemplate = (color, opacity = 1) => ({ 'background-color': color, 'opacity': opacity })

      if (index < this.currentTimerIndex) return backgroundTemplate('black')
      if (index === this.currentTimerIndex) return backgroundTemplate('black', 0.4)

      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.ProgressBar {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &__circle {
    border: 2px solid rgba(0, 0, 0, .4);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 5px;
  }
}

</style>
