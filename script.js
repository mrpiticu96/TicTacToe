var TicTacToe = {
  init: function () {
    TicTacToe.symbols = ["X", "O"];
    TicTacToe.squares = Array.from(document.querySelectorAll(".square"));
    TicTacToe.turnIndicator = document.querySelector(".turnIndicator");
    TicTacToe.winnigSets = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    TicTacToe.button = document.querySelector(".newGame");
    TicTacToe.addEventListeners();
    TicTacToe.board = document.querySelector(".board");
    TicTacToe.newGame();
  },

  addEventListeners: function () {
    var ttt = this;
    this.squares.forEach(function (x) {
      x.addEventListener("click", function () {
        ttt.play(this);
      });
    });
    this.button.addEventListener("click", function () {
      ttt.newGame();
    });
  },

  newGame: function () {
    this.activePlayer = 0;
    this.gameOver = false;
    this.squares.forEach(function (x) {
      x.classList.remove(TicTacToe.symbols[0]);
      x.classList.remove(TicTacToe.symbols[1]);
    });
    this.board.classList.remove("gameOver");
  },
  play: function (el) {
    if (!this.gameOver && el.classList.length == 1) {
      el.classList.add(this.symbols[this.activePlayer]);
      if (this.checkWin()) {
        this.turnIndicator.innerText =
          this.symbols[this.activePlayer] + " a castigat!";
        this.gameOver = true;
      } else if (this.checkDraw()) {
        this.turnIndicator.innerText = "Este egal!";
        this.gameOver = true;
      } else {
        this.activePlayer = 1 - this.activePlayer;
        this.turnIndicator.innerText =
          "Randul lui" + " " + this.symbols[this.activePlayer] + ".";
      }
    }
  },
  checkWin: function () {
    var ttt = this;
    return this.winnigSets.some(function (x) {
      return x.every(function (i) {
        return (
          Array.from(ttt.squares[i].classList).indexOf(
            ttt.symbols[ttt.activePlayer]
          ) > -1
        );
      });
    });
  },
  checkDraw: function () {
    return this.squares.every(function (x) {
      return x.classList.length > 1;
    });
  },

  gameOver: function () {
    this.gameOver = true;
    this.board.classList.add("gameOver");
  },
};

window.onload = TicTacToe.init;
