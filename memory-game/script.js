const cardArray = [
  {
    name: '1',
    img:"imgs/1.png"
  },
  {
    name: '2',
    img:"imgs/2.png"
  },
  {
    name: '3',
    img:"imgs/3.png"
  },
  {
    name: '4',
    img:"imgs/4.png"
  },
  {
    name: '5',
    img:"imgs/5.png"
  },
  {
    name: '6',
    img:"imgs/6.png"
  },
  {
    name: '1',
    img:"imgs/1.png"
  },
  {
    name: '2',
    img:"imgs/2.png"
  },
  {
    name: '3',
    img:"imgs/3.png"
  },
  {
    name: '4',
    img:"imgs/4.png"
  },
  {
    name: '5',
    img:"imgs/5.png"
  },
  {
    name: '6',
    img:"imgs/6.png"
  }
]

 cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const result = document.querySelector('#result')
  var cardsChosen = []
  var cardsChosenId = []
  const cardsWon = []

  //create your board
  function createGrid() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img')
      card.setAttribute('src', 'imgs/placeholder.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkMatch() {
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'imgs/placeholder.png')
      cards[optionTwoId].setAttribute('src', 'imgs/placeholder.png')
      alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match')
      cards[optionOneId].setAttribute('src', 'imgs/blank.png')
      cards[optionTwoId].setAttribute('src', 'imgs/blank.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'imgs/placeholder.png')
      cards[optionTwoId].setAttribute('src', 'imgs/placeholder.png')
      alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    result.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      result.textContent = ' Congratulations! You found them all!'
    }
  }

  //flip card
  function flipCard() {
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkMatch, 500)
    }
  }

  createGrid()
