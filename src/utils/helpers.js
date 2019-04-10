import { BLOCK_COLORS } from './constants'

const returnTotalTime = state => {
  const { timerBlocks, sets } = state
  const totalTime = { m: 0, s: 0 }

  timerBlocks.forEach(block => {
    block.timers.forEach(timerObject => {
      totalTime.s += timerObject.s * block.repetitions
      totalTime.m += timerObject.m * block.repetitions
    })
  })

  totalTime.m *= sets
  totalTime.s *= sets

  return convertExtraSecondsToMinutes(totalTime)
}

const convertExtraSecondsToMinutes = timerObject => {
  const clone = cloneObject(timerObject)

  if (clone.s > 59) {
    const seconds = clone.s % 60
    const minutes = clone.m + ((clone.s - seconds) / 60)

    clone.s = seconds
    clone.m = minutes
  }

  return clone
}

const removeZeroTimeTimers = timerBlocks => (
  timerBlocks
    .map(timerBlock => {
      const timers = timerBlock.timers.filter(timer => !(timerIsFinished(timer)))

      return { ...timerBlock, timers }
    })
    .filter(({ timers }) => timers.length)
)

const totalTimeExceedsZero = timerBlocks => {
  const isMoreThanZero = timerBlocks.find(({ timers }) => (
    timers.find(timerObject => !(timerIsFinished(timerObject)))
  ))

  return typeof isMoreThanZero !== 'undefined'
}

const returnTotalTimerCount = state => {
  const { timerBlocks, sets } = state
  let count = 0

  timerBlocks.forEach(block => {
    count += block.timers.length * block.repetitions
  })

  return count * sets
}

const stringifyTimerObject = timerObject => {
  const minutes = forceDoubleDigit(timerObject.m)
  const seconds = forceDoubleDigit(timerObject.s)

  return `${minutes}:${seconds}`
}

const forceDoubleDigit = number => (number < 10 ? `0${number}` : `${number}`)

const cloneObject = object => JSON.parse(JSON.stringify(object))

const decrementTimerObject = timerObject => {
  const clone = cloneObject(timerObject)

  if (clone.s <= 0) {
    if (clone.m > 0) {
      clone.m -= 1
      clone.s = 59
    }
  } else {
    clone.s -= 1
  }

  return clone
}

const decrementTimerObjectBySeconds = (timerObject, seconds) => {
  const clone = cloneObject(timerObject)

  clone.s -= seconds

  if (clone.s < 0) {
    if (clone.m <= 0) return { m: 0, s: 0 }

    clone.m -= 1
    clone.s = 60 + clone.s
  }

  return clone
}

const incrementTimerObject = timerObject => {
  const clone = cloneObject(timerObject)

  if (clone.s > 58) {
    clone.m += 1
    clone.s = 0
  } else {
    clone.s += 1
  }

  return clone
}

const incrementTimerObjectBySeconds = (timerObject, seconds) => {
  const clone = cloneObject(timerObject)

  clone.s += seconds

  return convertExtraSecondsToMinutes(clone)
}

const timerIsFinished = timerObject => timerObject.m === 0 && timerObject.s === 0

const returnBlockColorByIndex = index => BLOCK_COLORS[index]

const blockColorArrayLength = BLOCK_COLORS.length

export {
  returnTotalTime,
  stringifyTimerObject,
  cloneObject,
  decrementTimerObject,
  incrementTimerObject,
  timerIsFinished,
  returnBlockColorByIndex,
  blockColorArrayLength,
  returnTotalTimerCount,
  removeZeroTimeTimers,
  totalTimeExceedsZero,
  incrementTimerObjectBySeconds,
  decrementTimerObjectBySeconds
}
