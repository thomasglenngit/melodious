// function piano() {
  noteArray = ['a', 'as', 'b', 'c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs']
  keyBoardArray = []
  octave = '1'
  left = 0

  for (let i = 0; i <= 7; i++) {
    noteArray.forEach(function (note) {
      if (note.includes('cs' || 'fs')) {
        left += 1.26
      }
      else if (note.includes('ds' || 'gs' || 'as')) {
        left += 0.63
      }
      else if (note) {
        // left += 1.06
      }
      console.log('#' + note + octave + '{\n top: 0 ;\n left:' + left.toFixed(2) + '%' + ';\n }\n')
    })
    octave++
  }
// }

//in Sass is the following:
// $noteArray: ['a', 'as', 'b', 'c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs']
// $keyBoardArray: []
// $octave = '1'
// $left = @debug 0
// $right = @debug 0

// @function piano($note) {
//   @for $i from 0 through 7 {
//     @each $note in $noteArray {
//       @if $note includes 'cs' || 'fs' {
//           $left += 9.08
// //       } @else if $note includes 'ds' || 'gs' || 'as' {
//           $left += 4.54
//       // } @else if $note {
//           $left += 6.66
//       }
        // @return('#' + note + octave + '{\n top: 0 ;\n left:' + left.toFixed(2) + '%' + ';\n }\n')
//     }
//   }
// }