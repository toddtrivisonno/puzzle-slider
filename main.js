var img = "img/seth_addy_swing_300.jpeg";

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


      this.render = function () {
         // update the ui
         this.content = document.getElementById(this.startEndPos);
         //this.content.innerHTML = this.currentPos;


         /* Add Image to Game Board */

         // let imgPlace = document.createElement('div');
         // imgPlace.className = "container mx-auto";
         // imgPlace.id = "imgPlace";
         // imgPlace.setAttribute("style", "height: 300px");
         // colDiv.appendChild(imgPlace);



         let imgDiv = document.createElement('img');
         imgDiv.setAttribute("src", img);
         imgDiv.setAttribute("id", this.startEndPos);
         if(this.currentPos == 0){
            imgDiv.setAttribute("style", "opacity:0;");
         } else {
            // TODO: do math for the setting of the negative margins
            //
            let marginLeft = (this.currentPos % 4) * -70 + "px";
            let marginTop = (parseInt(this.currentPos / 4)) * -70 + "px";
            imgDiv.setAttribute("style", "margin-left:" + marginLeft + "; margin-top:" + marginTop + ";");
         }
         // console.log("before",this.content)
         this.content.innerHTML = "";
         // console.log("after delete",this.content)
         this.content.appendChild(imgDiv);
         // console.log("after new append",this.content)

      }
   }
}



function shuffle() {
   for (let i = 0; i < 500; i++) {
      document.getElementById(Math.floor(Math.random() * 16)).click();        // Randomly clicks thru ids
      $('#alert').hide();
   }
}

function tileClick(e) {
   /* find the zero tile in JS and on Board */
   let positionOfBlankTile = 0;
   var positionOfCurrentTile = parseInt(e.target.id);

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

      /* If /\ Render Images on the Tile */
      clickedTile.render();
      zeroTile.render();

      /* if /\    make changes to html / render the new 2 tiles */
      // document.getElementById(positionOfBlankTile).innerHTML = zeroTile.currentPos;
      // document.getElementById(e.target.id).innerHTML = clickedTile.currentPos;

   }
   /* else /\  dont make any changes */

   /* Check Win */
   let checkPositions = 0
   for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].currentPos == tiles[i].startEndPos) {
         checkPositions++;
         if (checkPositions == 16) {
            $('#alert').show();
            document.getElementById('alert').innerHTML = "Huzzah!";
            // alert('Winner chicken dinner');
   console.log(tiles);
            
         }
      }
   }
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
   );
   blankTile.render();
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
      movingTile.render();
      tiles.push(movingTile);
   }
   console.log(tiles);
}

// Create Puzzle UI
function loadPuzzle() {

   var newDiv = document.createElement('div');
   newDiv.className = "container mx-auto";
   // newDiv.setAttribute("style", "height: 300px");

   var puzzle = document.createElement('div');
   puzzle.className = "mx-auto";
   puzzle.setAttribute("style", "width: 250px");

   var title = document.createElement('p');
   title.innerHTML = "Puzzling";
   title.className = "h2 text-center";
   puzzle.appendChild(title);

   var alertEnd = document.createElement('div');
   alertEnd.className = "alert alert-success alert-dismissible m-2";
   alertEnd.id = "alert";
   app.appendChild(alertEnd);
   $('#alert').hide();

   let count = 0;
   for (let i = 0; i < 4; i++) {
      var rowDiv = document.createElement('div');
      rowDiv.className = "row justify-content-center";

      for (let j = 0; j < 4; j++) {
         var colDiv = document.createElement('div');
         colDiv.className = "col-3 border text-center p-0";
         colDiv.setAttribute("id", count);
         colDiv.setAttribute("style", "max-height: 70px; overflow:hidden;");
         colDiv.addEventListener('click', tileClick);
         rowDiv.appendChild(colDiv);
         count++;
      }
      puzzle.appendChild(rowDiv);
   }
   newDiv.appendChild(puzzle);
   app.appendChild(newDiv);

   createGrid()

   var shuffleBtn = document.createElement('div');
   shuffleBtn.className = "container btn btn-info btn-lg mx-auto m-3";
   shuffleBtn.innerHTML = "Shuffle";
   shuffleBtn.addEventListener('click', shuffle);
   puzzle.appendChild(shuffleBtn);
}
loadPuzzle();