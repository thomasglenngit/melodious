import './index';
//Procedure
//Melody: 'Take Me Out to the Ball Game' in F major.
//Define for each note: 1. Target note(currentKey); 2. light() 3. Sound(); 4. Shape() 5. Next note(nextKey); 6. Next light()
//Play - to begin the melody (one event listener)
//Correct Note Click - event listener for each correct note in the right order.

//Step 1. Create an array of notes.
//Step 2. Indicate the first note the array with a light.
//Step 3. indicate the next note in the array with a light. 
//Step 4. Repeat steps 3 and 4 until the end of the array

//Melody starts with "learn-melody" radio button
export function learnMelody() {
  const melody = ['f2', 'g3']
  const piano = document.getElementById('keyboard')
  
  let note = 0
  
  let change = document.getElementById(melody[note])
  change.classList.add('colorAdd')
  console.log(change)

  piano.addEventListener('click', function(event) {
    const keyId = event.target.id

    if(keyId === melody[note]) {
      change.classList.remove('colorAdd')
      note++
      change = document.getElementById(melody[note])
      change.classList.add('colorAdd')
    } else {
      console.log('Something went wrong')
    }
  })
}
  



  // export async function nextKeyLight(next) {
  //   next = melody[note + 1]
  //   next.classList.add('colorAdd')
  // }

  // export async function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // export async function melodyLoop() {
  //   for (const note of melody) {
  //     await keyLight(note)
  //     await sleep(500)
  //     if (currentKey === note) {
  //       await playSound(note)
  //       await nextKeyLight(next)
  //       await emitSketchLayers(note)
  //     }
  //     note++
  //   }
  // }

  // export async function asyncForEach(array, callback) {
  //   for (let index = 0; index < array.length; index++) {
  //     await callback(array[index], index, array);
  //   }
  // }



    // await playSound(note)
    // await keyLight(note)
    // await nextKeyLight(note)
    // await emitSketchLayers(note)
    // await sleep(200)

// array = [1,2,3,4,5,6]

//   for(const number of array) {
//   let nextNumber = array[number + 1]
//    console.log(number)
//    console.log(nextNumber)
// }