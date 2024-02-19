class RegistroAsitencia {
    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container = document.getElementById('app-container');
        this.URL = './_content/_php/controllerAdmin.php'
        this.actividadid = null;
        this.eventid = null;
        this.usuarios = [];
    }

    init(actividadid, eventid) {
        this.actividadid = actividadid;
        this.eventid = eventid;
        this.container.innerHTML = '';
        this.PantallaInicio();
        this.get_allAsistence();
        this.RegisterAsistenceDiv = document.getElementById('Registroasistencia');
        this.modal = new Modal();
        this.get_allUsers();
    }




    PantallaInicio() {

        const container = document.createElement('div');
        container.className = 'p-4 relative'; // Agregar relative al contenedor principal

        const headerContainer = document.createElement('div'); // Contenedor para el botón de retroceso y el título
        headerContainer.className = 'flex justify-between items-center'; // Utilizamos flexbox para alinear los elementos horizontalmente
        headerContainer.style.textAlign = 'center'; // Centrar el contenido
        headerContainer.style.display = 'flex'; // Establecer el display a flex

        const backButton = document.createElement('button');
        backButton.textContent = '←'; // Cambiar a flecha hacia la izquierda
        backButton.className = 'text-black font-bold py-2 px-4 rounded-full shadow-md';
        backButton.style.width = '15%'; // Establecer el ancho al 20%
        backButton.addEventListener('click', () => {
            this.container.innerHTML = '';
            this.activities = new Activities();
            this.activities.init(this.eventid);
        });

        const title = document.createElement('h2');
        title.textContent = 'Registro de Asistencias';
        title.className = 'text-2xl font-bold';
        title.style.flex = '1'; // Establecer el factor de flexibilidad para que ocupe el resto del espacio

        headerContainer.appendChild(backButton);
        headerContainer.appendChild(title);

        container.appendChild(headerContainer); // Agregamos el contenedor del encabezado al contenedor principal

        const searchDiv = document.createElement('div');
        searchDiv.className = 'flex items-center my-6';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar';
        searchInput.className = 'flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500';

        const searchButton = document.createElement('button');
        searchButton.className = 'bg-gray-300 rounded-r-lg py-2 px-4 focus:outline-none h-full'; // Agrega la clase h-full para que tenga la misma altura que el input


        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton); // Agrega el botón de búsqueda al contenedor de búsqueda

        container.appendChild(searchDiv);

        const RegisterActivityDiv = document.createElement('div');
        RegisterActivityDiv.id = 'Registroasistencia';
        RegisterActivityDiv.className = 'mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        container.appendChild(RegisterActivityDiv);

        const addButton = document.createElement('button');
        addButton.id = 'btn-AddRegisterAsistence';
        addButton.textContent = '+';
        addButton.className = 'btn-AddEvent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md absolute bottom-4 right-4';
        container.appendChild(addButton);
        addButton.addEventListener('click', () => {
            this.modal.open({
                title: 'Agregar Asistencia',
                htmlContent: `
                    <form id="miFormulario" class="w-full max-w-lg mx-auto">
                        <div class="my-4">
                            <label for="nombre" class="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-4" id="info-user">
                        </div>        
                    </form>
                `,
                buttons: [
                    { label: 'Buscar', action: () => { this.seachUser() } },
                    { label: 'Cancelar', action: () => { this.modal.close() } }
                ],
                modalClass: 'mi-clase-modal',
                contentClass: 'mi-clase-contenido'
            });
            this.seachUser() 
            // Obtener el input de búsqueda después de abrir el modal
            const inputBusqueda = document.getElementById('nombre');
            // Agregar evento de escucha para actualizar la búsqueda en tiempo real
            inputBusqueda.addEventListener('input', () => {
                this.seachUser();
            });
        });
        
        this.container.appendChild(container);
    }

    seachUser() {   
        let nombre = document.getElementById('nombre').value;
        const infoUser = document.getElementById('info-user');
    
        // Limpiar el contenedor de información de usuario
        infoUser.innerHTML = '';
    
        // Buscar usuarios que coincidan con el nombre ingresado
        const resultados = this.usuarios.filter(usuario => 
            usuario.username.toLowerCase().includes(nombre.toLowerCase()) ||
            usuario.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
            usuario.apaterno.toLowerCase().includes(nombre.toLowerCase()) ||
            usuario.amaterno.toLowerCase().includes(nombre.toLowerCase())
        );
    
        // Mostrar los resultados en el contenedor de información de usuario
        resultados.forEach(resultado => {
            // Crear la tarjeta para cada resultado
            const card = document.createElement('div');
            card.classList.add('result-card'); // Agregar una clase para estilizar la tarjeta
    
            // Crear elementos para mostrar los datos del usuario
            const usernameElement = document.createElement('p');
            usernameElement.textContent = `Username: ${resultado.username}`;
    
            const nombreElement = document.createElement('p');
            nombreElement.textContent = `Nombre: ${resultado.nombre} ${resultado.apaterno} ${resultado.amaterno}`;
    
            // Crear el botón de agregar
            const addButton = document.createElement('button');
            addButton.textContent = 'Agregar';
            addButton.classList.add('add-button'); // Agregar una clase para estilizar el botón
            addButton.addEventListener('click', () => {
                let data_post = {
                    actividadid: this.actividadid,
                    username: resultado.username,
                    action: 'handlerAddAsistence'
                };
                this.httpRequestService.makeRequest({
                    url: this.URL,
                    data: data_post,
                    method: 'POST',
                    successCallback: this.handlerAddAsistence.bind(this),
                    errorCallback: this.handleRequestError.bind(this)
                });
            });
    
            // Agregar elementos a la tarjeta
            card.appendChild(usernameElement);
            card.appendChild(nombreElement);
            card.appendChild(addButton);
    
            // Agregar la tarjeta al contenedor de información de usuario
            infoUser.appendChild(card);
        });
    }

    handlerAddAsistence(data) {
        if (data.success) {
            this.modal.close();
            this.get_allAsistence();
        } else {
            console.log('Error al agregar la asistencia');
        }
    }
    
    get_allUsers() {
        let data_post = {
            action: 'handlerGetAllUsers'
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            data: data_post,
            method: 'POST',
            successCallback: this.handlerGetAllUsers.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }

    handlerGetAllUsers(data) {
        if (data.success) {
            // Indexar los datos relevantes de los usuarios
            this.usuarios = data.data.datos.map(usuario => ({
                username: usuario.username,
                nombre: usuario.nombre,
                apaterno: usuario.apaterno,
                amaterno: usuario.amaterno
            }));
            console.log(this.usuarios);
        }
    }



    get_allAsistence() {
        let data_post = {
            actividadid: this.actividadid,
            action: 'handlerGetAllAsistence'
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            data: data_post,
            method: 'POST',
            successCallback: this.handlerGetAllAsistence.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }

    handlerGetAllAsistence(data) {
        if (data.success) {
            const datos = data.data.datos;

            // Limpiar el contenido actual del contenedor
            this.RegisterAsistenceDiv.innerHTML = '';

            datos.forEach(dato => {
                const card = document.createElement('div');
                card.classList.add('border', 'border-gray-300', 'rounded-md', 'flex'); // Agregar 'flex' para usar flexbox
                card.style.backgroundColor = 'white'; // Establecer el fondo blanco

                const contentDiv = document.createElement('div'); // Div para el contenido de las etiquetas <p>
                contentDiv.style.flexGrow = 1; // El contenido ocupará el espacio restante
                contentDiv.style.textAlign = 'left'; // Alinear el contenido a la izquierda
                contentDiv.classList.add('pt-4', 'pl-4', 'pb-4')

                const username = document.createElement('p');
                username.textContent = `Username: ${dato.username}`;

                const nombre = document.createElement('p');
                nombre.textContent = `Nombre: ${dato.nombre} ${dato.apaterno} ${dato.amaterno}`;

                const fecha = document.createElement('p');
                fecha.textContent = `Fecha: ${dato.fecha}`;

                // Añadir todas las etiquetas <p> al div de contenido
                [username, nombre, fecha].forEach(elem => {
                    contentDiv.appendChild(elem);
                });
                card.appendChild(contentDiv);

                // Agregar el div de contenido y el botón a la tarjeta
                this.RegisterAsistenceDiv.appendChild(card);
            });
        } else {
            console.log('Error al obtener los puntos');
        }
    }

    handleRequestError(error) {
        console.error('Error en la petición:', error);
    }

}