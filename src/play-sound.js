import { MIDI } from './../MIDI.js'

export async function playSound(noteToPlay) {
  let start = MIDI.currentTime
  // MIDI.noteOn(0, note, 127, start) // velocity = volume, max is 128, start is used to schedule notes in the future
  let beatCount = 1/4
  let offset;
  for(let i = 0; i < 8; i++){
    offset = beatCount * i
  }

  // use sliders to adjust volume ?

  MIDI.noteOn(0, noteToPlay, 127, start);
  MIDI.noteOff(0, noteToPlay, start + offset + beatCount / 120) 
}
