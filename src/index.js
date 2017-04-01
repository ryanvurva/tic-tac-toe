if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const statements = ['Hear my words, and bear witness to my vow.', 'Night gathers, and now my watch begins. It shall not end until my death.', 'I shall take no wife, hold no lands, father no children.', 'I shall wear no crowns and win no glory. I shall live and die at my post.', 'I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men.', 'I pledge my life and honor to the Night\'s Watch, for this night and all the nights to come.', 'You knelt as boys.  Rise now as Men of the Night\'s Watch.', '--The Night\'s Watch Oath', 'Spoken by Jon Snow to the Old Gods']
let currentStatement = 0
const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)
const $$$ = s => document.getElementById(s)
const body = $('body')
// const x = 'X'
// const o = 'O'
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
        }, 1000)
      }
    }
    if (!winner) {
      counter++
      if (currentTurn === 'X') {
        currentTurn = 'O'
        warrior.textContent = "Ramsay Bolton's turn"
        move[i].className = 'clickedX'
        console.log(statements[currentStatement % statements.length])
        currentStatement += 1
      } else {
        currentTurn = 'X'
        warrior.textContent = "Jon Snow's turn"
        move[i].className = 'clickedO'
        console.log(statements[currentStatement % statements.length])
        currentStatement += 1
      }
    }
    // for (let i = 0; i < possibleWins.length; i++) {
    //   if (possibleWins[i][0].textContent === currentTurn &&
    //   possibleWins[i][1].textContent === currentTurn &&
    // possibleWins[i][2].textContent === currentTurn) {
    //     warrior.textContent = `${currentTurn} Wins!`
    //     winner = true
    //     setTimeout(() => {
    //       gameOver(true)
    //       $('body').className += 'modal'
    //     }, 2000)
    //   }
    // }
    if (counter >= 9) {
      $('.dialog h3').textContent = 'You have both lived to fight another day.'
      setTimeout(() => {
        $('body').className = 'modal'
      }, 2000)
    }
  })
}

// modal
const gameOver = () => {
  if (currentTurn === 'X') {
    $('.dialog h3').textContent = 'Congratulations, Jon Snow.  You\'re the King of the North!'
    $('.dialog h4').textContent = 'Winterfell is Yours!'
  } else {
    $('.dialog h3').textContent = 'You know nothing Jon Snow...  Rickon is dead.'
    $('.dialog h4').textContent = 'If he would have just serpentined.'
  }
  setTimeout(() => {
    $('body').className = 'modal'
  }, 1000)
}

const resetGame = () => {
  setTimeout(() => {
    body.className = ' '
    window.location.reload()
  }, 200)
}

const main = () => {
  $('.dialog button').addEventListener('click', resetGame)
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
