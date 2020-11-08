const noteArray = ['a', 'as', 'b', 'c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs']
keyBoardArray = []
octave = '1'
left = 0
right = 0

//for sharps
//if(noteArray.note.includes('s')) {
//   left+= '4.54%'
// }

//for naturals
//if(note)) {
//   left+= '6.66%'
// }


for (let i = 0; i <= 7; i++) {
  noteArray.forEach(function (note) {
    if (note.includes('s')) {
      left += 4.54
    } else if (note) {
      left+= 6.66
    }
    console.log('#' + note + octave + '{\n top: 0 ;\n left:' + left + ';\n }\n')
  })
  octave++
}

//in Sass is the following:

// @for $i from 0 through 7 {
//   @each $note in $noteArray {
//     #{'#'$note} {
//       top: ;
//       left: ;

//     }
//   }
// }