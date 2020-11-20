export async function showSyllable(syllable){
  const doc = sketch.doc

  await doc.addLayer({
    type: 'fancyText',  // [shapes[A]]
    fontFamily: 'Open Sans',
    fill: 'charteuse',
    textAlign: 'center',
    fontSize: 50,
    content: 'What is up?',
    x: 0,
    y: 0

  })
  // sketch.setTool('text')
  // await doc.setTool('')
  console.log(syllable);
  
    
}
