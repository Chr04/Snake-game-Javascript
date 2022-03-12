const body = document.querySelector("body");
const menuDiv = document.getElementById("menu");
const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const macasComidas = document.getElementById("macasComidas");
const dica = document.getElementById("dica");

let menu = true;
let alteraDificuldade = false;
let dificuldade = 80;

const velocidade = 1;
let velX = 0;
let velY = 0
let posXcobrinha = 10;
let posYcobrinha = 15;
let tamanhoPeca = 30;
let quantidadePeca = 20;

let rastro = [];
let cauda = 5;

let devoradas = 0;
let posXfruta = 15;
let posYfruta = 15;

const audioTheme = new Audio("./assets/theme.mp3");
const audioEating = new Audio("./assets/eating.mp3");

const colisaoBorda = () => {
    posXcobrinha += velX;
    posYcobrinha += velY;

    if (posXcobrinha < 0) {
        posXcobrinha = quantidadePeca - 1;
    }
    if (posXcobrinha > quantidadePeca - 1) {
        posXcobrinha = 0;
    }
    if (posYcobrinha < 0) {
        posYcobrinha = quantidadePeca - 1;
    }
    if (posYcobrinha > quantidadePeca - 1) {
        posYcobrinha = 0;
    }
}

const canvasEstilo = () => {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    macasComidas.textContent = `Maçãs comidas: ${devoradas}`
    dica.textContent = `Aperte "M" para voltar ao menu`
}

const macaConfigs = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(posXfruta * tamanhoPeca, posYfruta * tamanhoPeca, tamanhoPeca, tamanhoPeca)
}

const cobrinhaConfigs = () => {
    ctx.fillStyle = "yellow";
    for (let i = 0; i < rastro.length; i++) {
        ctx.fillRect(rastro[i].x * tamanhoPeca, rastro[i].y * tamanhoPeca,
            tamanhoPeca - 1, tamanhoPeca - 1);
        if (rastro[i].x == posXcobrinha && rastro[i].y == posYcobrinha) {
            velX = 0;
            velY = 0
            cauda = 5;
            macasComidas.textContent = `Maçãs comidas: ${devoradas = 0}`;
        }
    }
    rastro.push({ x: posXcobrinha, y: posYcobrinha });

    while (rastro.length > cauda) {
        rastro.shift();
    }
}

const comerMaca = () => {
    if (posXfruta == posXcobrinha && posYfruta == posYcobrinha) {
        cauda++;
        audioEating.play();
        posXfruta = Math.floor(Math.random() * quantidadePeca);
        posYfruta = Math.floor(Math.random() * quantidadePeca);
        macasComidas.textContent = `Maçãs comidas: ${devoradas++}`
    }
}

const game = () => {
    colisaoBorda();
    canvasEstilo();
    macaConfigs();
    cobrinhaConfigs();
    comerMaca();
    audioTheme.play();
}

const moverCobrinha = (evento) => {
    if (evento.key === "ArrowLeft") {
        velX = -velocidade;
        velY = 0;
    }
    if (evento.key === "ArrowUp") {
        velX = 0;
        velY = -velocidade;
    }
    if (evento.key === "ArrowRight") {
        velX = velocidade;
        velY = 0;
    }
    if (evento.key === "ArrowDown") {
        velX = 0;
        velY = velocidade;
    }
}

function btnPlay() {
    menu = false;
    if (menu === false) {
        canvas.style.display = "block";
        menuDiv.style.display = "none"
        body.style.backgroundColor = "#000";
        body.style.color = "#fff";
        setInterval(game, dificuldade);
        body.addEventListener("keydown", (event) => {
            if (event.key == "m") {
                document.location.reload();
            }
        })
    }
}

function btnDificuldade() {
    if (alteraDificuldade === false) {
        dificuldade = 80;
        alert(dificuldade == 80 ? `Velocidade ${dificuldade} - Médio!` : dificuldade);
        return alteraDificuldade = true;
    }
    if (alteraDificuldade === true) {
        dificuldade = 40;
        alert(dificuldade == 40 ? `Velocidade ${dificuldade} - Díficil!` : dificuldade)
    }
    alteraDificuldade = false;
}

function creditos() {
    alert("Snake game - desenvolvido por Christian");
}

document.addEventListener("keydown", moverCobrinha)

if (menu) {
    canvas.style.display = "none";
}

