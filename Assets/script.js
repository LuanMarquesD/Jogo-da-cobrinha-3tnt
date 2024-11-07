const quadrado = document.getElementById('quadrado');
let contadorPontos = 0; // Contador de pontos
let pontosArray = []; // Array para armazenar os pontos criados
let cobrinhaArray = []; // Array para armazenar os segmentos da cobrinha

function creatPoint() {
    const pontos = document.createElement('div');
    pontos.style.width = '5px';
    pontos.style.height = '5px';
    pontos.style.backgroundColor = 'red';
    pontos.style.position = 'absolute';

    const maxX = quadrado.clientWidth - 5;
    const maxY = quadrado.clientHeight - 5;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    pontos.style.left = `${x}px`;
    pontos.style.top = `${y}px`;

    pontos.classList.add('ponto');
    quadrado.appendChild(pontos);

    pontosArray.push(pontos); // Adiciona o ponto ao array
}

let intervalo;

function ajustarIntervalo(newInterval) {
    clearInterval(intervalo);
    intervalo = setInterval(creatPoint, newInterval);
}

let posX = 200;
let posY = 200;
let podeMover = true;

function moverCobrinha(eventos) {
    if (!podeMover) return;
    const cobrinha = document.getElementById('cobrinha');
    
    // Guardar a posição anterior da cabeça
    const prevPosX = posX;
    const prevPosY = posY;

    switch (eventos.key) {
        case 'ArrowUp':
            posY -= 5;
            break;
        case 'ArrowDown':
            posY += 5;
            break;
        case 'ArrowLeft':
            posX -= 5;
            break;
        case 'ArrowRight':
            posX += 5;
            break;
    }

    // Limitar a posição da cobrinha dentro do quadrado
    posX = Math.max(0, Math.min(posX, quadrado.clientWidth - 20)); // 20 é a largura da cobrinha
    posY = Math.max(0, Math.min(posY, quadrado.clientHeight - 20)); // 20 é a altura da cobrinha

    cobrinha.style.top = `${posY}px`;
    cobrinha.style.left = `${posX}px`;

    // Mover os segmentos da cobrinha
    moverSegmentos(prevPosX, prevPosY);

    // Verificar colisão
    verificarColisao(cobrinha);

    podeMover = false;
    setTimeout(() => {
        podeMover = true;
    }, 250);
}

// Função para mover os segmentos da cobrinha
function moverSegmentos(prevPosX, prevPosY) {
    let currentPosX = prevPosX;
    let currentPosY = prevPosY;

    cobrinhaArray.forEach(segmento => {
        const tempX = segmento.style.left;
        const tempY = segmento.style.top;

        segmento.style.left = `${currentPosX}px`;
        segmento.style.top = `${currentPosY}px`;

        currentPosX = parseInt(tempX);
        currentPosY = parseInt(tempY);
    });
}

function verificarColisao(cobrinha) {
    const cobrinhaRect = cobrinha.getBoundingClientRect();

    pontosArray.forEach((ponto, index) => {
        const pontoRect = ponto.getBoundingClientRect();

        // Verifica se a cobrinha colidiu com o ponto
        if (
            cobrinhaRect.x < pontoRect.x + pontoRect.width &&
            cobrinhaRect.x + cobrinhaRect.width > pontoRect.x &&
            cobrinhaRect.y < pontoRect.y + pontoRect.height &&
            cobrinhaRect.y + cobrinhaRect.height > pontoRect.y
        ) {
            // Remover o ponto do DOM
            ponto.remove();
            pontosArray.splice(index, 1); // Remove o ponto do array
            contadorPontos++; // Incrementa o contador
            console.log(`Pontos coletados: ${contadorPontos}`); 

            // Fazer a cobrinha crescer
            adicionarSegmento();
        }
    });
}

// Função para adicionar um novo segmento à cobrinha
function adicionarSegmento() {
    const novoSegmento = document.createElement('div');
    novoSegmento.style.width = '20px';
    novoSegmento.style.height = '20px';
    novoSegmento.style.backgroundColor = 'green';
    novoSegmento.style.position = 'absolute';

    // Colocar o novo segmento na posição inicial (seguindo a última parte da cobrinha)
    if (cobrinhaArray.length > 0) {
        const ultimoSegmento = cobrinhaArray[cobrinhaArray.length - 1];
        novoSegmento.style.left = ultimoSegmento.style.left;
        novoSegmento.style.top = ultimoSegmento.style.top;
    } else {
        const cobrinha = document.getElementById('cobrinha');
        novoSegmento.style.left = cobrinha.style.left;
        novoSegmento.style.top = cobrinha.style.top;
    }

    quadrado.appendChild(novoSegmento);
    cobrinhaArray.push(novoSegmento);
}

window.addEventListener('keydown', moverCobrinha);

document.addEventListener('DOMContentLoaded', function() {
    const recebeu = document.getElementById('recebeu');
    const button = document.getElementById('playGame');
    const pauseGame = document.getElementById('pauseGame');
    
    button.addEventListener('click', function() {
        recebeu.textContent = "O jogo começou!";
        ajustarIntervalo(1000);
        const Colect = document.getElementById('Colect');
        Colect.style.display = 'block'; 
    });
    
    pauseGame.addEventListener('click', function() {
        clearInterval(intervalo);
        alert("O jogo está pausado!");
    });
});




                            
