export async function showSyllable(syllable){
  const doc = sketch.doc

  await doc.addLayer({
    type: 'fancyText',  // [shapes[A]]
    fontFamily: 'freckle-face',
    fill: '#000',
    textAlign: 'center',
    fontSize: 50,
    content: `${syllable}`,
    x: 0,
    y: 0

  })

  console.log(syllable);
  
    
}
