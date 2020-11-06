const sketch = global.sketch
const Gesture = global.Gestures
const dom = sketch.dom

const $selectButton = dom.$('#select')

Gesture.on($selectButton, 'click', () => {
	console.log('select')
	sketch.setTool('select')
})

const $pencilButton = dom.$('#pencil')
Gesture.on($pencilButton, 'click', () => {
	console.log('pencil')
	sketch.setTool('pencil')
})
