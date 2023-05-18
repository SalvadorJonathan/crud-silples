const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sModelo = document.querySelector('#m-modelo')
const sClasse = document.querySelector('#m-classe')
const sValidade = document.querySelector('#m-validade')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.classModelo.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sModelo.value = itens[index].modelo
    sClasse.value = itens[index].classe
    sValidade.value = itens[index].validade
    id = index
  } else {
    sModelo.value = ''
    sClasse.value = ''
    sValidade.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.modelo}</td>
    <td>${item.classe}</td>
    <td>${item.validade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sModelo.value == '' || sClasse.value == '' || sValidade.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].modelo = sModelo.value
    itens[id].classe = sClasse.value
    itens[id].validade = sValidade.value
  } else {
    itens.push({'modelo': sModelo.value, 'classe': sClasse.value, 'validade': sValidade.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()