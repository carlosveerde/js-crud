const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sDiretoria = document.querySelector("#m-diretoria");
const sCargo = document.querySelector("#m-cargo");
const sData = document.querySelector("#m-data");
const contratar = document.querySelector("#contratar");

let itens;
let id;

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbada")) ?? [];
const setItensBD = () => localStorage.setItem("dbada", JSON.stringify(itens));

loadItens();

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.diretoria}</td>
    <td>${item.cargo}</td>
    <td>${item.data}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    sNome.value = itens[index].nome;
    sDiretoria.value = itens[index].diretoria;
    sCargo.value = itens[index].cargo;
    sData.value = itens[index].data;
  } else {
    sNome.value = "";
    sDiretoria.value = "";
    sCargo.value = "";
    sData.value = "";
  }
}

contratar.onclick = (e) => {
  if (
    sNome.value == "" ||
    sDiretoria.value == "" ||
    sCargo.value == "" ||
    sData.value == ""
  ) {
    return;
  }

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].diretoria = sDiretoria.value;
    itens[id].cargo = sCargo.value;
    itens[id].data = sData.value;
  } else {
    itens.push({
      nome: sNome.value,
      diretoria: sDiretoria.value,
      cargo: sCargo.value,
      data: sData.value,
    });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}
