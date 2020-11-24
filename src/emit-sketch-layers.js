export async function emitSketchLayers(key) {

  const shapes = {
    A: 'star',
    B: 'triangle',
    C: 'ring',
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
    scale: {
      x: 0.3,
      y: 0.4
    },
    type: shapes[note],  // [shapes[A]]
    fill: colors[note],
    x: getRandomValue(0, doc.width - 100),
    y: -30
  })
  sketch.doc.deselectAll()

  function getRandomValue(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }
}