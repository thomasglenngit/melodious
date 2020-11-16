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
    window.sketchOnReady = async function () {
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
    const { default: program } = await import('./../singingNotes/index.json')
    // const res = await fetch('./singingNotes/index.json')
    // const program = await res.json()
    // program will be a json file with all sound files in it
    await MIDI.programs.load({
      programID: 0,
      program
    })
    await MIDI.jobs.wait()
  }

  //checks which radio button user has selected this should effect what user sees and how they interact with the page. if user switches from free-play to learn melody mode, will they lose their progress? How can we prevent this? Do we need to save the user's progress in a database and then reload it?
  // Save ? Download ? Warn user they will lose their progress on the canvas and give them the option to 'download my work' or 'continue and discard'

  const radioBtns = document.querySelector('#radio-buttons')
  // let checkedButton = document.querySelector('input[name="setting"]:checked').value;
  const par1 = document.querySelector('#par1')
  const par2 = document.querySelector('#par2')
  radioBtns.addEventListener('click', function (event) {
    let checkedButton = event.target.value;
    console.log(checkedButton)
    if (checkedButton === 'free-play') {
      par1.classList.remove('toggleText2')
      par2.classList.add('toggleText2')
    } else {
      par2.classList.remove('toggleText2')
      par1.classList.add('toggleText2')
    }
  })


  const piano = document.getElementById('keyboard')
  piano.addEventListener('click', async function (event) {
    const keyPressed = event.target.textContent; //gets actual text of clicked key
    const keyId = event.target.id
    console.log('keyId', keyId)
    await playSound(keyPressed)
    await emitSketchLayers(keyPressed)
    await keyLight(keyId)
  })
  //dragging?

  async function keyLight(keyId) {
    // when you press a key, it changes color.
    const change = document.getElementById(keyId)
    change.classList.add('colorAdd')
    setTimeout(function(){
      change.classList.remove('colorAdd')
    }, 1000)
  }

  async function emitSketchLayers(key) {

    const shapes = {
      A: 'star',
      B: 'square',
      C: 'triangle',
      D: 'regularPolygon',
      E: 'spiral',
      F: 'heart',
      G: 'burst'
    }
    const colors = {
      A: '#4c5c76',
      B: '#8e97a4',
      C: '#ebbcc4',
      D: '#e7dada',
      E: '#dc9c55',
      F: '#eccb9c',
      G: '#bbcbd2'
    }

    const doc = sketch.doc
    const note = key.charAt(0) // 'A'
    console.log(shapes[note]) // 'A'
    await doc.addLayer({
      type: shapes[note],  // [shapes[A]]
      fill: colors[note],
      x: getRandomValue(0, doc.width - 100),
      y: getRandomValue(0, doc.height - 100),
      rotation: 6
    })

    function getRandomValue(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    }
  }

  async function playSound(noteToPlay) {

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


