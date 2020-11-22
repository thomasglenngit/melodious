import { playSound } from './play-sound'
import { showSyllable } from './show-syllable'

export async function confirmBeginMelody(){
  const startSongBtn = document.querySelector('#startSong')
  startSongBtn.addEventListener('click', function() {
    learnMelody()
  })
}

export async function learnMelody() {

  const melody = ['f2', 'f3', 'e3', 'c3', 'd3', 'e3', 'f3']
  const syllables = ['Some', 'where', 'o', 'ver', 'the', 'rain', 'bow', 'way', 'up', ]
  const piano = document.getElementById('keyboard')
  // change name of currentNote to index since it is accessing the index of multiple arrays?
  let currentNote = 0
  let noteToPlay = document.getElementById(melody[currentNote])
  
  noteToPlay.classList.add('colorAdd')

  piano.addEventListener('click', async function(event) {
    const keyId = event.target.id
    const keyPressed = event.target.textContent
    const warning = document.querySelector('#hidden-warning')
    if(keyId === melody[currentNote]) {
      warning.classList.add('continue-message')
      noteToPlay.classList.remove('colorAdd')
      await playSound(keyPressed)
      await showSyllable(syllables[currentNote])
      currentNote++
      noteToPlay = document.getElementById(melody[currentNote])
      if(noteToPlay === null) {
        console.log('Yay, you made it!')
      } else {
        noteToPlay.classList.add('colorAdd')
      }
    } else {
      warning.classList.remove('continue-message')
      console.log('Something went wrong')
    }
  })
}