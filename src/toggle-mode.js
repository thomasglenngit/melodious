// export /*async*/ function toggleMode(event, par1, par2){
//   let checkedButton = event.target.value;
//     console.log(checkedButton)
//     if (checkedButton === 'free-play') {
//       par1.classList.remove('toggleText2')
//       par2.classList.add('toggleText2')
//     } else {
//       let result = confirm('Changing modes will delete your artwork. Click okay to switch modes or cancel to stay in free-play and save your work before switching.')
//       if(result) {
//         sketch.doc.reset()
//         par2.classList.remove('toggleText2')
//         par1.classList.add('toggleText2')
//       } else {
//         document.getElementById('free-play').checked = true;
//         document.getElementById('learn-melody').checked = false;
//       }
//     }
//     return checkedButton
// }