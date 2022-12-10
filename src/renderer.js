const strDate = document.getElementById("hoje")
const inputHora = document.getElementById("entrada")
const btnEnviar = document.getElementById("btnEnviar")
const btnDesfaz = document.getElementById("btnDesfaz")
const btnConfig = document.getElementById("btnConfig")
const btnSalvarConfig = document.getElementById("salvar_config")
const linhaRegistro = document.getElementById("linhaRegistro")
const msgErroInput = document.getElementById("msg_erro")
const divControles = document.getElementById("controles")
const divContainer = document.getElementById("container")

const elTempoTrabalho = document.getElementById("tempo_trabalho")
const elRegressiva = document.getElementById("regressiva")
const elTtempoHE = document.getElementById("tempo_he")


//.then((config)=>{
ocultarFormConfig() 
// console.log(configPonto);
// console.log(configPonto.default);

if(configPonto.default){
    exibirFormConfig()
}


const JORNADA = configPonto.jornada * 3600000
const MAX_HE = configPonto.he_autorizada ? configPonto.qtde_he * 3600000 : 0

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
btnConfig.addEventListener('click',(ev)=>{
    ev.preventDefault()
    if(divControles.hidden ){
        exibirFormConfig()
    }
    else ocultarFormConfig()
})

btnEnviar.addEventListener("click",(ev)=>{
    ev.preventDefault()
    //console.log(inputHora.value);
    RegistrarPonto(inputHora.value)
    atualizaTbl()
})

btnDesfaz.addEventListener("click",(ev)=>{
    ev.preventDefault()
    limpaUltimoRegistro()
    atualizaTbl()
})

document.getElementById('he_auto').addEventListener('change',(ev)=>{
    document.querySelector('input[name="qtde_he"]').checked = ev.target.checked
})

btnSalvarConfig.addEventListener('click',(ev)=>{
    ev.preventDefault()
    let he_auto = document.getElementById('he_auto').checked
    let obj = {
        "jornada": document.querySelector('input[name="jornada"]:checked').value,
        "intervalo" : document.querySelector('input[name="intervalo"]:checked').value,
        "he_autorizada": he_auto,
        "qtde_he" : he_auto ? document.querySelector('input[name="qtde_he"]:checked').value : null,
        "saldo_he" :he_auto ? document.querySelector('input[name="saldo_he"]').value : null,
        "default" : false
    }
    reconfigurarPonto(obj)
    ocultarFormConfig()
})

function exibirFormConfig() {
    divControles.hidden = false
    divContainer.hidden = true
}
function ocultarFormConfig() {
    divControles.hidden = true
    divContainer.hidden = false
}

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