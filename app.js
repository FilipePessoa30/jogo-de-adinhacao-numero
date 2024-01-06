// Tipo de Função	Exemplo de Código	Uso
// Sem retorno e sem parâmetro	function saudacao() { ... }	Execução de bloco de código simples.
// Sem retorno e com parâmetro	function cumprimentar(nome) { ... }	Execução de bloco de código com argumentos.
// Com retorno e sem parâmetro	function gerarNumeroAleatorio() { ... }	Cálculo e retorno de um valor específico.
// Com retorno e com parâmetro	function somar(a, b) { ... }	Cálculo e retorno baseado em argumentos.
// Função anônima	let saudacao = function() { ... };	Definição de função sem nome localmente.
// Arrow function	let quadrado = x => x * x;	Definição concisa de funções curtas.


// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];

let numeroLimite = 10;

let numeroSecreto = gerarNumeroAleatório();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');

    exibirTextoNaTela('p','Escolha um número entre 1 e '+ numeroLimite);  
    
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Você acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor ' + chute);
        }
        else{
            exibirTextoNaTela('p', 'O número secreto é maior '+ chute);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatório () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

if(quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
}

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatório();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatório();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}