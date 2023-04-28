document.getElementById("playBtn").addEventListener("click", initGame );
// let gameInit = false;

function initGame() {
    // if(gameInit == false) {
        console.log("Gioco avviato");

        //Creiamo la griglia (div.grid)
        const grid = createElement("div", "grid", "");
        
        //Creiamo n celle
        let numeroDiCelleTotali = document.getElementById("livelloDifficolta").value;
        let numeroDiCellePerLato = Math.ceil( Math.sqrt(numeroDiCelleTotali) );
        let dimensione = `calc(100% / ${numeroDiCellePerLato})`;

        //Generiamo le bombe
        let quantitaBombe = 16;
        let bombe = generaBombe(quantitaBombe, numeroDiCelleTotali);
        console.log("Bombe: ", bombe);

        //Inizializziamo in punteggio
        let punteggio = 0;
        writeToElement("risultato", `Punteggio: ${punteggio}`);

        //Gestore di gameover
        let gameover = false;

        //Aggiungiamo gli event listener per gestire il click
        for (let i = 0; i < numeroDiCelleTotali; i++) {
            let cella = createElement("div", "cell", i+1 );
            cella.style.width = dimensione;
            cella.style.height = dimensione;

            cella.addEventListener("click", function () {

                console.log("Cliccato", parseInt(this.innerText) );

                if(gameover==false){

                    //nel ciclo viene generato un eventListener per ogni cella, la cella "i"
                    let cellaCliccata = i+1;
                    //potevate anche usare:
                    // let cellaCliccata = parseInt(this.innerText);
    
                    //se contiene bomba
                    if( bombe.includes(cellaCliccata) ) {
                        this.classList.add("clicked-bomb");
                        writeToElement("risultato", `Partita terminata, hai perso. Punteggio: ${punteggio}`);
                        scopriBombe(bombe);
                        gameover = true;
                    } else {
                        this.classList.add("clicked");
                        punteggio++;
                        writeToElement("risultato", `Punteggio: ${punteggio}`);

                        if(punteggio == numeroDiCelleTotali - quantitaBombe) {
                            writeToElement("risultato", `Partita terminata, hai VINTO! Punteggio: ${punteggio}`);
                            gameover = true;
                        }
                    }
                } else {
                    console.error("La partita è terminata, smettila!");
                }

            });

            grid.appendChild( cella );
        }

        //Appendiamo la griglia al main
        const mainEl = document.querySelector("main");
        mainEl.innerHTML = "";
        mainEl.appendChild(grid);

        console.log("Griglia: ", grid);
        gameInit = true;
    // } else {
        // console.log("Gioco già inizializzato");
    // }
}

function createElement(tagHtml, classe, contenuto) {
    
    //Creiamo una cella
    const cell = document.createElement(tagHtml);
    cell.classList.add(classe);
    cell.innerText = contenuto;

    return cell;

}

function writeToElement(elementId, content) {
    document.getElementById(elementId).innerHTML = content;
}

function getRandomNumber(min, max) {
    min = parseInt(min);
    max = parseInt(max);
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function generaBombe(numeroDiBombe, numeroDiCelle) {

    console.log("Genero " + numeroDiBombe + " bombe per " + numeroDiCelle + " celle");

    let bombe = [];

    while (bombe.length < numeroDiBombe) {
        
        let nuovoNumero = getRandomNumber(1, numeroDiCelle);

        if( bombe.includes(nuovoNumero) == false ) {
            bombe.push(nuovoNumero);
        }

    }

    return bombe;
}

function scopriBombe(bombe) {
    
    let celle = document.getElementsByClassName("cell");
    console.log("Bombe", bombe);

    for (let i = 0; i < celle.length; i++) {
        const cella = celle[i];
        
        if(bombe.includes(i+1)) {
            cella.classList.add("clicked-bomb");
        } else {
            // cella.classList.add("clicked");
        }
    }

}