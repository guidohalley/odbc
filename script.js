var selectedRow = null;

// Mostrar aleartas

function showAlert(message, className) {
    const div = document.createElement("div");

    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const main = document.querySelector('.main');

    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
// Limpiar todas las celdas

function clearFields() {
    document.querySelector('#productoId').value = "";
    document.querySelector('#productoNombre').value = "";
    document.querySelector('#productoDescripcion').value = "";
    document.querySelector('#productoPrecio').value = "";
}
//Agregar Producto

document.querySelector('#student-form').addEventListener("submit", (e) => {
    e.preventDefault();

    //traigo los valores
    const id = document.querySelector("#productoId").value;
    const productoNombre = document.querySelector("#productoNombre").value;
    const productoDescripcion = document.querySelector("#productoDescripcion").value;
    const productoPrecio = document.querySelector("#productoPrecio").value;

    // me fijo que esten rellenados
    if (id === "" || productoNombre === "" || productoDescripcion === "" || productoPrecio === "") {
        showAlert("Por Favor Rellene todos los campos", "danger");
    }else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `            
                <td>${id}</td>
                <td>${productoNombre}</td>
                <td>${productoDescripcion}</td>
                <td>${productoPrecio}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Eliminar</a>
                </td> `;

            list.appendChild(row);
            selectedRow = null;
            showAlert("Se Agrego el Producto Correctamente", "success");            
        }
        else{
            selectedRow.children[0].textContent = id;
            selectedRow.children[1].textContent = productoNombre;
            selectedRow.children[2].textContent = productoDescripcion;
            selectedRow.children[3].textContent = productoPrecio;
            selectedRow = null;
            showAlert("El producto ha sido editado Correctamente", "info")
        }
        clearFields();
    }
});

// editar 

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#productoId").value = selectedRow.children[0].textContent;
        document.querySelector("#productoNombre").value = selectedRow.children[1].textContent;
        document.querySelector("#productoDescripcion").value = selectedRow.children[2].textContent;
        document.querySelector("#productoPrecio").value = selectedRow.children[3].textContent;
        
    }
})

// Eliminar Producto

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Producto Eliminado Correctamente", "danger");
    }
});