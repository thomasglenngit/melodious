export async function showSyllable(syllable){
  const doc = sketch.doc
  // let layers = sketch.layers
  // layers.forEach(function(layer){
  //   layer.x -= 130,
  //   // layer.y += 30,
  //   sketch.doc.render
  // })
  await doc.addLayer({
    type: 'fancyText',  // [shapes[A]]
    fontFamily: 'freckle-face',
    fill: '#000',
    textAlign: 'center',
    fontSize: 50,
    content: `${syllable}`,
    x: 900,
    y: 30,
    opacity: 1,
  })
}
//requestAnimationFrame(callback, update render)
//setInterval()
//



// once user switches to learn melody mode, activate the animator and then when the melody is completed the animation will complete