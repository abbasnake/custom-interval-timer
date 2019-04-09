const audio = () => {
  const whistle = new Audio(require('../assets/whistle.mp3'))
  const endBlockSound = new Audio(require('../assets/whistle4x.mp3'))
  const endSound = new Audio(require('../assets/gong.mp3'))
  const beepOn3 = new Audio(require('../assets/beepSemitoneUp.mp3'))
  const beepOn2 = new Audio(require('../assets/beep.mp3'))
  const beepOn1 = new Audio(require('../assets/beepSemitoneDown.mp3'))

  const muteAll = () => {
    beepOn3.muted = true
    beepOn2.muted = true
    beepOn1.muted = true
    whistle.muted = true
    endBlockSound.muted = true
    endSound.muted = true
  }

  const unmuteAll = () => {
    beepOn3.muted = false
    beepOn2.muted = false
    beepOn1.muted = false
    whistle.muted = false
    endBlockSound.muted = false
    endSound.muted = false
  }

  return Object.freeze({
    beepOn3,
    beepOn2,
    beepOn1,
    whistle,
    endBlockSound,
    endSound,
    muteAll,
    unmuteAll
  })
}

export default audio()
