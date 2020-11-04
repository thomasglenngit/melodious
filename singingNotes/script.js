const { exec } = require('child_process')
const {basename} = require('path')


const fs = require('fs')

fs.readdir('.', async function (err, files) {
  if (err) {
    console.log('Oh no, an error occurred', err)
    process.exit(1)
  }

  const mp3s = files.filter(file => file.endsWith('mp3'))
  const soundFont = {}
  for (const sound of mp3s) {
    let response = await getBase64(sound)
    let noteName = basename(sound, '.mp3')
    soundFont[noteName] = 
      {
      noteData: 
      `data:audio/mpeg;base64,${response}`
    }
  }
  fs.writeFile('./index.json', JSON.stringify(soundFont), () => {
    console.log('hi')
  })

})

function getBase64(sound) {
  return new Promise((resolve, reject) => {
    exec(`openssl base64 -A < ${sound}`, (err, b64String) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(b64String)
      }
    })
  })
}



