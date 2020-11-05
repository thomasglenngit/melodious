import _ from 'lodash'; // DO WE NEED FOR WEBPACK ?
import './styles.css'; // DO WE NEED FOR WEBPACK ?
// import image-name from './path.png' / DO WE NEED FOR WEBPACK ?
import { MIDI } from './../MIDI.js';
// import './../index.html';

window.addEventListener('load', (event) => {  // may want to remove... 
    // const range = ['A#3', 'A#4', 'A3', 'A4', 'B3', 'B4', 'C#2', 'C#3', 'C2', 'C3', 'C4', 'D#2', 'D#3', 'D2', 'D3', 'E2', 'E3', 'F#2', 'F#3', 'F2', 'F3', 'G#2', 'G#3', 'G2', 'G3']
    
    // global.MIDI = MIDI
    startup()
    
    async function startup() {
      await MIDI.autoconnect()
      MIDI.channels = 1
      const {default: program} = await import('./../singingNotes/index.json')
      // const res = await fetch('./singingNotes/index.json')
      // const program = await res.json()
      // program will be a json file with all sound files in it
      await MIDI.programs.load({
          programID: 0,
          program
      })
      await MIDI.jobs.wait()
    }
  
    const piano = document.getElementById('keyboard')
    piano.addEventListener('click', function(event){
      const keyPressed = event.target.textContent; //gets actual text of clicked key
      playSound(keyPressed)
      console.log(keyPressed);
    })
    
    async function playSound(noteToPlay){

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
    
    // MIDI.SoundModule gets the sound module or returns null and console warning if you don't have a sound module
    
    // based off Basic.js

});


