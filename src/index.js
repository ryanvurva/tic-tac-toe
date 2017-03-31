if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
const $$$ = s => document.getElementById(s)
const body = $('body')
const x = 'X'
const o = 'O'
const cell1 = $$$('1')
const cell2 = $$$('2')
const cell3 = $$$('3')
const cell4 = $$$('4')
const cell5 = $$$('5')
const cell6 = $$$('6')
const cell7 = $$$('7')
const cell8 = $$$('8')
const cell9 = $$$('9')
const move = $$('td')
let warrior = $('h2')
let currentTurn = 'X'
let counter = 0
// let turn = x
const possibleWins = [[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9], [cell1, cell4, cell7], [cell2, cell5, cell8], [cell3, cell6, cell9], [cell1, cell5, cell9], [cell3, cell5, cell7]]

for (let i = 0; i < move.length; i++) {
  move[i].addEventListener('click', () => {
    if (move[i].textContent !== '') {
      return
    }
    move[i].textContent = currentTurn

    let winner = false

    for (let i = 0; i < possibleWins.length; i++) {
      if (possibleWins[i][0].textContent === currentTurn &&
      possibleWins[i][1].textContent === currentTurn &&
    possibleWins[i][2].textContent === currentTurn) {
        warrior.textContent = `${currentTurn} Wins!`
        winner = true
        setTimeout(() => {
          gameOver(true)
          $('body').className += 'modal'
        }, 200)
        // body.className += 'modal'
      }
    }
    if (!winner) {
      counter++
      if (currentTurn === 'X') {
        currentTurn = 'O'
        warrior.textContent = "Ramsay Bolton's turn"
        move[i].className = 'clickedX'
      } else {
        currentTurn = 'X'
        warrior.textContent = "Jon Snow's turn"
        move[i].className = 'clickedO'
      }
    }
    if (counter >= 9) {
      $('body').className += 'modal'
      $('.dialog h3').textContent = 'You both have lived to fight another day.'
    }
  })
}

// modal
const gameOver = () => {
  if (currentTurn === 'X') {
    $('.dialog h3').textContent = 'Congratulations, Jon Snow.  Winterfell is yours!'
  } else {
    $('.dialog h3').textContent = 'You know nothing Jon Snow...  like how to zig-zag'
  }
  setTimeout(() => {
    $('body').className = 'modal'
  }, 200)
}

const resetGame = () => {
  body.className = ' '
  window.location.reload()
}

const main = () => {
  $('.dialog button').addEventListener('click', resetGame)
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
