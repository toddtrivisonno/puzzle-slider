

let puzzleTiles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
let count = 0;

// Place dynamically created tiles into container
function placeTiles() {
   for (let i = 0; i < tiles.length; i++) {
      let getTag = document.getElementById(i);
      let getCont = tiles[i].content;
      // console.log({ getTag, getCont });
      getTag.appendChild(getCont);
   }
}

function createHTML() {
   let tag = document.createElement('div');
   tag.className = "div";
   return tag;
}

function tileClick() {
   /* Finding the Tile with Current Position = 0 */
   let zeroTile = 0;
   for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].currentPos == 0) {
         zeroTile = i;
         break;
      }
   }

   /* Check if click is a valid move */

   console.log({ "34 tiles_i": tiles[this.id].currentPos, "34 zero_i":tiles[zeroTile].currentPos });
   if (tiles[this.id].currentPos == tiles[zeroTile].currentPos + 1 ||
      tiles[this.id].currentPos == tiles[zeroTile].currentPos - 1 ||
      tiles[this.id].currentPos == tiles[zeroTile].currentPos + 4 ||
      tiles[this.id].currentPos == tiles[zeroTile].currentPos - 4) {

      /* Replacing the location of two tiles */
      let temp = tiles[this.id].currentPos;                     // Store tile clicked into temporary variable
      tiles[this.id].currentPos = tiles[zeroTile].currentPos;   // Set tile clicked's current position to Tile Zero's current position
      tiles[zeroTile].currentPos = temp;                        // Set Zero's current position to stored tiles current position

      console.log({ "45 tiles_i": tiles[this.id].currentPos, "45 zero_i":tiles[zeroTile].currentPos });


      // let type = tiles[this.id].type;
      // tiles[this.id].type = tiles[0].type;
      // tiles[0].type = type;


      /* Updating Inner HTML */
      document.getElementById(zeroTile).innerHTML = temp;              // Display 
      document.getElementById(this.id).innerHTML = tiles[this.id].currentPos;

   }
   console.log(tiles);
}

// Tile Constructor
function Tile(startEndPos, currentPos, x, y, type) {
   this.startEndPos = startEndPos;
   this.currentPos = currentPos;
   this.x = x;
   this.y = y;
   this.type = type;
   this.content = createHTML();
   this.content.innerHTML = startEndPos;
}

loadPuzzle();

// Tile making factory
var tiles = [];
let xCnt = 1;
let yCnt = 0;

// Create and push blank tile into array
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
placeTiles();


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

   for (let i = 0; i < 4; i++) {
      var rowDiv = document.createElement('div');
      rowDiv.className = "row justify-content-center";

      for (let j = 0; j < 4; j++) {
         var colDiv = document.createElement('div');
         colDiv.className = "col-3 border text-center";
         colDiv.setAttribute("style", "height: 10vh");
         colDiv.id = puzzleTiles[count];
         // let labels = document.createTextNode(puzzleTiles[count]);
         count++;
         colDiv.addEventListener('click', tileClick);
         // colDiv.appendChild(labels);
         rowDiv.appendChild(colDiv);
      }
      puzzle.appendChild(rowDiv);
   }
   newDiv.appendChild(puzzle);
   app.appendChild(newDiv);
}
