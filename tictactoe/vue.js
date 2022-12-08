const wins = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7],
];

var vm = new Vue({
  el: '#app',
  data: {
    win: '',
    turn: 1,
    cells: [
      {id: 1, player: false},
      {id: 2, player: false},
      {id: 3, player: false},
      {id: 4, player: false},
      {id: 5, player: false},
      {id: 6, player: false},
      {id: 7, player: false},
      {id: 8, player: false},
      {id: 9, player: false},
    ],
  },
  methods: {
    onPress(id){
      if(this.win) {
        return
      }

      const selected = this.cells
        .filter(cell => !cell.player)
        .find(cell => cell.id === id);

      if (!selected) {
        return;
      }

      selected.player = this.turn;
      this.checkWinner();
    },
    switchTurn() {
      this.turn = this.turn === 1 ? 2 : 1;
    },
    checkWinner() {
      const selections= this.cells
        .filter(cell => cell.player === this.turn)
        .map(c => c.id).join('');

      const hasWin = wins.filter(win => win.join('') === selections);

      if(hasWin.length > 0) {
        this.win = 'is the winner!';
      } else {
        this.switchTurn();
      }
    },
    restartGame() {
      this.win = '',
      this.cells.forEach(cell => cell.player = false);
    }
  }
});
