let numCartas = prompt("Com quantas cartas gostaria de jogar? Escolha um número par de 4 a 14.")
while (numCartas%2 !== 0 || numCartas < 4 || numCartas > 14) {
    numCartas = prompt("Insira um número par entre 4 e 14!")
}

let tiposCartas = []
const carta1 = {tipo:1,source:"/Arquivos Úteis - Projeto 04 - Parrot Card Game/bobrossparrot.gif"}
const carta2 = {tipo:2,source:"/Arquivos Úteis - Projeto 04 - Parrot Card Game/explodyparrot.gif"}
const carta3 = {tipo:3,source:"/Arquivos Úteis - Projeto 04 - Parrot Card Game/fiestaparrot.gif"}
const carta4 = {tipo:4,source:"/Arquivos Úteis - Projeto 04 - Parrot Card Game/metalparrot.gif"}
const carta5 = {tipo:5,source:"/Arquivos Úteis - Projeto 04 - Parrot Card Game/revertitparrot.gif"}
const carta6 = {tipo:6,source:"/Arquivos Úteis - Projeto 04 - Parrot Card Game/tripletsparrot.gif"}
const carta7 = {tipo:7,source:"/Arquivos Úteis - Projeto 04 - Parrot Card Game/unicornparrot.gif"}

tiposCartas.push(carta1)
tiposCartas.push(carta2)
tiposCartas.push(carta3)
tiposCartas.push(carta4)
tiposCartas.push(carta5)
tiposCartas.push(carta6)
tiposCartas.push(carta7)

tiposCartas.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}

let tiposCartasUsadas = []
let contCartas = 0

while (contCartas < numCartas/2) {
    tiposCartasUsadas.push(tiposCartas[contCartas])
    contCartas += 1
}

contCartas = 0

baralho = []

while (contCartas < numCartas/2) {
    baralho.push(tiposCartasUsadas[contCartas])
    baralho.push(tiposCartasUsadas[contCartas])
    contCartas ++
}

baralho.sort(comparador);

let cont = 0
while (cont < numCartas) {
    let elemento = document.querySelector("ul")
    elemento.innerHTML += `
    <li class="container">
        <div class="card" onclick="flip(this)">
            <div class="front">
                <img src="/Arquivos Úteis - Projeto 04 - Parrot Card Game/front.png">
            </div>
            <div class="back">
                <img src="${baralho[cont].source}">
            </div>
        </div>
    </li>
    `
    cont += 1
}

let numJogadas = 0

// clique pode ser 0 ou 1 ou 2
let clique = 0
let cartasViradas = []
let cartasConcluidas = 0

// elemento é a div que estou clicando
function flip(elemento){

    let verificaSelecao = document.querySelector(".cartaVirada")
    let verificaConclusao = document.querySelector(".carta-concluida")
    
   
    if (clique === 0) {
        if (elemento===verificaConclusao) {
            alert("vc esta clicando numa carta concluida (0)!")
        }
        if (elemento===verificaSelecao) {
            alert("vc esta clicando numa carta virada (0)!")
        }
        else if (elemento!==verificaSelecao) {
            //alert("vc esta clicando pela primeira vez nessa carta!")
            elemento.classList.add(".cartaVirada")
            setTimeout(vira(elemento),2000)
           
            clique ++
            numJogadas ++
            cartasViradas.push(elemento)
            //console.log("numJogadas1:"+numJogadas)
            //console.log("Clique1:"+clique)
            //console.log("está passando pelo elo clique === 0")
        }        
    } 
    
    else if (clique===1) {
        if (elemento===verificaSelecao) {
            alert("vc esta clicando numa carta virada (1) !")
        }
        else if (elemento!==verificaSelecao) {
            elemento.classList.add(".cartaVirada")
            setTimeout(vira(elemento),2000)
         
            cartasViradas.push(elemento)
            //clique --
            console.log("Clique2:"+clique)
            numJogadas ++
            //console.log("numJogadas2:"+numJogadas)
            //console.log("cartasViradas:"+cartasViradas.length)

            if (cartasViradas[0].innerHTML !== cartasViradas[1].innerHTML) {
                setTimeout(desvira(cartasViradas[0]),2000)
                setTimeout(desvira(cartasViradas[1]),2000)
                //desvira(cartasViradas[0])
                //desvira(cartasViradas[1])
                elemento.classList.remove("cartaVirada") 
                cartasViradas[0].classList.remove("cartaVirada")
                cartasViradas = []
                //alert("Que pena, as cartas não são iguais!")
                //console.log(`cartasviradasdepoisdacomparação: ${cartasViradas.length}`)

            } 
            else if (cartasViradas[0].innerHTML === cartasViradas[1].innerHTML) {
                elemento.classList.add("carta-concluida")
                cartasViradas[0].classList.add("carta-concluida")
                //setTimeout(desvira(cartasViradas[0]),2000)
                //setTimeout(desvira(cartasViradas[1]),2000)
                //cartasViradas[0].innerHTML="Clear"
                //cartasViradas[1].innerHTML="Clear"
                cartasConcluidas += 2
                console.log("cartas concluidas:"+cartasConcluidas)
                console.log("num de cartas:"+numCartas)
                cartasViradas = []
                //console.log(cartasViradas)
                //alert("Boa, as cartas são iguais!")
                if (cartasConcluidas === numCartas) {
                    setTimeout(alert(`Parabéns, você concluiu o jogo em ${numJogadas}!`),5000)
                }
                
                
            }
        }
        else {
            alert("vc está clicando numa carta já virada!")
        }
    }

    
}

function desvira (elemento) {
    elemento.style.transform = "rotateY(0deg)";
}

function vira (elemento) {
    elemento.style.transform = "rotateY(180deg)";
}