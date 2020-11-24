import _ from 'lodash' 
import './styles.scss' 
import { MIDI } from './../MIDI.js'
import { load } from './load'
import { moveShapes } from './move-shapes'
import { emitSketchLayers } from './emit-sketch-layers'
import { playSound } from './play-sound'
import { confirmBeginMelody } from './learn-melody'
import { fadeSyllables } from './fade-syllables'

// canvas UI
const undoBtn = document.querySelector('#undo')
const redoBtn = document.querySelector('#redo')
const saveBtn = document.querySelector('#save')
const deleteBtn = document.querySelector('#delete')
const startSongBtn = document.querySelector('#startSong')
const canvasButtons = [undoBtn, redoBtn, saveBtn, deleteBtn]
// radio button UI
const radioBtns = document.querySelector('#radio-buttons')
const par1 = document.querySelector('#par1')
const par2 = document.querySelector('#par2')
// keyboard
const piano = document.getElementById('keyboard')


window.addEventListener('load', (event) => {  // may want to remove... 
  global.MIDI = MIDI

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

    // canvas UI events
    undoBtn.addEventListener('click', function() {
      sketch.doc.undo()
    })

    // remove redo button since it does not work with moved layers ? check in with Ryan
    redoBtn.addEventListener('click', function() {
      sketch.doc.redo();
    })

    saveBtn.addEventListener('click', function() {
    sketch.download.svg()
    })

    deleteBtn.addEventListener('click', function() {
      let result = confirm('Are you sure you want to delete? You will lose your work.')
      if(result) {
        sketch.doc.reset()
      } 
    })

    await MIDI.autoconnect()
    MIDI.channels = 1
    const { default: program } = await import('./../singingNotes/index.json')
    // const { default: rainbow } = await import('./../rainbow/index.json')
    await MIDI.programs.load({
      programID: 0,
      program
    })
    // await MIDI.programs.load({
    //   programID: 1,
    //   program: rainbow
    // })
    await MIDI.jobs.wait()
  }

  // Handles mode selection
  radioBtns.addEventListener('click', function (event) {
    let checkedButton = event.target.value;

    // FREE PLAY MODE
    if (checkedButton === 'free-play') {
      location.reload()
      par1.classList.remove('toggleText2')
      par2.classList.add('toggleText2')
      startSongBtn.classList.add('hidden')
      canvasButtons.forEach(function(btn) {
        btn.classList.remove('hidden')
      })
    } 

    // LEARN MELODY MODE
    if(checkedButton === 'learn-melody') {

      global.animate = function() {
        let layers = sketch.layers
        console.log('requestAnimation layers ', layers)
        layers.forEach(layer => {
          layer.x -= 2
        })
        sketch.doc.render()
        requestAnimationFrame(animate)
      }
      
      requestAnimationFrame(animate)


      if(sketch.layers.length === 0) {
        sketch.doc.reset()
        confirmBeginMelody()
        par2.classList.remove('toggleText2')
        par1.classList.add('toggleText2')
        startSongBtn.classList.remove('hidden')
        canvasButtons.forEach(function(btn) {
          btn.classList.add('hidden')
        })
      } 
      
      if(sketch.layers.length > 0) {
        let result = confirm('Changing modes will delete your artwork. Click okay to switch modes or cancel to stay in free-play and save your work before switching.')
        if(result) {
          sketch.doc.reset()
          par2.classList.remove('toggleText2')
          par1.classList.add('toggleText2')
          startSongBtn.classList.remove('hidden')
          canvasButtons.forEach(function(btn) {
            btn.classList.add('hidden')
          })
          confirmBeginMelody()
        } else {
          document.getElementById('free-play').checked = true;
          document.getElementById('learn-melody').checked = false; 
        }
      }
    }
  })

  // user interaction with keyboard based on mode
  piano.addEventListener('click', async function (event) {
    let checkedButton = document.querySelector('input[name="setting"]:checked').value;
    const keyPressed = event.target.textContent //gets actual text of clicked key
    if(checkedButton === 'free-play'){
      await playSound(keyPressed)
      await emitSketchLayers(keyPressed)
      await moveShapes()
    } 

    // if(checkedButton === 'learn-melody') {
    //   await fadeSyllables()
    // }
  })
  // add ability for user to drag cursor up and down keyboard?
});

