$(document).ready(function() {
  const clientes = [
    {
      nombre: "Nicolás",
      apellido: "Acuña",
      email: "nacumar@aulaestudio.es",
      imagen: "img/davidlaid.png"
    },
    {
      nombre: "Javier María",
      apellido: "Pastor",
      email: "jmpasrod@aulaestudio.es",
      imagen: "img/perroviejo.png"
    },
    {
      nombre: "Noel",
      apellido: "Santiañez",
      email: "nsanrod@aulaestudio.es",
      imagen: "img/yonki.png"
    },
    {
      nombre: "Adrian",
      apellido: "Condines",
      email: "aconcel@aulaestudio.es",
      imagen: "img/dimaria.png"
    },
    {
      nombre: "Bruno",
      apellido: "Fandiño",
      email: "bfanvei@aulaestudio.es",
      imagen: "img/rubio.png"
    },
    {
      nombre: "Birhan",
      apellido: "Fernández",
      email: "bferfer@aulaestudio.es",
      imagen: "img/negro.png"
    },
    {
      nombre: "Eder",
      apellido: "Martinez",
      email: "emarcas@aulaestudio.es",
      imagen: "img/tiotodofeo.png"
    },
    {
      nombre: "Angel",
      apellido: "Rodriguez",
      email: "arodqu@aulaestudio.es",
      imagen: "img/gnomofeo.png"
    },
    {
      nombre: "Roberto",
      apellido: "Castro",
      email: "rcaslis@aulaestudio.es",
      imagen: "img/gigahiperchad.png"
    }
  ];

  function mostrarClientes(textoBusqueda) {
    $('#results').empty();

    const clientesFiltrados = clientes.filter(cliente => {
      const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`.toLowerCase();
      return nombreCompleto.includes(textoBusqueda.toLowerCase());
    });

    clientesFiltrados.forEach(cliente => {
      const card = $('<div class="card"></div>');
      card.append(`<img src="${cliente.imagen}" alt="Imagen de ${cliente.nombre}">`);
      card.append(`<p class="nombre">${cliente.nombre} ${cliente.apellido}</p>`);
      card.append(`<p class="email">Email: ${cliente.email}</p>`);
      card.append('<i class="fas fa-edit edit-icon"></i>');
      card.append('<i class="fas fa-trash delete-icon"></i>');
      $('#results').append(card);

      // Agrega el controlador de eventos para el icono de eliminar
      card.find('.delete-icon').on('click', function() {
        confirmarEliminacion(cliente);
      });

      // Agrega el controlador de eventos para el icono de editar
      card.find('.edit-icon').on('click', function() {
        editarCliente(cliente);
      });
    });
  }

  $('#searchButton').on('click', function() {
    const textoBusqueda = $('#searchInput').val();
    mostrarClientes(textoBusqueda);
  });

  $('#searchInput').on('keyup', function() {
    const textoBusqueda = $(this).val();
    mostrarClientes(textoBusqueda);
  });

  function confirmarEliminacion(cliente) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${cliente.nombre} ${cliente.apellido}?`)) {
      eliminarCliente(cliente);
    }
  }

  function eliminarCliente(cliente) {
    const index = clientes.indexOf(cliente);
    if (index > -1) {
      clientes.splice(index, 1);
    }
    mostrarClientes('');
  }

  function editarCliente(cliente) {
    $('#editNombre').val(cliente.nombre);
    $('#editApellido').val(cliente.apellido);
    $('#editEmail').val(cliente.email);
    $('#editImagen').data('imagen', cliente.imagen);

    const modal = document.getElementById('editClientModal');
    modal.style.display = 'block';

    $('#editClientForm').off('submit').on('submit', function(event) {
      event.preventDefault();

      cliente.nombre = $('#editNombre').val();
      cliente.apellido = $('#editApellido').val();
      cliente.email = $('#editEmail').val();

      const editImagen = $('#editImagen')[0].files[0];
      if (editImagen) {
        const reader = new FileReader();
        reader.onload = function(e) {
          cliente.imagen = e.target.result;
          mostrarClientes('');
          modal.style.display = 'none';
        };
        reader.readAsDataURL(editImagen);
      } else {
        mostrarClientes('');
        modal.style.display = 'none';
      }
    });
  }

  // Manejo del modal para añadir clientes
  const addModal = document.getElementById('addClientModal');
  const editModal = document.getElementById('editClientModal');
  const addBtn = document.getElementById('addClientButton');
  const addSpan = addModal.getElementsByClassName('close')[0];
  const editSpan = editModal.getElementsByClassName('close')[0];

  addBtn.onclick = function() {
    addModal.style.display = 'block';
  };

  addSpan.onclick = function() {
    addModal.style.display = 'none';
  };

  editSpan.onclick = function() {
    editModal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == addModal) {
      addModal.style.display = 'none';
    } else if (event.target == editModal) {
      editModal.style.display = 'none';
    }
  };

  $('#addClientForm').on('submit', function(event) {
    event.preventDefault();

    const reader = new FileReader();
    reader.onload = function(e) {
      const nuevoCliente = {
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        email: $('#email').val(),
        imagen: e.target.result
      };

      clientes.push(nuevoCliente);
      mostrarClientes('');
      addModal.style.display = 'none';
      $('#addClientForm')[0].reset();
    };
    reader.readAsDataURL($('#imagen')[0].files[0]);
  });

  mostrarClientes('');
});
