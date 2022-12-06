const strDate = document.getElementById("hoje")
const inputHora = document.getElementById("entrada")
const btnEnviar = document.getElementById("btnEnviar")
const btnDesfaz = document.getElementById("btnDesfaz")
const linhaRegistro = document.getElementById("linhaRegistro")
const msgErroInput = document.getElementById("msg_erro")

const elTempoTrabalho = document.getElementById("tempo_trabalho")
const elRegressiva = document.getElementById("regressiva")
const elTtempoHE = document.getElementById("tempo_he")

function name(params) {
    let configPonto = {
        "jornada":6,
        "intervalo" :30,
        "he_autorizada":false,
        "qtde_he" :null,
        "saldo_he" :null
    }
}


const JORNADA = 8 * 3600000
const MAX_HE = 2 * 3600000
let tempoEsgotado = false
let pausa = false

inputHora.value = getHoraCerta()
inputHora.setAttribute("max",getHoraCerta())
strDate.textContent = hoje.toLocaleDateString('pt-BR')

carregaPonto()
atualizaTbl()

inputHora.addEventListener('change',(ev)=>{
    let f = document.getElementsByTagName('form')[0];
    f.checkValidity()
    if(inputHora.validationMessage){
        inputHora.value = getHoraCerta()
        msgErroInput.hidden = false
        msgErroInput.textContent = "Não é permitido entrar com valor maior que o horario presente"
        setTimeout(() => {
            msgErroInput.hidden = true
            msgErroInput.textContent = ""
        }, 3000);   
    }
})

btnEnviar.addEventListener("click",(ev)=>{
    ev.preventDefault()
    //console.log(inputHora.value);
    RegistrarPonto(inputHora.value)
    atualizaTbl()
})

btnDesfaz.addEventListener("click",(ev)=>{
    ev.preventDefault()
    //console.log(inputHora.value);
    limpaUltimoRegistro()
    atualizaTbl()
})

function atualizaTbl() {
 
    linhaRegistro.querySelectorAll('td').forEach((el,k )=> {
        el.textContent= ponto.registros[k] ? ponto.registros[k]:"__:__"

        if(ponto.registros[k] ){
            // btnExc = document.createElement("button")
            // btnExc.textContent = "X"
            // btnExc.setAttribute("class","btnExcluir")
            // el.append(btnExc)
        }
    });
    //.item(1).textContent="99:99"
}

function getHoraCerta() {
    return new Date().toTimeString().substring(0,5)
}

setInterval(() => {
    inputHora.value = getHoraCerta()
    inputHora.setAttribute("max",getHoraCerta())

    // elTempoTrabalho.textContent = minToHHmm(879879)
    // elRegressiva.textContent =  minToHHmm(879879)
    // elTtempoHE.textContent =  minToHHmm(879879)

}, 60000);

let count  = 1000

const refleshTimers =  setInterval( atualizaTimers, 1000);

function atualizaTimers () {
    if(pausa) return
    if(count <= (JORNADA + MAX_HE)){
        if(count <= JORNADA ){
            elTempoTrabalho.textContent = msToHHmmss((count))
            elRegressiva.textContent =  msToHHmmss(JORNADA - count)
        }
        else {
            elTtempoHE.textContent =  msToHHmmss(count - JORNADA)
        }          
        count += 1000
    } else 
    {
        alert("TEMPO ESGOTADO")
        count = 0
        clearInterval(refleshTimers)
    }
}




// setInterval(() => {
//     console.log( temporizador())
// }, 3000);