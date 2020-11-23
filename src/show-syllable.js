export async function showSyllable(syllable){
  const doc = sketch.doc

  await doc.addLayer({
    type: 'fancyText',  // [shapes[A]]
    fontFamily: 'freckle-face',
    fill: '#000',
    textAlign: 'center',
    fontSize: 100,
    content: `${syllable}`,
    x: 200,
    y: 30,
    opacity: 1
  })
}


