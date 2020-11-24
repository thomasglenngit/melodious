import { playSound } from './play-sound'
import { showSyllable } from './show-syllable'

export async function confirmBeginMelody() { // do we even need a function here ?
  const startSongBtn = document.querySelector('#startSong')
  startSongBtn.addEventListener('click', function () {
    learnMelody()
  })
}

// global.animate = function() {
//   let layers = sketch.layers
//   console.log('requestAnimation layers ', layers)
//   layers.forEach(layer => {
//     layer.x -= 10
//   })
//   sketch.doc.render()
//   requestAnimationFrame(animate)
// }

// requestAnimationFrame(animate)

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

  const melody = [
    {
      keyToHighlight: 'f2',
      syllable: 'Some',
      noteID: 0
    },
    {
      keyToHighlight: 'f3',
      syllable: 'where',
      noteID: 1
    },
    {
      keyToHighlight: 'e3',
      syllable: 'o',
      noteID: 2
    },
    {
      keyToHighlight: 'c3',
      syllable: 'ver',
      noteID: 3
    },
    {
      keyToHighlight: 'd3',
      syllable: 'the',
      noteID: 4
    },
    {
      keyToHighlight: 'e3',
      syllable: 'rain',
      noteID: 5
    },
    {
      keyToHighlight: 'f3',
      syllable: 'bow',
      noteID: 6
    }
  ]

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
    const keyPressed = event.target.textContent // uppercase ex: F2
    const warning = document.querySelector('#hidden-warning')

    if (keyId !== entry().keyToHighlight) {
      warning.classList.remove('continue-message')
      console.log('Something went wrong')
      return
    }

    warning.classList.add('continue-message')
    await playSound(keyPressed)
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
