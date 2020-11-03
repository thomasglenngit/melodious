window.addEventListener('load', (event) => {
  console.log('page is fully loaded');

    // import { MIDI } from 'MIDI.js/src'
    MIDI = MIDI.MIDI
    
    // global.MIDI = MIDI
    startup()
    
    const c2 = document.getElementById('c2');
    c2.addEventListener('click', playSound);
    console.log(c2)
    
    async function startup() {
      await MIDI.autoconnect()
      MIDI.channels = 1
      // const {default: program} = await import('./singingNotes/C2.mp3')
      const res = await fetch('./MIDI.js/examples/soundfont/acoustic_grand_piano2-mp3.json')
      const program = await res.json()
      // program will be a json file with all sound files in it
      await MIDI.programs.load({
          programID: 0,
          program
      })
      await MIDI.jobs.wait()
    
    }
    
    
    async function playSound() {
      const notes = ['c2']
      let start = MIDI.currentTime
      const note = notes[0]
      // MIDI.noteOn(0, note, 127, start) // velocity = volume, max is 128, start is used to schedule notes in the future
      MIDI.noteOn(0, "A0", 127, start);
      MIDI.noteOff(0, "A0", start + 1500) // Do we add a decay or delay here?
    
      // Do we need any of the following functions?:
      // getCurrentTime()
      // async autoConnect()
      // onProgress()
      // getSoundModule()
      // setSoundModule()
      console.log
      console.log("Play C2 sound");
    }
    
    // MIDI.SoundModule gets the sound module or returns null and console warning if you don't have a sound module
    
    // based off Basic.js

});


