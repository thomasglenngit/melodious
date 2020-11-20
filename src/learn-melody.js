import './index'
import { playSound } from './play-sound'
import { showSyllable } from './show-syllable'

export async function learnMelody() {
  const melody = ['f2', 'f3', 'e3', 'c3', 'd3', 'e3', 'f3']
  const syllables = ['Some', 'where', 'o', 'ver', 'the', 'rain', 'bow', 'way', 'up', ]
  const piano = document.getElementById('keyboard')
  
  let note = 0
  
  let change = document.getElementById(melody[note])
  change.classList.add('colorAdd')
  console.log(change)

  piano.addEventListener('click', async function(event) {
    const keyId = event.target.id
    const keyPressed = event.target.textContent
    const warning = document.querySelector('#hidden-warning')
    if(keyId === melody[note]) {
      warning.classList.add('continue-message')
      change.classList.remove('colorAdd')
      await playSound(keyPressed)
      await showSyllable(syllables[note])
      note++
      change = document.getElementById(melody[note])
      if(change === null) {
        console.log('Yay, you made it!')
      } else {
        change.classList.add('colorAdd')
      }
      
    } else {
      // const warning = document.querySelector('#hidden-warning')
      warning.classList.remove('continue-message')
      // setTimeout(function(){
      // warning.classList.add('continue')
      // }, 6000)
      console.log('Something went wrong')
    }
  })
}