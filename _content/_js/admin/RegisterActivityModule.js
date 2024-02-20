class RegistroAsitencia {
    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container = document.getElementById('app-container');
        this.URL = './_content/_php/controllerAdmin.php'
        this.actividadid = null;
        this.eventid = null;
        this.usuarios = [];
        this.assitans = [];
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
        container.className = 'p-4 relative h-full flex flex-col'; // Agregar las clases flex y h-full para que el contenedor principal ocupe toda la altura disponible
    
        const headerContainer = document.createElement('div'); // Contenedor para el botón de retroceso y el título
        headerContainer.className = 'flex justify-between items-center'; // Utilizamos flexbox para alinear los elementos horizontalmente
        headerContainer.style.textAlign = 'center'; // Centrar el contenido
        headerContainer.style.display = 'flex'; // Establecer el display a flex
    
        const backButton = document.createElement('button');
        backButton.textContent = '←'; // Cambiar a flecha hacia la izquierda
        backButton.className = 'text-black font-bold py-2 px-4 rounded-full shadow-md bg-white';
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
        searchInput.id = 'searchAssistans';
        searchInput.className = 'flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500';
        searchInput.addEventListener('input', () => {
            this.searchAssitant();
        });
        const searchButton = document.createElement('button');
        searchButton.className = 'bg-gray-300 rounded-r-lg py-2 px-4 focus:outline-none h-full'; // Agrega la clase h-full para que tenga la misma altura que el input
       
        searchButton.addEventListener('click', ()=> {
            this.searchAssitant();
        }

        )
        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton); // Agrega el botón de búsqueda al contenedor de búsqueda
    
        container.appendChild(searchDiv);
    
        const RegisterActivityDiv = document.createElement('div');
        RegisterActivityDiv.id = 'Registroasistencia';
        RegisterActivityDiv.className = ' overflow-y-auto grid grid-cols-1 gap-2'; // Agrega la clase overflow-y-auto para habilitar el desplazamiento vertical
        RegisterActivityDiv.style.maxHeight = 'calc(100vh - 250px)'; // Establece una altura máxima en lugar de una altura fija
        RegisterActivityDiv.style.overflowY = 'auto'; // Añade desplazamiento vertical cuando sea necesario
        
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
                        <div class="mb-4 overflow-y-auto h-80" id="info-user">
                        </div>        
                    </form>
                `,
                buttons: [
                    { label: 'Cerrar', action: () => { this.modal.close() } }
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
    
    searchAssitant(){
        let searchAssistans = document.getElementById('searchAssistans').value;
        this.RegisterAsistenceDiv.innerHTML = '';
        const resultados = this.assitans.filter (asistente =>
            asistente.username.toLowerCase().includes(searchAssistans.toLowerCase()) ||
            asistente.nombre.toLowerCase().includes(searchAssistans.toLowerCase()) ||
            asistente.apaterno.toLowerCase().includes(searchAssistans.toLowerCase()) ||
            asistente.amaterno.toLowerCase().includes(searchAssistans.toLowerCase())
        )

        resultados.forEach(dato => {
            const card = document.createElement('div');
            card.classList.add('shadow-md', 'p-4','rounded-md', 'flex', 'flex-col'); // Agregar 'flex' para usar flexbox y 'flex-col' para disposición vertical
            card.style.backgroundColor = 'white'; // Establecer el fondo blanco
            const username = document.createElement('p');
            username.innerHTML = `<strong>SAP:</strong> ${dato.username}`;

            const nombre = document.createElement('p');
            nombre.innerHTML = `<strong>Nombre:</strong> ${dato.nombre} ${dato.apaterno} ${dato.amaterno}`;

            const centro = document.createElement('p');
            centro.innerHTML = `<strong>Centro:</strong> ${dato.nombre_centro}`;

            const Hora = document.createElement('p');
            Hora.innerHTML = `<strong>Hora:</strong> ${dato.hora_registro}`;

            // Añadir todas las etiquetas <p> al div de contenido
            [username, nombre,centro, Hora].forEach(elem => {
                card.appendChild(elem);
            });

            // Agregar el div de contenido y el botón a la tarjeta
            this.RegisterAsistenceDiv.appendChild(card);
        });

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
            card.classList.add('result-card', 'flex', 'justify-between', 'rounded-md', 'shadow-md', 'p-2', 'items-center'); // Utilizar clases de Tailwind CSS para estilos

            // Crear elementos para mostrar los datos del usuario
            const userData = document.createElement('div'); // Contenedor para datos de usuario
            userData.classList.add('flex', 'flex-col'); // Clases flex y flex-col para alinear elementos verticalmente

            const usernameElement = document.createElement('p');
            usernameElement.textContent = `SAP: ${resultado.username}`;
            usernameElement.classList.add('text-m', 'font-bold'); // Clases de Tailwind para estilos de texto

            const nombreElement = document.createElement('p');
            nombreElement.textContent = `Nombre: ${resultado.nombre} ${resultado.apaterno} ${resultado.amaterno}`;
            nombreElement.classList.add('text-sm'); // Clase de Tailwind para estilos de texto más pequeños

            const centroElement = document.createElement('p');
            centroElement.textContent = `Centro: ${resultado.NombreCentro}`;
            centroElement.classList.add('text-sm', 'text-gray-500'); // Clases de Tailwind para estilos de texto más pequeños y color gris

            // Agregar elementos de usuario al contenedor userData
            userData.appendChild(nombreElement);
            userData.appendChild(usernameElement);
            userData.appendChild(centroElement);

            // Crear el botón de agregar
            const addButton = document.createElement('button');
            addButton.textContent = 'Registrar';
            addButton.classList.add('add-button', 'text-sm', 'p-2', 'bg-blue-500', 'text-white', 'rounded-md', 'shadow-sm'); // Clases de Tailwind para estilos de botón

            // Agregar evento de clic al botón de agregar
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
            card.appendChild(userData); // Agregar contenedor de datos de usuario
            card.appendChild(addButton); // Agregar botón de agregar

            // Agregar la tarjeta al contenedor de información de usuario
            infoUser.appendChild(card);

        });
    }

    handlerAddAsistence(data) {
        if (data.success) {
            this.RegisterAsistenceDiv.innerHTML = '';
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
            this.usuarios = data.data.datos.map(usuario => ({
                username: usuario.username,
                nombre: usuario.nombre,
                apaterno: usuario.apaterno,
                amaterno: usuario.amaterno,
                NombreCentro: usuario.NombreCentro
            }));
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
            this.assitans = data.data.datos.map(usuario => ({
                username: usuario.username,
                nombre: usuario.nombre,
                apaterno: usuario.apaterno,
                amaterno: usuario.amaterno,
            }));
            const datos = data.data.datos;
            this.RegisterAsistenceDiv.innerHTML = '';
            datos.forEach(dato => {
                const card = document.createElement('div');
                card.classList.add('shadow-md', 'p-4','rounded-md', 'flex', 'flex-col'); // Agregar 'flex' para usar flexbox y 'flex-col' para disposición vertical
                card.style.backgroundColor = 'white'; // Establecer el fondo blanco
                const username = document.createElement('p');
                username.innerHTML = `<strong>SAP:</strong> ${dato.username}`;
    
                const nombre = document.createElement('p');
                nombre.innerHTML = `<strong>Nombre:</strong> ${dato.nombre} ${dato.apaterno} ${dato.amaterno}`;
    
                const centro = document.createElement('p');
                centro.innerHTML = `<strong>Centro:</strong> ${dato.nombre_centro}`;
    
                const Hora = document.createElement('p');
                Hora.innerHTML = `<strong>Hora:</strong> ${dato.hora_registro}`;
    
                // Añadir todas las etiquetas <p> al div de contenido
                [username, nombre,centro, Hora].forEach(elem => {
                    card.appendChild(elem);
                });
    
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