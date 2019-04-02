<template>
  <div class="ProgressBar">
    <template v-if="totalCircleCount <= 10">
      <template v-for="timerIndex in totalCircleCount">
        <span
          class="ProgressBar__circle"
          :style="renderCircleStyles(timerIndex)"
          :key="timerIndex"
        />
      </template>
    </template>
    <div v-else class="ProgressBar__text">
      TIMER {{ currentCircleIndex }} OF {{ totalCircleCount }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppBlockProgressBar',
  props: {
    currentCircleIndex: {
      type: Number,
      required: true
    },
    totalCircleCount: {
      type: Number,
      required: true
    }
  },
  methods: {
    renderCircleStyles (index) {
      const sizeStyles = {
        'width': `${52 - this.totalCircleCount * 3}px`,
        'height': `${52 - this.totalCircleCount * 3}px`
      }

      const styleTemplate = (color, opacity = 1) => ({
        'background-color': color,
        'opacity': opacity,
        ...sizeStyles
      })

      if (index < this.currentCircleIndex) return styleTemplate('black')
      if (index === this.currentCircleIndex) return styleTemplate('black', 0.4)

      return sizeStyles
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.ProgressBar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &__circle {
    border: 2px solid rgba(0, 0, 0, .4);
    border-radius: 50%;
    margin: 5px;
  }

  &__text {
    font-size: 40px;
  }
}

</style>
