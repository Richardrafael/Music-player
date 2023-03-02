const Songname = document.getElementById("name");
const artname = document.getElementById("art");
const img = document.getElementById("img")
const song = document.getElementById("Audio");
const next = document.getElementById("next")
const ant = document.getElementById("volta")
const barra = document.getElementById("atual")
const container_barra = document.getElementById("container_barra")
const embaralha  = document.getElementById("embaralha")


song.addEventListener("loadedmetadata", updatetotal)


// const totaltime = document.getElementById("total-time")

function updatetotal() {
    const totaltime = document.getElementById("total-time")
    totaltime.innerText = minutos(song.duration)
    
}


function minutos(x) {
    let horas = Math.floor(x / 3600)
    let minutos =  Math.floor((x - horas * 3600)/60)
    let segundos = Math.floor(x - horas * 3600 - minutos*60)

    if ( horas == 0){
        return `${minutos.toString().padStart(2,"0")} : ${segundos.toString().padStart(2,"0")}`
    }else{
        return `${horas.toString().padStart(2,"0")} : ${minutos.toString().padStart(2,"0")} : ${segundos.toString().padStart(2,"0")}`

    }

}

song.addEventListener("ended",nextreap)

function nextreap() {
    if (now === false) {
        mudarup()
        
    }else{
        comeca()
        // pauseson()
    }
}

let now  = false 
function denovo() {

    if (now === false) {
        const repete = document.getElementById("repete")
        repete.querySelector('.bi').classList.remove('bi-repeat')
        repete.querySelector('.bi').classList.add('bi-repeat-1')
        repete.style.color = "#19d99d"
        now = true 
    }else{
        const repete = document.getElementById("repete")
        repete.querySelector('.bi').classList.remove('bi-repeat-1')
        repete.querySelector('.bi').classList.add('bi-repeat')
        repete.style.color = "white"
        now = false
    }
   


    
}

// embaralha

embaralha.addEventListener("click", embaralhar)

let isemba = false

function embaralhar() {
    if (isemba === false) {
        // console.log("eu")
        em(embaralhaplaylist)
        // console.log(em(embaralhaplaylist));
        embaralha.style.color = "#19d99d"
        isemba = true
    }else{
        embaralha.style.color = "white"
        embaralhaplaylist =  [...playlist]
        isemba = false
    }
    
}

function em(x) {
    for (let i = x.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [x[i], x[j]] = [x[j], x[i]];
}
// return x
}


container_barra.addEventListener("click", pula)
function pula(event) {
    console.log("passei");
    const tamanho = container_barra.clientWidth
    const posisao = event.offsetX
    const pulatempo =(posisao/tamanho)*song.duration
    song.currentTime = pulatempo
}

// Barra de processo 
song.addEventListener("timeupdate",update)
function update() {
    const bar = (song.currentTime/song.duration)*100
    barra.style.setProperty("--barratual",`${bar}%`)
    const songtime = document.getElementById("song-time")
    songtime.innerText = minutos(song.currentTime)
}

// Dados da musicas

const trap = {
    id : 1,
    Songname : "Trap the Fato",
    artname : "Derek",
    img : "https://i.scdn.co/image/ab67616d0000b273ecd3c4a6471f81b9e1a9df98",
    file : "TRAPTHEFATONÓISFEZEM5",
    gosto : false,
}
const kyan = {
    id : 2,
    Songname : "Deus me Abençoe",
    artname : "Kyan",
    img : "https://i.scdn.co/image/ab67616d00001e0227e62feab1d8a790142c98af",
    file : "Kyan - DEUS ME ABENÇOE ft. Marcelle Boladão",
    gosto: true,
}
const major = {
    id : 3,
    Songname : "Bonde da Rock",
    artname : "Major RD",
    img : "https://i.scdn.co/image/ab67616d0000b2735e870cb19910347240acbb08",
    file : "Major RD - Bonde da Rock (prod. Mello)",
    gosto : true,
}

// Array das musicas

const playlist = JSON.parse(localStorage.getItem('playlist')) ?? [trap,kyan,major]
let embaralhaplaylist = [...playlist]



// Parar mudar musica
let index = 0



// Para mudar os dados das musicas 

function inicson() {
    img.src = `${embaralhaplaylist[index].img}`
    song.src = `music/${embaralhaplaylist[index].file}.mp3`
    artname.innerText =`${embaralhaplaylist[index].artname}`
    Songname.innerText =`${embaralhaplaylist[index].Songname}`
    // coroo = playlist[index].coroo
    // console.log(likeup)

}
inicson()

ant.addEventListener("click",mudardown)

function mudardown() {
    const like = document.getElementById("coracao")
    // like.addEventListener("click",conferelike)
    if (index == 0 ) {
        index = embaralhaplaylist.length -1
    }else{
        index -= 1 
    }

    if ( embaralhaplaylist[index].gosto === true) {
        console.log("tudo certo")
    like.querySelector('.bi').classList.remove('bi-heart')
    like.querySelector('.bi').classList.add('bi-heart-fill')
    }else{
    like.querySelector('.bi').classList.add('bi-heart')
    like.querySelector('.bi').classList.remove('bi-heart-fill')
    }
    arasta()
    inicson()
    comeca()
    pause.addEventListener("click",pauseson);
    play.addEventListener("click",comeca);
    
}
// mudarup()

next.addEventListener("click",mudarup)
function mudarup() {
    const like = document.getElementById("coracao")

    if (index === embaralhaplaylist.length -1 ) {
        index = 0
    }else{
        index += 1 
    }
    
    arasta()
    inicson()
    comeca()
    pause.addEventListener("click",pauseson);
    play.addEventListener("click",comeca);
    
}
// Pra começar ou pausar as musicas
 
function comeca(){
    const play = document.getElementById("play");
    const pause = document.getElementById("pause")
    song.play();
    play.style.display="none";
    pause.style.display="inline";
   
} 
play.addEventListener("click",comeca);

function pauseson(){
    const play = document.getElementById("play");
    const pause = document.getElementById("pause")
    song.pause();
    pause.style.display="none";
    play.style.display="inline";
} 
pause.addEventListener("click",pauseson);

// Conferir like


const coracao = document.getElementById("coracao")
coracao.addEventListener("click",conferelike)
let islike  = false 
function conferelike() {
    console.log("passei")
    if (islike === false) {
        coracao.querySelector('.bi').classList.add('bi-heart')
        coracao.querySelector('.bi').classList.remove('bi-heart-fill')  
        embaralhaplaylist[index].gosto = false
        islike = true     
    }else{
        coracao.querySelector('.bi').classList.remove('bi-heart')
        coracao.querySelector('.bi').classList.add('bi-heart-fill') 
        embaralhaplaylist[index].gosto = true
        islike = false
    }
    arasta()
    localStorage.setItem('playlist', JSON.stringify(playlist))
}

function arasta() {
    const like = document.getElementById("coracao")
    if ( embaralhaplaylist[index].gosto === true) {
        console.log("tudo certo")
    like.querySelector('.bi').classList.remove('bi-heart')
    like.querySelector('.bi').classList.add('bi-heart-fill')
    embaralhaplaylist[index].gosto = true
    }else{
    like.querySelector('.bi').classList.add('bi-heart')
    like.querySelector('.bi').classList.remove('bi-heart-fill')
    embaralhaplaylist[index].gosto = false
    }
}





// play.addEventListener("click",pauseson);

 
