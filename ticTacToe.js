var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function (root) {
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});
  
  var Game = TicTacToe.Game = function Game() {
    this.board = [[null, null, null], [null, null, null], [null, null, null]];
    this.xMove();  
  };
  
  Game.prototype.transpose = function() {
    var columns = [];
    var board = this.board;
    
    for (var i = 0; i < board[0].length; i++) {
      columns.push([]);
    }

    for (i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        columns[j].push(board[i][j]);
      }
    }
    
    return columns;
  };
  
  Game.prototype.diagonals = function() {
    var board = this.board;
    var diagonals = [[board[0][0], board[1][1], board[2][2]],
    [board[2][0], board[1][1], board[0][2]]];
    return diagonals;
  };
  
  Game.prototype.isAllSame = function(element, index, array) {
    return array[0] && (element === array[0]);
  };

  Game.prototype.won = function() {
    var check = this.board.concat(this.transpose()).concat(this.diagonals());
    var gameOver = false;
    var that = this;
    check.forEach(function(direction) {
      if (direction.every(that.isAllSame)) {
        gameOver = true;
      }
    });
    
    return gameOver;
  };
  
  Game.prototype.input = function(callback) {
    reader.question("Please select your row: ", function(row){
      reader.question("Please select your column in row: ", function(column){
        row = parseInt(row, 10);
        column = parseInt(column, 10);
        
        callback(row, column);
      });
    });
  };
  
  Game.prototype.xMove = function() {
    var that = this;
    
    this.board.forEach(function(row) {console.log(row);});
    
    this.input(function(row, column) {
      if (that.board[row][column] === null){
        that.board[row][column] = "X";
        if (!that.won()){
          that.oMove();
        }
      } else {
        that.xMove();
      }  
    });
  };
    
  Game.prototype.oMove = function() {
    var that = this;
      
    this.board.forEach(function(row) {console.log(row);});
      
    this.input(function(row, column) {
      if (that.board[row][column] === null){
        that.board[row][column] = "O";
        if (!that.won()){
          that.xMove();
        }
      } else {
        that.oMove();
      }  
    });  
  };
  
  new Game();
  
})(this);