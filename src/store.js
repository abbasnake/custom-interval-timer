import Vue from 'vue'
import Vuex from 'vuex'
import {
  returnTotalTime,
  returnTotalSequence,
  cloneObject,
  blockColorArrayLength,
  returnTotalTimerCount
} from './utils/helpers'

Vue.use(Vuex)

// STATE
const state = {
  sets: 1,
  timerBlocks: [
    {
      repetitions: 1,
      colorIndex: 0,
      timers: [
        { m: 0, s: 5 }
      ]
    },
    {
      repetitions: 2,
      colorIndex: 1,
      timers: [
        { m: 0, s: 2 },
        { m: 0, s: 3 }
      ]
    }
  ]
}

// GETTERS
const getters = {
  totalTime: state => returnTotalTime(state),
  timerBlocks: state => cloneObject(state.timerBlocks),
  totalTimerCount: state => returnTotalTimerCount(state),
  sets: state => state.sets
}

// MUTATIONS
const mutations = {
  addNewBlock (state, blockIndex) {
    const newArray = cloneObject(state.timerBlocks)
    let nextColorIndex = newArray[blockIndex].colorIndex + 1

    if (nextColorIndex >= blockColorArrayLength) {
      nextColorIndex = 0
    }

    newArray.splice(blockIndex + 1, 0, {
      repetitions: 1,
      colorIndex: nextColorIndex,
      timers: [
        { m: 0, s: 5 }
      ]
    })
    Vue.set(state, 'timerBlocks', newArray)
  },
  removeBlockByIndex (state, blockIndex) {
    const newArray = cloneObject(state.timerBlocks)

    if (newArray.length > 1) {
      newArray.splice(blockIndex, 1)
      Vue.set(state, 'timerBlocks', newArray)
    }
  },
  addTimerToBlock (state, blockIndex) {
    const newArray = cloneObject(state.timerBlocks)

    newArray[blockIndex].timers.push({ m: 0, s: 5 })
    Vue.set(state, 'timerBlocks', newArray)
  },
  removeTimerFromBlock (state, { blockIndex, timerIndex }) {
    const newArray = cloneObject(state.timerBlocks)

    if (newArray[blockIndex].timers.length > 1) {
      newArray[blockIndex].timers.splice(timerIndex, 1)
    } else {
      // duplicate of removeBlockByIndex mutation
      if (newArray.length > 1) {
        newArray.splice(blockIndex, 1)
      }
    }

    Vue.set(state, 'timerBlocks', newArray)
  },
  removeLastTimerFromBlock (state, blockIndex) {
    const newArray = cloneObject(state.timerBlocks)

    if (newArray[blockIndex].timers.length > 1) {
      newArray[blockIndex].timers.pop()
    } else {
      // duplicate of removeBlockByIndex mutation
      if (newArray.length > 1) {
        newArray.splice(blockIndex, 1)
      }
    }

    Vue.set(state, 'timerBlocks', newArray)
  },
  updateBlockRepetitions (state, { blockIndex, repetitions }) {
    const newArray = cloneObject(state.timerBlocks)

    newArray[blockIndex].repetitions = repetitions
    Vue.set(state, 'timerBlocks', newArray)
  },
  updateBlockTimer (state, { blockIndex, timerIndex, timerObject }) {
    const newArray = cloneObject(state.timerBlocks)

    newArray[blockIndex].timers[timerIndex] = timerObject
    Vue.set(state, 'timerBlocks', newArray)
  },
  incrementBlockColor (state, blockIndex) {
    const newArray = cloneObject(state.timerBlocks)
    let colorIndex = newArray[blockIndex].colorIndex + 1

    if (colorIndex >= blockColorArrayLength) {
      colorIndex = 0
    }

    newArray[blockIndex].colorIndex = colorIndex

    Vue.set(state, 'timerBlocks', newArray)
  },
  updateSets (state, sets) {
    state.sets = sets
  }
}

// ACTIONS
const actions = {
}

const store = new Vuex.Store({ state, getters, mutations, actions })

export default store
