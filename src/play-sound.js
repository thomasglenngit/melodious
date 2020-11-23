import { MIDI } from './../MIDI.js'
// import { volume } from './../MIDI.js/src/MIDI/WebAudio/WASound.js'

export async function playSound(noteToPlay) {
  let volume = document.querySelector('#myRange').value
  
  console.log('slider value ', volume)
  let start = MIDI.currentTime
  // MIDI.noteOn(0, note, 127, start) // velocity = volume, max is 128, start is used to schedule notes in the future
  let beatCount = 1/2
  let offset;
  for(let i = 0; i < 8; i++){
    offset = beatCount * i
  }

  // use sliders to adjust volume ?

  MIDI.noteOn(0, noteToPlay, volume, start);
  MIDI.noteOff(0, noteToPlay, start + offset + beatCount / 120) 
}
