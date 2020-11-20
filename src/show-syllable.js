export async function showSyllable(syllable){
  const doc = sketch.doc
  sketch.tools.text.config({
    content: syllable,
    fontFamily: 'Freckle Face'
  })
  // sketch.setTool('text').then(tool => {
  //   await doc.addLayer(tool)
  // })
  // await doc.addLayer({

  // })
  // sketch.setTool('text')
  // await doc.setTool('')
  console.log(syllable);
}

// sketch.tools.[toolname].config()
// sketch.tools.text.config({params params})
// don't need to pass in anything we don't want to change by default
// similar to state

// sketch.setTool(type).then(tool => {

// })