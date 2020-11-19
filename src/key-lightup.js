  // when you press a key, it changes color.
  export async function keyLightup(keyId) {
    const change = document.getElementById(keyId)
    change.classList.add('colorAdd')
    setTimeout(function(){
      change.classList.remove('colorAdd')
    }, 1000)
  }