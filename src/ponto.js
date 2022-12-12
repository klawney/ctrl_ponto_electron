
const hoje = new Date()
let configPonto = {
        "jornada":6,
        "intervalo" :.5,
        "he_autorizada":false,
        "qtde_he" :null,
        "saldo_he" :null,
        "default" : false
    }

function reconfigurarPonto(configPonto) {
    localStorage.setItem("configPonto", JSON.stringify(configPonto))
    leConfigPonto()
}
function resetconfigPonto() {
    configPonto = {
        "jornada":6,
        "intervalo" :0,
        "he_autorizada":false,
        "qtde_he" :null,
        "saldo_he" :null,
        "default" : false
        }
}
function leConfigPonto() {
    let strConfigPonto = localStorage.getItem("configPonto")
    // console.log(strConfigPonto,"<<--");
    // if (!strConfigPonto) {
    //     //localStorage.clear("configPonto")
    //     resetconfigPonto()
    // }
    configPonto = JSON.parse(strConfigPonto)
}

let ponto = {
    "data": null,
    "registros": [],
    "registrosTime": [],
    // "entradaManha":null,
    // "saidaManha":null,
    // "entradaTarde":null,
    // "saidaTarde":null,
    "jornada": null,
    "HEAutorizada": false,
    "TempoHE": 0,
}

function minToHHmm(min) {
    let minRest = min % 60
    let hor = Math.floor((min - minRest) / 60).toString()
    return `${hor.padStart(2, '0')}:${minRest.toString().padStart(2, '0')}`
}

function msToHHmmss(ms) {
    let tempSegs = ms / 1000
    let segRest = tempSegs % 3600 % 60
    let minRest = (tempSegs - segRest) / 60 % 60
    let hor = Math.floor( (tempSegs - minRest) / 3600).toString()
    return `${hor.padStart(2,'0')}:${minRest.toString().padStart(2,'0')}:${segRest.toString().padStart(2,'0')}`
    //return `${hor.padStart(2,'0')}:${minRest.padStart(2,'0'):${segRest.padStart(2,'0')}`
}

function resetPonto() {
    ponto = {
        "data": hoje.toLocaleDateString(),
        "registros": [],
        "registrosTime": [],
        // "entradaManha":null,
        // "saidaManha":null,
        // "entradaTarde":null,
        // "saidaTarde":null,
        "jornada": null,
        "HEAutorizada": false,
        "TempoHE": 0,
    }
    return ponto
}
//export default {ponto}

function RegistrarPonto(horas) {
    if (ponto.registros.length <= 4 && !ponto.registros.includes(horas)) {
        ponto.registros.push(horas)
        ponto.registros = ponto.registros.sort()
        persistePonto(ponto)
    }
    // ponto.registros.forEach((r)=>{
    //     console.log(r);
    // })
}

function limpaUltimoRegistro() {
    ponto.registros.pop()
    persistePonto(ponto)
}

function removeRegistro(horas) {
    if (!ponto.registros.includes(horas)) {
        // ponto.registros.filter((rg)=>rg<>horas)
    }
    //persistePonto(ponto)
}

function carregaPonto() {
    strgPonto = localStorage.getItem("ponto")
    if (!strgPonto) {
        localStorage.removeItem("ponto")
        resetPonto()
        return
    }
    ponto = JSON.parse(strgPonto)

    if (!ponto.data) {
        ponto.data = hoje.toLocaleDateString()
    }
    if (ponto.data != hoje.toLocaleDateString()) {
        resetPonto()
    }
}

function persistePonto(ponto) {
    ponto.registrosTime = ponto.registros.map((re) => {
        return new Date(`${hoje.toDateString()} ${re}`).getTime();
    })
    localStorage.setItem("ponto", JSON.stringify(ponto))
    console.log(ponto.registros);
}

function temporizador() {
    rt = ponto.registrosTime
    return {
        "total": ((rt[1] - rt[0]) + (rt[3] - rt[2])) / 600000
    }
    console.log("temporizador");
}

function Notifica() {
    const NOTIFICATION_TITLE = 'Hora do Ponto'
    const NOTIFICATION_BODY = 'Registre seu ponto Agora'
    const CLICK_MESSAGE = 'Notification clicked!'
    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
}

leConfigPonto()