// moves the shapes on the canvas
export async function moveShapes() {
  let layers = sketch.layers
  layers.forEach(function(layer){
    layer.y += 20
    sketch.doc.render()
  })
}