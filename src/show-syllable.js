export async function showSyllable(syllable){
  const doc = sketch.doc
  await doc.addLayer({
    type: 'fancyText',  // [shapes[A]]
    fontFamily: 'londrina-shadow',
    fill: '#000',
    textAlign: 'center',
    fontSize: 50,
    content: `${syllable}`,
    x: doc.width - 50,
    y: 30,
    opacity: 1,
  })
}
