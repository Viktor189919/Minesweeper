// debugger; 

const gameFieldElement = document.getElementById("game-field");

const small = {
                "fieldSize": 4*4,
                "numberOfMines": 6 
               };
const medium = {
                "fieldSize": 5*5,
                "numberOfMines": 8 
                };
const large = {
                "fieldSize": 6*6,
                "numberOfMines": 10 
                };

const gameFieldSize = small.fieldSize;
const amountOfMines = small.numberOfMines;


let gameFieldList = []

generateGameField(gameFieldSize);

function generateGameField(fieldSize) {

    for (let i = 0; i < Math.sqrt(fieldSize); i++) {

        for (let j = 0; j < Math.sqrt(fieldSize); j++) {
            
            if (!gameFieldList[i]) {
                gameFieldList.push([]);
            }

            let squareObj = {
                        "class": "field-cell",
                        "gridRow": i,
                        "gridColumn": j,
                        "propGridRow": `${i+1} / ${i+2}`,
                        "propGridColumn": `${j+1} / ${j+2}`,
                        "mine": false,
                        "number": 0,
                        "id": `${i}/${j}`
                    }

            gameFieldList[i].push(squareObj)
        }
    }
    generateMines(amountOfMines)
}

function generateMines(minesAmount) {
    let minesCount = 0;
    
    while (minesCount < minesAmount) {
    
        const rowContent = Math.floor(Math.random() * Math.sqrt(gameFieldSize));
        const indexContent = Math.floor(Math.random() * Math.sqrt(gameFieldSize));
        
        if (gameFieldList[rowContent][indexContent].mine === true) {
            continue;
        } else {
            gameFieldList[rowContent][indexContent].mine = true;
            minesCount++;
        }
    }
    generateNumbers()

}



function generateNumbers() {

    let adjacentSquare = [[-1, -1], [-1, 0], [-1, 1],
                          [0, -1],           [0, 1],
                          [1, -1], [1, 0],  [1, 1]]

    const numRows = gameFieldList.length;
    const numCols = gameFieldList[0].length;

    for (let row of gameFieldList) {
        for (let obj of row) {
            if (obj.mine === false) {
                adjacentSquare.forEach(([dr, dc]) => {
                    const adjRow = dr + obj.gridRow;
                    const adjCol = dc + obj.gridColumn;
                    if (adjRow >= 0 && adjRow < numRows && adjCol >= 0 && adjCol < numCols && gameFieldList[adjRow][adjCol].mine === true) {
                        obj.number++;
                    }
                }) 
            }
        }
    }
    renderGameField();
}

function mineCounter() {
    let minesOnField = 0;
    for (let row of gameFieldList) {
        for (let obj of row) {
            if (obj.mine === true) {
                minesOnField++;
            }
        }
    }
    return minesOnField;
}

// renderGameField();

function renderGameField() {
    for (let row of gameFieldList) {
        for (let obj of row) {

            const gameSquare = document.createElement("div");
            
            gameSquare.setAttribute("class", "field-cell field-cell-covered");
            gameSquare.style.gridColumn = obj.propGridColumn;
            gameSquare.style.gridRow = obj.propGridRow;

            gameFieldElement.appendChild(gameSquare);

            let squareContent;

            if (obj.mine === true) {
                squareContent = document.createElement("img");
                squareContent.src = "img/bomb-explosion-svgrepo-com.svg";
                squareContent.setAttribute("id", obj.id)
            } else {
                squareContent = document.createElement("div")
                squareContent.innerText = obj.number;
                squareContent.setAttribute("id", obj.id)
            }

            if (obj.number != 0 || obj.mine === true) {
                gameSquare.appendChild(squareContent); 
            }
            addListener(gameSquare);
        }
    }
}  


function addListener(element) {
    element.addEventListener("click", removeClass)
}

function removeClass(element) {
    element.target.classList.remove("field-cell-covered")
}





