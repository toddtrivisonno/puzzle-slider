document.body.onload = loadPuzzle;

let puzzleTiles = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]

let count = 0;



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
         colDiv.className = "col-3 border btn-info text-center";
         colDiv.setAttribute("style", "height: 10vh");
         colDiv.id = puzzleTiles[count];
         let labels = document.createTextNode(puzzleTiles[count]);
         count++;
         // colDiv.addEventListener('click', btnPress);
         colDiv.appendChild(labels);
         rowDiv.appendChild(colDiv);
      }
      puzzle.appendChild(rowDiv);
   }
   newDiv.appendChild(puzzle);
   app.appendChild(newDiv);
}
