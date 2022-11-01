const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sSobrenome = document.querySelector('#m-sobrenome')
const sCpf = document.querySelector('#m-cpf')
const sRg = document.querySelector('#m-rg')
const sData_nascimento = document.querySelector('#m-data_nascimento')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sSobrenome.value = itens[index].sobrenome
    sCpf.value = itens[index].CPF
    sRg.value = itens[index].rg
    sData_nascimento.value = itens[index].data_nascimento
    id = index
  } else {
    sNome.value = ''
    sSobrenome.value = ''
    sCpf.value = ''
    sRg.value = ''
    sData_nascimento.value = ''
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
    <td>${item.nome}</td>
    <td>${item.sobrenome}</td>
    <td>${item.cpf}</td>
    <td>${item.rg}</td>
    <td>${item.data_nascimento}</td>
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

  if (sNome.value == '' || sSobrenome.value == '' || sCpf.value == '' || sRg.value == '' || sData_nascimento.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].sobrenome = sSobrenome.value
    itens[id].cpf = sCpf.value
    itens[id].rg = sRg.value
    itens[id].data_nascimento = sData_nascimento.value
  } else {
    itens.push({ 'nome': sNome.value, 'sobrenome': sSobrenome.value, 'cpf': sCpf.value, 'rg': sRg.value, 'data_nascimento': sData_nascimento.value })
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