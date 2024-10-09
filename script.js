// ------ DATOS ------

// DOM general.
const main = document.getElementById('main');

// DOM para las categorías.
const formCategoria = document.getElementById('form_categoria');
const table = document.getElementById('tbody_categoria');

// DOM para los gastos.
const formGasto = document.getElementById('form_gasto');
const tableGasto = document.getElementById('tbody_gasto');

// DOM para el presupuesto.
const formPresupuesto = document.getElementById('form_presupuesto');

// Variables.
let categorias = [];
let categoriasTotal = {};
let total = 0;
let presupuestoFixed = null;

// ------ FUNCIONES ------

// Función que habilita que despues de darle a los botones, se oculte el botón y se vean los formularios.
const enableForm = (btn, form) => {
  const closeButton = document.getElementById(btn);
  const openForm = document.getElementById(form);

  closeButton.classList.add('d-none');
  openForm.classList.remove('d-none');
}

// Función que deshabilita que despues de darle a los botones, se oculte el botón y se vean los formularios, reseteándolo.
const disableForm = (btn, form) => {
  const closeButton = document.getElementById(btn);
  const openForm = document.getElementById(form);

  closeButton.classList.remove('d-none');
  openForm.classList.add('d-none');
}

// Añade las categorías
const addCategoria = (categoria) => {

  // Añade las categorías en la tabla de categorías
  const row = document.createElement('tr');

  row.innerHTML = `<td class="text-center">${categoria}</td>
                   <td class="text-center">0</td>`;

  table.appendChild(row);

  // Añade las categorías en la selección de categoría en la creación de un gasto.
  const selectCategoria = document.getElementById('categoria');
  const option = document.createElement('option');
  option.text = categoria;
  option.value = categoria;
  selectCategoria.add(option);
}

// Añade los gastos
const addGasto = (fecha, concepto, categoria, cantidad) => {

  const row = document.createElement('tr');

  row.innerHTML = `<td class="text-center">${fecha}</td>
                   <td class="text-center">${concepto}</td>
                   <td class="text-center">${categoria}</td>
                   <td class="text-center">${cantidad}</td>
                   <td class="text-center">${total}</td>`;

  tableGasto.appendChild(row);
}

// Va a la tabla de categorías y actualiza el valor total
const actualizarCategoriaTotal = (categoria, cantidad) => {

  if (!categoriasTotal[categoria]) {
    categoriasTotal[categoria] = 0;
  }

  categoriasTotal[categoria] = parseFloat(categoriasTotal[categoria]) + cantidad;

  const rows = table.getElementsByTagName('tr');

  for (let row of rows) {
    if (row.cells[0].innerText === categoria) {
      row.cells[1].innerText = categoriasTotal[categoria];
      break;
    }
  }
}

// Comprueba el presupuesto para avisar si se pasa
const comprobarTotal = () => {
  const alert = document.getElementById('presupuesto_pasado');
  if ((presupuestoFixed != null) && (presupuestoFixed < total)) {
    alert.classList.remove('d-none');
  }
}

// Elimina el presupuesto
const eliminarPresupuesto = () => {
  presupuestoFixed = null;

  const alert = document.getElementById('presupuesto_pasado');
  if (!alert.classList.contains('d-none')) {
    alert.classList.add('d-none');
  }

  const addButton = document.getElementById('btn_presupuesto');
  addButton.classList.remove('d-none');

  const removeButton = document.getElementById('presupuesto_eliminar');
  removeButton.classList.add('d-none');
}

// ------ EVENTOS ------

// Gestión de evento para el formulario de categoría, contiene el control de errores del mismo.
formCategoria.addEventListener('submit', e => {
  e.preventDefault();
  disableForm('btn_categoria', 'form_categoria');

  const categoria_nuevo = document.getElementById('categoria_nuevo').value;

  if (categorias.includes(categoria_nuevo)) {
    alert("Esta categoría ya existe");
  } else if (!categoria_nuevo.trim()) {
    alert("El nombre de la categoría no puede estar vacío");
  } else {
    categorias.push(categoria_nuevo);
    alert(`Categoría ${categoria_nuevo} creada con éxito`);
    addCategoria(categoria_nuevo);
  }
})

// Gestión de evento para el formulario de gasto, contiene el control de errores del mismo.
formGasto.addEventListener('submit', e => {
  e.preventDefault();
  disableForm('btn_gasto', 'form_gasto');

  const fecha = document.getElementById('fecha').value;
  const concepto = document.getElementById('concepto').value;
  const categoria = document.getElementById('categoria').value;
  const cantidad = document.getElementById('cantidad').value;

  if (!fecha.trim() || !concepto.trim() || !categoria.trim() || !cantidad.trim()) {
    alert("No pueden haber campos vacíos");
  } else {
    total += parseFloat(cantidad);
    comprobarTotal();
    addGasto(fecha, concepto, categoria, cantidad);
    actualizarCategoriaTotal(categoria, parseFloat(cantidad));
    alert("Gasto añadido con éxito");
  }
})

// Gestión de evento para el formulario de presupuesto, contiene el control de errores del mismo.
formPresupuesto.addEventListener('submit', e => {
  e.preventDefault();

  const presupuesto = document.getElementById('presupuesto').value;

  if (!presupuesto.trim()) {
    alert("No pueden haber campos vacíos");
    disableForm('btn_presupuesto', 'form_presupuesto');
  } else {
    alert("Presupuesto creado con éxito");
    presupuestoFixed = presupuesto;
    comprobarTotal();

    const closeButton = document.getElementById('btn_presupuesto');
    closeButton.classList.add('d-none');

    const openButton = document.getElementById('presupuesto_eliminar');
    openButton.classList.remove('d-none');

    const openForm = document.getElementById('form_presupuesto');
    openForm.classList.add('d-none');
  }
})