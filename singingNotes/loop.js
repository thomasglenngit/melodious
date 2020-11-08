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
//if(noteArray.note.includes('s')) {
//   left+= '6.66%'
// }


for(let i=0; i<= 7; i++) {
  noteArray.forEach(function(note) {
    console.log('#' + note + octave + '{\n top: ;\n left: ;\n }\n')
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