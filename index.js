window.addEventListener('load', (event) => {

    // import { MIDI } from 'MIDI.js/src'
    MIDI = MIDI.MIDI
    
    // global.MIDI = MIDI
    startup()
    //selects only key with id of c2
    const c2 = document.getElementById('c2');
    c2.addEventListener('click', playSound);
    
    //selects all buttons with class of key - trying to 
    // let allKeys = document.querySelectorAll('button.key')
    // let clickedKey = allKeys.forEach(function(key){
    //   key.addEventListener('click', logKey(key)
    // )})

    // console.log(clickedKey)
    
    
    async function startup() {
      await MIDI.autoconnect()
      MIDI.channels = 1
      // const {default: program} = await import('./singingNotes/C2.mp3')
      const res = await fetch('./singingNotes/index.json')
      const program = await res.json()
      // program will be a json file with all sound files in it
      await MIDI.programs.load({
          programID: 0,
          program
      })
      await MIDI.jobs.wait()
    
    }
    
    
    async function playSound() {
      // const notes = ['c2']
      let start = MIDI.currentTime
      // const note = notes[0]
      // MIDI.noteOn(0, note, 127, start) // velocity = volume, max is 128, start is used to schedule notes in the future
      MIDI.noteOn(0, "F#2", 127, start);
      MIDI.noteOff(0, "F#2", start + 1500) // Do we add a decay or delay here?
    
      // Do we need any of the following functions?:
      // getCurrentTime()
      // async autoConnect()
      // onProgress()
      // getSoundModule()
      // setSoundModule()
    }

    // async function logKey(key){
    //   console.log(key)
    // }
    
    // MIDI.SoundModule gets the sound module or returns null and console warning if you don't have a sound module
    
    // based off Basic.js

});


