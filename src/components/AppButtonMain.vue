<template>
  <div class="StartButton">
    <svg
      class="StartButton__svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110.02 130.5"
      @click="onClick"
    >
      <path
        fill="white"
        d="M110,72.93H110c0-.06,0-.12,0-.17,0-.39-.05-.77-.08-1.16s-.07-1-.12-1.51-.1-.9-.16-1.35-.1-.86-.16-1.28-.15-1-.24-1.44-.13-.76-.2-1.14-.21-1-.32-1.5c-.08-.34-.15-.69-.24-1-.13-.52-.26-1-.41-1.55-.08-.31-.17-.61-.26-.92q-.24-.81-.5-1.61l-.27-.79c-.19-.56-.4-1.12-.61-1.68l-.25-.63c-.24-.6-.48-1.19-.74-1.78l-.19-.41c-.29-.65-.59-1.3-.91-1.94l0-.07A55.25,55.25,0,0,0,88.42,31.74l-.05,0L88,31.45q-.71-.53-1.43-1l-.4-.29-.32-.21-.78-.51,0,0-.15-.1-.67-.43L84,28.68l-.9-.53-.34-.2h0l-1-.58c-.45-.25-.9-.49-1.35-.72l-.94-.48L78,25.46l-.87-.39-1.55-.65-.77-.3c-.56-.21-1.12-.42-1.68-.62l-.64-.21c-.61-.2-1.22-.4-1.84-.58l-.43-.12c-.69-.2-1.37-.38-2.07-.55l-.08,0a55,55,0,0,0-6.22-1.13h-.07l-.17,0,.06-7.24H71V0H38.79V13.6h9.28L48,20.91a55.25,55.25,0,0,0-9.74,2.15h0c-1,.34-2.08.71-3.1,1.11l-9-18.77L13.89,11.23,23.17,30.6a54.66,54.66,0,0,0-5.51,4.48h0a53.6,53.6,0,0,0-8.77,10.4h0a54.68,54.68,0,0,0-4.76,9h0A54.78,54.78,0,0,0,.53,67.63h0a55.2,55.2,0,0,0,7.33,36.24l.15.24q1.22,2,2.62,3.91l.4.53q.7.93,1.44,1.83l.56.68.87,1c.32.35.64.7,1,1s.73.76,1.1,1.13l.86.85.8.77q.78.72,1.6,1.42h0l.27.24,0,0,.25.2.11.09a54.85,54.85,0,0,0,17.72,9.82l.44.15.63.19,1,.32.08,0a55.05,55.05,0,0,0,69.56-44.53h0A55.19,55.19,0,0,0,110,72.93Zm-29.85,24a32.77,32.77,0,0,1-44.69,5.16h0q-.63-.47-1.23-1h0A32.75,32.75,0,0,1,22.23,75.77h0A32.82,32.82,0,0,1,50,43.33l.13,0q1.58-.24,3.21-.32h.21l1.3,0H56l.83,0,.37,0,1.08.09h.07a32.69,32.69,0,0,1,10.14,2.74h0a32.87,32.87,0,0,1,10,7l0,0A32.81,32.81,0,0,1,80.1,96.91Z"
      />
    </svg>
    <div class="StartButton__totalTime" @click="onClick">
      <template v-for="(char, index) in stringifyTimer(totalTime)">
        <span
          :class="`StartButton__totalTime__char StartButton__totalTime__char-${index}`"
          :key="index"
        >
          {{ char }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import { stringifyTimerObject } from '../utils/helpers'

export default {
  name: 'AppButtonMain',
  computed: {
    totalTime () {
      return this.$store.getters.totalTime
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    },
    stringifyTimer (timerObject) {
      return stringifyTimerObject(timerObject)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.StartButton {
  &__svg {
    height: 105px;
    width: 105px;

    &:hover {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  }

  &__totalTime {
    width: 40px;
    position: absolute;
    top: 49%;
    left: calc(50% - 20px);
    display: flex;

    &:hover {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    &__char {
      width: 25%;
      &-0 {
        color: $red;
      }
      &-1 {
        color: $yellow;
      }
      &-2 {
        width: auto;
      }
      &-3 {
        color: $green;
      }
      &-4 {
        color: $blue;
      }
    }
  }
}
</style>
