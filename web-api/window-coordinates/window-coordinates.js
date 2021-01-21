const highlight = document.querySelector('#highlight')
const buttonOne = document.querySelector('.by')
const buttonTwo = document.querySelector('.to')
const buttonThree = document.querySelector('.into')
const buttonFour = document.querySelector('.top')

function writeLog(event) {
  const highlightCoor = highlight.getBoundingClientRect()
  const cliX = event.clientX
  const cliY = event.clientY
  const pagX = event.pageX
  const pagY = event.pageY
  console.log(highlightCoor)
  console.log(`client X,Y: ${cliX}, ${cliY}`)
  console.log(`page X,Y: ${pagX}, ${pagY}`)
}

//현재 위치를 기준으로 이동하는 메서드(상대위치)
function scrollByButton() {
  window.scrollBy({ top: 100, left: 0, behavior: 'smooth' })
}

//왼쪽 상단을 기준으로 이동하는 메서드(절대위치)
function scrollToButton() {
  window.scrollTo(0, 0)
}

//특정 요소로 이동하는 메서드
function scrollIntoButton() {
  highlight.scrollIntoView()
}

highlight.addEventListener('click', writeLog)
buttonOne.addEventListener('click', scrollByButton)
buttonTwo.addEventListener('click', scrollToButton)
buttonThree.addEventListener('click', scrollIntoButton)
