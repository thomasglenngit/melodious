export async function playSound(noteToPlay) {
  const start = MIDI.currentTime
  // MIDI.noteOn(0, note, 127, start) // velocity = volume, max is 128, start is used to schedule notes in the future
  const beatCount = 1/2
  let offset;
  for(let i = 0; i < 8; i++){
    offset = beatCount * i
  }

  MIDI.noteOn(0, noteToPlay);
  MIDI.noteOff(0, noteToPlay, start + offset + beatCount / 120) 
}
