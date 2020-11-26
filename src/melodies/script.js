import { getMelodyXmas } from './xmas'

function noteNumbers() {
  // let noteID = 0
  const pitches = getMelodyXmas().noteID
  pitches.forEach(function(pitch) {
    pitch++
  })
}

noteNumbers()

