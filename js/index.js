const pokemons = document.querySelector('div .pokemons');
const botaoCarregar = document.querySelector('.btn--more')
const input = document.querySelector('.search__input')
const botaoPesquisa = document.querySelector('.search__button')
const modal = document.querySelector('.modal__overlay')
const nomeModal = document.querySelector('.modal__name')
const imagemModal = document.querySelector('.modal__image')
const categoriasModal = document.querySelector('.modal__categories')
const btnfecharModal = document.querySelector('.modal__close')
const modalWeight = document.querySelector('.modal__value__weight')
const modalHeight = document.querySelector('.modal__value__height')
const btnAgua = document.querySelector('.btn--water')
const btnFogo = document.querySelector('.btn--fire')
const btnTudo = document.querySelector('.btn--all')
const lightDark = document.querySelector('.switch__label')
const root = document.querySelector(':root')


const apiPadrao = 'https://pokeapi.co/api/v2/pokemon?limit20&offset=';
const apiCarregar = 'https://pokeapi.co/api/v2/pokemon?limit'
const apiBusca = "https://pokeapi.co/api/v2/pokemon/"
let offset = 0
async function elementos(valor) {
    const pokemon = document.createElement('div');
    pokemons.appendChild(pokemon)
    pokemon.className = `pokemon ${valor.types[0].type.name}`
    const idPokemon = document.createElement('h3')
    pokemon.appendChild(idPokemon)
    idPokemon.className = 'pokemon__code'
    idPokemon.innerHTML = valor.id
    idPokemon.className = `pokemon__code ${valor.types[0].type.name}`
    const imagemPokemon = document.createElement('img')
    pokemon.appendChild(imagemPokemon)
    imagemPokemon.className = "pokemon__image"
    imagemPokemon.src = valor.sprites.other.dream_world.front_default
    imagemPokemon.alt = valor.name
    const tituloPokemon = document.createElement('h1')
    pokemon.appendChild(tituloPokemon)
    tituloPokemon.className = `pokemon__name ${valor.types[0].type.name}`
    tituloPokemon.innerHTML = valor.name
    pokemon.addEventListener('click', () => {
        abrirModal()
        modalInfo(valor)
    })
}
async function listagem(valor) {
    for (let item = 0; item < valor.length; item++) {
        const element = valor[item];
        try {
            const responseURL = await fetch(element)
            const dataUrl = await responseURL.json()
            elementos(dataUrl)

        } catch (error) {
            console.log(error)
        }
    }
}
async function apiPadraoRetorno() {
    remocaoClasse(btnTudo, btnAgua, btnFogo)
    try {
        const response = await fetch(apiPadrao)
        const data = await response.json()
        let url = []
        pokemons.innerHTML = ''
        data.results.map(item => { url.push(item.url) })
        listagem(url)
    } catch (error) {
        console.log(error)
    }
}

async function carregarMais() {
    offset += 20
    try {
        const response = await fetch(`${apiCarregar}&offset=${offset}`)
        const data = await response.json()
        let url = []
        pokemons.innerHTML = ''
        data.results.map(item => { url.push(item.url) })
        listagem(url)
    } catch (error) {
        console.log(error)
    }

}
botaoCarregar.addEventListener('click', carregarMais)

async function busca() {
    const buscar = input.value.trim()
    if (buscar != '') {
        try {
            const response = await fetch(`${apiBusca}${buscar}`)
            const data = await response.json()
            pokemons.innerHTML = ''
            elementos(data)
        } catch (error) {
            console.log(error)
        }
    } else {
        await apiPadraoRetorno()
    }
}
input.addEventListener('change', busca)
botaoPesquisa.addEventListener('click', busca)

async function modalInfo(valor) {
    categoriasModal.innerHTML = ''
    valor.types.forEach(element => {
        const btn = document.createElement('button')
        btn.className = 'btn btn--category'
        categoriasModal.appendChild(btn)
        btn.innerHTML = element.type.name
    });
    modalWeight.innerHTML = valor.weight
    modalHeight.innerHTML = valor.height
    nomeModal.innerHTML = valor.name
    imagemModal.src = valor.sprites.other.dream_world.front_default
}
function abrirModal() {
    modal.classList.add('active')
}
function fecharModal() {
    modal.classList.remove('active')
}
btnfecharModal.addEventListener('click', fecharModal)

async function filtrarAgua() {
    pokemons.innerHTML = ''
    remocaoClasse(btnAgua, btnFogo, btnTudo)
    try {
        const response = await fetch(apiPadrao)
        const data = await response.json()
        let url = []
        pokemons.innerHTML = ''
        data.results.map(item => { url.push(item.url) })
        url.forEach(async item => {
            const responseURL = await fetch(item)
            const dataUrl = await responseURL.json()
            dataUrl.types.forEach(element => {
                if (element.type.name == 'water') {
                    elementos(dataUrl)
                }
            })
        })
    } catch (error) {

    }
}
async function remocaoClasse(primeiro, segundo, terceiro) {
    primeiro.classList.add('btn--selected')
    segundo.classList.remove('btn--selected')
    terceiro.classList.remove('btn--selected')
}
async function filtrarFogo() {
    pokemons.innerHTML = ''
    remocaoClasse(btnFogo, btnAgua, btnTudo)
    try {
        const response = await fetch(apiPadrao)
        const data = await response.json()
        let url = []
        pokemons.innerHTML = ''
        data.results.map(item => { url.push(item.url) })
        url.forEach(async item => {
            const responseURL = await fetch(item)
            const dataUrl = await responseURL.json()
            dataUrl.types.forEach(element => {
                if (element.type.name == 'fire') {
                    elementos(dataUrl)
                }
            })
        })
    } catch (error) {

    }
}
function theme() {
    
    if(!input.checked){
        input.checked = true
        root.style.setProperty('--background', '#000')
        input.style.color = 'white'
    }else{
       input.checked = false
        root.style.setProperty('--background', '#fff')
        input.style.color = 'black'
    }
}

lightDark.addEventListener('click', theme)
btnAgua.addEventListener('click', filtrarAgua)
btnFogo.addEventListener('click', filtrarFogo)
btnTudo.addEventListener('click', apiPadraoRetorno)
window.addEventListener('load', async () => {
    await apiPadraoRetorno()
})
