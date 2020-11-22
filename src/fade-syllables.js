export async function fadeSyllables() {
  let layers = sketch.layers
  layers.forEach(function(layer){
  layer.opacity -= 1
  sketch.doc.render()
  })
}

// issues with layers on the canvas