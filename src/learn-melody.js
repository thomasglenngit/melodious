import { playSound } from './play-sound'
import { showSyllable } from './show-syllable'
import { getMelody } from './melodies/rainbow'


export async function confirmBeginMelody() { // do we even need a function here ?
  const startSongBtn = document.querySelector('#startSong')
  startSongBtn.addEventListener('click', function () {
    learnMelody()
  })
}

export async function learnMelody() {

  /**
   * @typedef {Object} MelodyNote
   * @property {string} keyToHighlight
   * @property {string} syllable
   * @property {string} note
   */
  /**
   * @typedef {MelodyNote[]} Melody
   */

  let melody;

  melody = getMelody("rainbow")

  function setMelody() {
    let selectedSong = "rainbow"
    if(selectedSong === "rainbow") {
      
    }
  }
  setMelody()

  const piano = document.getElementById('keyboard')

    /**
   * @param {string} keyId
   */
  function addHighlight(keyId) {
    const clear = document.querySelectorAll('.colorAdd')
    for (const elem of clear) {
      elem.classList.remove('colorAdd')
    }
    const pianoKey = document.getElementById(keyId)
    pianoKey.classList.add('colorAdd')

  }
  let index = 0
  const entry = () => melody[index]

  addHighlight(entry().keyToHighlight)

  piano.addEventListener('click', async function (event) {

    const keyId = event.target.id
    // const keyPressed = event.target.textContent // uppercase ex: F2
    const warning = document.querySelector('#hidden-warning')

    if (keyId !== entry().keyToHighlight) {
      warning.classList.remove('continue-message')
      console.log('Something went wrong')
      return
    }

    warning.classList.add('continue-message')
    await playSound(entry().noteID)
    await showSyllable(entry().syllable)
    index++
    if (index < melody.length) {
      addHighlight(entry().keyToHighlight)
    } else {

      const modal = document.querySelector('#song-completed-modal')
      modal.classList.remove('modal-hidden') // don't need the awaits ?
      const modalOverlay = document.querySelector('.modal-overlay')
      modalOverlay.classList.remove('modal-hidden')
      const playAgain = document.querySelector('#play-again')
      const switchModes = document.querySelector('#switch-modes')

      playAgain.addEventListener('click', function () {
        modal.classList.add('modal-hidden')
        modalOverlay.classList.add('modal-hidden')
        sketch.doc.reset()
        learnMelody()
      })

      switchModes.addEventListener('click', function () {
        modal.classList.add('modal-hidden')
        modalOverlay.classList.add('modal-hidden')
        location.reload()
      })

    }
  })
}
