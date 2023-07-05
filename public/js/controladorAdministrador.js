const table = document.getElementById("table");
const modal = document.getElementById("modal");
const inputs = document.querySelectorAll("input");
let count = 0;

window.addEventListener("click", (e) => {
  if (e.target.matches(".btn-warning")) {
    let data = e.target.parentElement.parentElement.children;
    fillData(data);
    modal.classList.toggle("translate");
  }

  if (e.target.matches(".btn-danger")) {
  modal.classList.toggle("translate");
  count=0
  }
});

const fillData = (data) => {
  const [id, nombre, tipo, creditos] = data;
  inputs[1].value = id.textContent;
  inputs[2].value = nombre.textContent;
//   inputs[3].value = tipo.textContent;
//   inputs[4].value = creditos.textContent;
};

