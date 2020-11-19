import { MIDI } from './../MIDI.js'

export async function playSound(noteToPlay) {
  let start = MIDI.currentTime
  // MIDI.noteOn(0, note, 127, start) // velocity = volume, max is 128, start is used to schedule notes in the future
  MIDI.noteOn(0, noteToPlay, 127, start);
  MIDI.noteOff(0, noteToPlay, start + 1500) // Do we add a decay or delay here?
  // Do we need any of the following functions?:
  // getCurrentTime()
  // async autoConnect()
  // onProgress()
  // getSoundModule()
  // setSoundModule()
}