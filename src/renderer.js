const strDate = document.getElementById("hoje")
const inputHora = document.getElementById("entrada")
const btnEnviar = document.getElementById("btnEnviar")
const btnDesfaz = document.getElementById("btnDesfaz")
const linhaRegistro = document.getElementById("linhaRegistro")
const msgErroInput = document.getElementById("msg_erro")

const elTempoTrabalho = document.getElementById("tempo_trabalho")
const elRegressiva = document.getElementById("regressiva")
const elTtempoHE = document.getElementById("tempo_he")

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

setInterval(() => {
    elTempoTrabalho.textContent = msToHHmmss((count))
    elRegressiva.textContent =  msToHHmmss(28800000 - count)
    elTtempoHE.textContent =  msToHHmmss(7200000)
    count += 1000
}, 1000);

// setInterval(() => {
//     console.log( temporizador())
// }, 3000);