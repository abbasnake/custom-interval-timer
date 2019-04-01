const audio = () => {
  const whistle = new Audio(require('../assets/whistle.mp3'))
  const endBlockWhistle = new Audio(require('../assets/whistle2x.mp3'))
  const endWhistle = new Audio(require('../assets/whistle4x.mp3'))
  const beep = new Audio(require('../assets/beep.mp3'))

  const muteAll = () => {
    beep.muted = true
    whistle.muted = true
    endBlockWhistle.muted = true
    endWhistle.muted = true
  }

  const unmuteAll = () => {
    beep.muted = false
    whistle.muted = false
    endBlockWhistle.muted = false
    endWhistle.muted = false
  }

  return Object.freeze({
    beep,
    whistle,
    endBlockWhistle,
    endWhistle,
    muteAll,
    unmuteAll
  })
}

export default audio()
