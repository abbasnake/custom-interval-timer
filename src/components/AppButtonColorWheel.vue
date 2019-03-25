<template>
  <svg
    class="svg"
    @click="onClick"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 198.4 198.4"
  >
    <g>
      <path class="svg__path svg__green" :style="renderGreenStyles()" d="M23.4,99.2c0,41.9,34,75.9,75.9,75.9c0-25.3,0-50.6,0-75.9C73.9,99.2,48.6,99.2,23.4,99.2z"/>
      <path class="svg__path svg__red" :style="renderRedStyles()" d="M99.2,23.4c-41.9,0-75.9,34-75.9,75.9c25.3,0,50.6,0,75.9,0C99.2,73.9,99.2,48.6,99.2,23.4z"/>
      <path class="svg__path svg__yellow" :style="renderYellowStyles()" d="M99.2,175.1c41.9,0,75.9-34,75.9-75.9c-25.3,0-50.6,0-75.9,0C99.2,124.5,99.2,149.8,99.2,175.1z"/>
      <path class="svg__path svg__blue" :style="renderBlueStyles()" d="M99.2,23.4c0,25.3,0,50.6,0,75.9c25.3,0,50.6,0,75.9,0C175.1,57.3,141.1,23.4,99.2,23.4z"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'AppButtonColorWheel',
  props: {
    colorIndex: {
      type: Number,
      default: 0
    },
    blockIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$store.commit('incrementBlockColor', this.blockIndex)
    },
    returnInactiveOpacity () {
      return 'opacity: .3'
    },
    renderGreenStyles () {
      return this.colorIndex === 0 ? `transform: translate(-10px, 10px);` : this.returnInactiveOpacity()
    },
    renderRedStyles () {
      return this.colorIndex === 1 ? `transform: translate(-10px, -10px);` : this.returnInactiveOpacity()
    },
    renderBlueStyles () {
      return this.colorIndex === 2 ? `transform: translate(10px, -10px);` : this.returnInactiveOpacity()
    },
    renderYellowStyles () {
      return this.colorIndex === 3 ? `transform: translate(10px, 10px);` : this.returnInactiveOpacity()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.svg {
  display: block;
  height: 50px;
  width: 50px;

  &:hover {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  &__path {
    transition: all $transition-speed linear;
  }

  &__yellow {
    fill: $yellow;
  }

  &__red {
    fill: $red;
  }

  &__blue {
    fill: $blue;
  }

  &__green {
    fill: $green;
  }
}

</style>
