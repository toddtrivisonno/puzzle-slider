// Tile making factory
var tiles = [];

// Tile Constructor
class Tile {
   constructor(startEndPos, currentPos, x, y, type) {
      this.startEndPos = startEndPos;
      this.currentPos = currentPos;
      this.x = x;
      this.y = y;
      this.type = type;

      this.content = document.getElementById(startEndPos);
      this.content.innerHTML = currentPos;
   }
}

function tileClick(e) {
   /* find the zero tile in JS and on Board */
   let positionOfBlankTile = 0;
   var positionOfCurrentTile = e.target.id;

   // Gets the index of the array of the blank tile by current position
   for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].currentPos == 0) {
         positionOfBlankTile = i;
         break;
      }
   }
   /* Check if its a valid move */
   if (positionOfCurrentTile == positionOfBlankTile + 1 ||
      positionOfCurrentTile == positionOfBlankTile - 1 ||
      positionOfCurrentTile == positionOfBlankTile + 4 ||
      positionOfCurrentTile == positionOfBlankTile - 4) {

      /* find the clicked tile in JS and on Board */
      let clickedTile = tiles[e.target.id];
      let zeroTile = tiles[positionOfBlankTile];

      /* if /\    Swap 2 tiles */
      let storeClickedTile = clickedTile.currentPos;
      clickedTile.currentPos = zeroTile.currentPos;
      zeroTile.currentPos = storeClickedTile;

      /* if /\    make changes to html / render the new 2 tiles */
      document.getElementById(positionOfBlankTile).innerHTML = zeroTile.currentPos;
      document.getElementById(e.target.id).innerHTML = clickedTile.currentPos;
      console.log(clickedTile);
      console.log(zeroTile);
   }
   /* else /\  dont make any changes */
}


// Create and push blank tile into array
function createGrid() {
   let xCnt = 1;
   let yCnt = 0;
   var blankTile = new Tile(
      0,
      0,
      0,
      0,
      1
   )
   tiles.push(blankTile);

   for (let i = 1; i <= 15; i++) {

      let movingTile = new Tile(
         i,
         i,
         xCnt,
         yCnt,
         0
      )

      if (xCnt < 3) {
         xCnt++;
      } else if (xCnt == 3) {
         yCnt++;
         xCnt = 0;
      }

      tiles.push(movingTile);
   }
   console.log(tiles);
}



// Create Puzzle UI
function loadPuzzle() {
   var newDiv = document.createElement('div');
   newDiv.className = "container mx-auto";
   newDiv.setAttribute("style", "height: 300px");

   var puzzle = document.createElement('div');
   puzzle.className = "mx-auto h-100";
   puzzle.setAttribute("style", "width: 300px");

   var title = document.createElement('p');
   title.innerHTML = "Puzzling";
   title.className = "h2 text-center";
   puzzle.appendChild(title);
   let count = 0;
   for (let i = 0; i < 4; i++) {
      var rowDiv = document.createElement('div');
      rowDiv.className = "row justify-content-center";

      for (let j = 0; j < 4; j++) {
         var colDiv = document.createElement('div');
         colDiv.className = "col-3 border text-center";
         colDiv.setAttribute("style", "height: 10vh");
         colDiv.addEventListener('click', tileClick);
         colDiv.id = count;
         rowDiv.appendChild(colDiv);
         count++;
      }
      puzzle.appendChild(rowDiv);
   }
   newDiv.appendChild(puzzle);
   app.appendChild(newDiv);
   createGrid()
}
loadPuzzle();