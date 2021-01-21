const first = document.querySelector('.screen')
const second = document.querySelector('.outer')
const third = document.querySelector('.inner')
const fourth = document.querySelector('.client')

function screenSize() {
  first.innerText = `window.screen: ${window.screen.width}, ${window.screen.height}`
  second.innerText = `window.outer: ${window.outerWidth}, ${window.outerHeight}`
  third.innerText = `window.inner: ${window.innerWidth}, ${window.innerHeight}`
  fourth.innerText = `documentElement.clientWidth: ${window.document.documentElement.clientWidth}`
}

window.addEventListener('resize', screenSize)
