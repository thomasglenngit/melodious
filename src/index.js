import _ from 'lodash'; // DO WE NEED FOR WEBPACK ?
import './styles.scss'; // DO WE NEED FOR WEBPACK ?
// import image-name from './path.png' / DO WE NEED FOR WEBPACK ?
import { MIDI } from './../MIDI.js';
import { load } from './load';
// import './../index.html';

window.addEventListener('load', (event) => {  // may want to remove... 
    // const range = ['A#3', 'A#4', 'A3', 'A4', 'B3', 'B4', 'C#2', 'C#3', 'C2', 'C3', 'C4', 'D#2', 'D#3', 'D2', 'D3', 'E2', 'E3', 'F#2', 'F#3', 'F2', 'F3', 'G#2', 'G#3', 'G2', 'G3']

    // global.MIDI = MIDI
    startup()

    async function startup() {
      await load(['sketch/min/sketch-api.min.css', 'sketch/min/app.min.css', 'sketch/babelHelpers.js', 'sketch/min/sketch-config.min.js', 'sketch/min/sketch-api.min.js'])
      // 'sketch/min/sketch-api.min.css',
      window.sketchOnReady = async function(){
        const sketch = window.sketch;
        const sketchConfig = window.sketchConfig;
        const sketchContainer = document.querySelector('sketch-container');
        sketch.$container = sketchContainer;
        sketch.config(sketchConfig);
        await sketch.createDocument({
          element: sketchContainer
        })
				await sketch.setTool('select')
      }

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
    piano.addEventListener('click', async function(event){
      const keyPressed = event.target.textContent; //gets actual text of clicked key
      await playSound(keyPressed)
			await emitSketchLayers(keyPressed)
    })
    //dragging?

    async function emitSketchLayers(key) {

      const shapes = {
				A: 'star',
				B: 'square',
				C: 'triangle',
				D: 'polygon',
				E: 'spiral',
				F: 'heart',
				G: 'burst'
			}
			const colors = {
				A: 'red',
				B: 'orange',
				C: 'yellow',
				D: 'green',
				E: 'blue',
				F: 'indigo',
				G: 'violet'
      }
      
      const doc = sketch.doc
			const note = key.charAt(0)
			console.log(shapes[note])
			await doc.addLayer({
				type: shapes[note],
				fill: colors[note],
				x: getRandomValue(0, doc.width - 50),
				y: getRandomValue(0, doc.height - 50)
			})

			function getRandomValue(min, max) {
				min = Math.ceil(min)
				max = Math.floor(max)
				return Math.floor(Math.random() * (max - min) + min)
			}
		}

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


