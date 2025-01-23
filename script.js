//variaveis de manipulação
let seuVotoPara = document.querySelector('.d-1-1 span');

let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');
//variaveis de ambientes
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }

    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}
function atualizeInterface() {
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';

        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}"/>${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}"/>${candidato.fotos[i].legenda}</div>`;
            }

        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';

        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }

}
//funçoes
function clicou(n) {
    let elnumero = document.querySelector('.numero.pisca');
    let audio = document.querySelector('audio');

    setTimeout(() => {
    }, 200);
    if (elnumero !== null) {
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;

        elnumero.classList.remove('pisca');
        if (elnumero.nextElementSibling !== null) {
            elnumero.nextElementSibling.classList.add('pisca');
            audio.currentTime = 0;
            audio.play()
            setTimeout(() => {
                audio.pause();
            }, 100)

        } else {
            audio.currentTime = 0;
            audio.play()
            setTimeout(() => {
                audio.pause();
            }, 100)
            atualizeInterface();
        }
    }
}
function branco() {

    let audio = document.querySelector('audio');
    if (numero === '') {
        votoBranco = true;

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    }
    audio.currentTime = 0;
    audio.play()
    setTimeout(() => {
        audio.pause();
    }, 100)
}
function corrige() {
    let audio = document.querySelector('audio');

    audio.currentTime = 0;
    audio.play()
    setTimeout(() => {
        audio.pause();
    }, 100)

    comecarEtapa();
}
function confirma() {
    let audio = document.querySelector('audio');
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {

        let indexCandidato = etapa.candidatos.findIndex((item) => {
            if (item.numero === numero) {
                return item.nome;
            }
        });

        let nomeCandidato = '';

        if (indexCandidato != -1) {
            nomeCandidato = etapas[etapaAtual].candidatos[indexCandidato].nome;
        } else {
            nomeCandidato = 'NULO';
        }

        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero,
            candidato: nomeCandidato
        });
        votoConfirmado = true;
    }

    if (votoConfirmado) {
        audio.currentTime = 0;
        audio.play()
        setTimeout(() => {
            audio.pause();
        }, 100)

        etapaAtual++;

        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            console.log('FIM!');

            let telaNova = document.querySelector('.tela').cloneNode(true);
            let audio = document.querySelector('audio');
            setTimeout(() => {
                document.querySelector('.telaFim').style.display = 'none';
                comecarEtapa();
            }, 5000);

            etapaAtual = 0;
            numero = '';
            votoBranco = false;

            setTimeout(() => {
                audio.currentTime = 6;
                audio.play();
                alert('Aguarde 5 segundos para uma nova votação');
            }, 200);


            document.querySelector('.telaFim').innerHTML = '<div  class="aviso--gigante pisca">FIM</div>';
            document.querySelector('.telaFim').style.display = 'flex';



            console.log(votos);
        }
    }

}

comecarEtapa();