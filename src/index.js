import _ from 'lodash' 
import './styles.scss' 
import { MIDI } from './../MIDI.js'
import { load } from './load'
import { moveShapes } from './move-shapes'
import { keyLightup } from './key-lightup'
import { emitSketchLayers } from './emit-sketch-layers'
import { playSound } from './play-sound'
// import { toggleMode } from './toggle-mode'
// import image-name from './path.png' / 


window.addEventListener('load', (event) => {  // may want to remove... 
  // global.MIDI = MIDI
  startup()

  async function startup() {
    await load(['sketch/min/sketch-api.min.css', 'sketch/min/app.min.css', 'sketch/babelHelpers.js', 'sketch/min/sketch-config.min.js', 'sketch/min/sketch-api.min.js'])
    window.sketchOnReady = async function () {
      const sketch = window.sketch;
      const sketchConfig = window.sketchConfig;
      const sketchContainer = document.querySelector('sketch-container')
      sketch.$container = sketchContainer;
      sketch.config(sketchConfig)
      await sketch.createDocument({
        element: sketchContainer
      })
      await sketch.setTool('select')
    }

    // UNDO, REDO, DOWNLOAD AND DELETE/CLEAR
    const undo = document.querySelector('#undo')
    undo.addEventListener('click', function() {
      sketch.doc.undo()
    })

    const redo = document.querySelector('#redo');
    redo.addEventListener('click', function() {
      sketch.doc.redo();
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
    await MIDI.programs.load({
      programID: 0,
      program
    })
    await MIDI.jobs.wait()
  }

  //checks which radio button is selected 
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
  // radioBtns.addEventListener('click', toggleMode(event, par1, par2));

  // user interaction with keyboard based on mode
  const piano = document.getElementById('keyboard')
  piano.addEventListener('click', async function (event) {
    let checkedButton = document.querySelector('input[name="setting"]:checked').value;
    const keyPressed = event.target.textContent; //gets actual text of clicked key
    const keyId = event.target.id
    console.log('keyId', keyId)
    if(checkedButton === 'free-play'){
      await playSound(keyPressed)
      await emitSketchLayers(keyPressed)
      await moveShapes()
    } else {
      await keyLightup(keyId)
    }
  })
  //dragging?
});

