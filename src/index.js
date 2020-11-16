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

    // UNDO, REDO, DOWNLOAD AND DELETE/CLEAR
    const undo = document.querySelector('#undo');
    undo.addEventListener('click', function() {
      sketch.doc.undo();
      console.log("undo clicked")
    })

    const redo = document.querySelector('#redo');
    redo.addEventListener('click', function() {
      sketch.doc.redo();
      // sketch.doc.deselectAll() - not working... why?
      console.log("undo clicked")
    })

    const saveBtn = document.querySelector('#save')
    saveBtn.addEventListener('click', function() {
    sketch.download.svg()
    })

    const deleteBtn = document.querySelector('#deleteBtn')
    deleteBtn.addEventListener('click', function() {
      let result = confirm('Are you sure you want to delete? You will lose your work.')
      if(result) {
        sketch.doc.reset()
      } 
    })


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

  //checks which radio button user has selected this should effect what user sees and how they interact with the page.
  const radioBtns = document.querySelector('#radio-buttons')
  const par1 = document.querySelector('#par1')
  const par2 = document.querySelector('#par2')
  radioBtns.addEventListener('click', function (event) {
    let checkedButton = event.target.value;
    console.log(checkedButton)
    if (checkedButton === 'free-play') {
      par1.classList.remove('toggleText2')
      par2.classList.add('toggleText2')
    } else {
      let result = confirm('Changing modes will delete your artwork. Click okay to switch modes or cancel to stay in free-play and save your work before switching.')
      if(result) {
        sketch.doc.reset()
        par2.classList.remove('toggleText2')
        par1.classList.add('toggleText2')
      } else {
        document.getElementById('free-play').checked = true;
        document.getElementById('learn-melody').checked = false;
      }
    }
  })


  const piano = document.getElementById('keyboard')
  piano.addEventListener('click', async function (event) {
    let checkedButton = document.querySelector('input[name="setting"]:checked').value;
    const keyPressed = event.target.textContent; //gets actual text of clicked key
    const keyId = event.target.id
    console.log('keyId', keyId)
    if(checkedButton === 'free-play'){
      await playSound(keyPressed)
      await emitSketchLayers(keyPressed)
    } else {
      await keyLight(keyId)
    }
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
    // const gesture = sketch.gesture;
    // const pianoplay = document.querySelector('#keyboard')
    
    const note = key.charAt(0) // 'A'
    console.log(shapes[note]) // 'A'
    await doc.addLayer({
      scale: {
        x: getRandomValue(0, 3),
        y: getRandomValue(0, 3),
      },
      type: shapes[note],  // [shapes[A]]
      fill: colors[note],
      // x: getRandomValue(0, doc.width - 100),
      // y: /*-50*/ 0
      x: getRandomValue(0, doc.width - 100),
      y: getRandomValue(0, doc.height - 100),
      // rotation: 6
    })
    // gesture.addEventListener(pianoplay, click, () => {
    //   console.log('hmmm')
    // })
    sketch.doc.deselectAll()

  
    // let animated = sketch.doc.layers
    // // let animatedCenter = animated.pointAt(0.5, 0.5)
    // // const delta = {
    // //   x: animated[i].x,
    // //   y: 500
    // // }
    // for(let i = 0; i < animated.length; i++){
    //   const delta = {
    //     x: animated[i].x,
    //     y: 500
    //   }
    //   let animatedCenter = animated[i].pointAt(0.5, 0.5)
    //   // await puppet.delay(200)
    //   await animated[i].transform([
    //     animatedCenter,
    //     animatedCenter.clone().add(delta)
    //   ], {
    //     ms: 500
    //   })
    // }



    /* 
    example of sketch animation for name challenge
    await puppet.delay(delay)
    await sketch.doc.addLayer({
    name: 'tTop',
    type: 'rectangle',
    fill: blue,
    roundness: 0.2,
    width: 350,
    height: 50,
    x: 560,
    y: 50,
    idx: 2
    })

    // T - Horizontal Drag
    await puppet.delay(delay)
    let tTop = sketch.doc.layers.filter(layer => layer.name === 'tTop')
    tTop = tTop[0]
    let tTopCenter = tTop.pointAt(0.5, 0.5)
    const delta = {
        x: 0,
        y: 150
    }
    await puppet.delay(200)
    await puppet.drag([
        tTopCenter,
        tTopCenter.clone().add(delta)
    ], {
        ms: 500
    })
    */

    // console.log(sketch.doc.layers)
    // await puppet.drag()

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


