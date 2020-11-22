export async function fadeSyllables() {
    let layers = sketch.layers
    layers.forEach(function(layer){
      layer.opacity -= 1
      sketch.doc.render()
    })
}

// issues with opacity - layers return
// 'some' disappears, but then returns and overlapps 'o' in 'over'