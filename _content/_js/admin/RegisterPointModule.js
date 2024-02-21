class Points {
    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container = document.getElementById('app-container');
        this.URL = './_content/_php/controllerAdmin.php';
        this.actividadid = null;
        this.eventid = null;
        this.usuarios = [];
        this.poinstUsers = [];
        this.datapoints = [];

    }

    init(actividadid, eventid) {
        this.actividadid = actividadid;
        this.eventid = eventid;
        this.container.innerHTML = '';
        this.modal = new Modal();
        this.get_dataPoints();
        this.PantallaInicio();
        this.pointsDiv = document.getElementById('RegistroPuntos');
        this.get_allUsers();
        this.get_allpoints();
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
        backButton.className = 'text-black font-bold py-2 px-4 rounded-full shadow-md bg-white';
        backButton.style.width = '15%'; // Establecer el ancho al 20%
        backButton.addEventListener('click', () => {
            this.container.innerHTML = '';
            this.activities = new Activities();
            this.activities.init(this.eventid);
        });

        const title = document.createElement('h2');
        title.textContent = 'Registro de Puntos';
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
        searchInput.id = 'searchPointUser';
        searchInput.addEventListener('input', () => {
            this.searchPointUser();
        });
        const searchButton = document.createElement('button');
        searchButton.className = 'bg-gray-300 rounded-r-lg py-2 px-4 focus:outline-none h-full'; // Agrega la clase h-full para que tenga la misma altura que el input


        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton); // Agrega el botón de búsqueda al contenedor de búsqueda

        container.appendChild(searchDiv);

        const pointsDiv = document.createElement('div');
        pointsDiv.id = 'RegistroPuntos';
        pointsDiv.className = ' overflow-y-auto grid grid-cols-1 gap-2'; // Agrega la clase overflow-y-auto para habilitar el desplazamiento vertical
        pointsDiv.style.maxHeight = 'calc(100vh - 250px)'; // Establece una altura máxima en lugar de una altura fija
        pointsDiv.style.overflowY = 'auto'; // Añade desplazamiento vertical cuando sea necesario

        container.appendChild(pointsDiv);

        const addButton = document.createElement('button');
        addButton.id = 'btn-AddRegisterPoints';
        addButton.textContent = '+';
        addButton.className = 'btn-AddEvent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md absolute bottom-4 right-4';
        container.appendChild(addButton);
        addButton.addEventListener('click', () => {
            this.modal.open({
                title: 'Agregar Punto',
                text: 'Texto para este punto',
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
                NombreCentro: usuario.NombreCentro,
                descripcion: usuario.descripcion
            }));
        }
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
            usuario.amaterno.toLowerCase().includes(nombre.toLowerCase()) ||
            usuario.descripcion.toLowerCase().includes(nombre.toLowerCase())
        );

        // Mostrar los resultados en el contenedor de información de usuario
        resultados.forEach(dato => {
            const card = document.createElement('div');
            card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'relative', 'flex'); // Agregar 'flex' para usar flexbox

            const contentDiv = document.createElement('div'); // Div para el contenido de las etiquetas <p>

            const username = document.createElement('p');
            username.innerHTML = `<b>Username:</b> ${dato.username}`;

            const nombre = document.createElement('p');
            nombre.innerHTML = `<b>Nombre:</b> ${dato.nombre} ${dato.apaterno} ${dato.amaterno}`;

            [username, nombre].forEach(elem => {
                contentDiv.appendChild(elem);
            });
            card.appendChild(contentDiv);
                // Crear el contenedor principal
                const container = document.createElement('div');
                container.classList.add('rounded-md', 'flex', 'flex-col', 'items-center'); // Agregar 'flex' para usar flexbox
                container.style.width = '50%'; // Establecer el ancho al 100%
                // Crear el contenedor del título
                const titleContainer = document.createElement('div');
                titleContainer.classList.add('mb-2'); // Agregar margen inferior
                // Crear el título
                const title = document.createElement('h3');
                title.textContent = 'Registrar Puntos';
                title.classList.add('text-md', 'font-bold', 'text-center');
                // Agregar el título al contenedor del título
                titleContainer.appendChild(title);
                // Agregar el contenedor del título al contenedor principal
                container.appendChild(titleContainer);

                this.datapoints.forEach(dp => {
                    const btnContainer = document.createElement('div');
                    btnContainer.classList.add('flex', 'items-center', 'mb-2');
                    const button = document.createElement('button');
                    button.textContent = dp.Puntos;
                    button.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'ml-2', 'rounded-full');

                    btnContainer.appendChild(button);

                    container.appendChild(btnContainer);
                });

                card.appendChild(container);
            infoUser.appendChild(card);
        });
    }

    searchPointUser() {
        let searchPointUser = document.getElementById('searchPointUser').value;
        this.pointsDiv.innerHTML = '';
        const resultados = this.poinstUsers.filter(usuario =>
            usuario.username.toLowerCase().includes(searchPointUser.toLowerCase()) ||
            usuario.nombre.toLowerCase().includes(searchPointUser.toLowerCase()) ||
            usuario.apaterno.toLowerCase().includes(searchPointUser.toLowerCase()) ||
            usuario.amaterno.toLowerCase().includes(searchPointUser.toLowerCase()) ||
            usuario.total_puntos.toLowerCase().includes(searchPointUser.toLowerCase())

        )
        resultados.forEach(dato => {
            const card = document.createElement('div');
            card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'relative', 'flex'); // Agregar 'flex' para usar flexbox

            const contentDiv = document.createElement('div'); // Div para el contenido de las etiquetas <p>

            const username = document.createElement('p');
            username.innerHTML = `<b>Username:</b> ${dato.username}`;

            const nombre = document.createElement('p');
            nombre.innerHTML = `<b>Nombre:</b> ${dato.nombre} ${dato.apaterno} ${dato.amaterno}`;

            const totalPuntos = document.createElement('p');
            totalPuntos.innerHTML = `<b>Punto asignado:</b> ${dato.total_puntos}`;

            const descripcion = document.createElement('p');
            descripcion.innerHTML = `<b>Descripción:</b> ${dato.descripcion}`;

            [username, nombre, totalPuntos, descripcion].forEach(elem => {
                contentDiv.appendChild(elem);
            });
            card.appendChild(contentDiv);
            if (dato.total_puntos == 0) {
                const container = document.createElement('div');
                container.classList.add('rounded-md', 'flex', 'flex-col', 'items-center');
                container.style.width = '65%';

                const titleContainer = document.createElement('div');
                titleContainer.classList.add('mb-2');

                const title = document.createElement('h3');
                title.textContent = 'Registrar Puntos';
                title.classList.add('text-md', 'font-bold', 'text-center');

                titleContainer.appendChild(title);
                container.appendChild(titleContainer);
                // Generar botones basados en los datos almacenados globalmente
                this.datapoints.forEach(dp => {
                    const btnContainer = document.createElement('div');
                    btnContainer.classList.add('flex', 'items-center', 'mb-2');

                    const text = document.createElement('p');
                    text.textContent = `${dp.descripcion}`;

                    const button = document.createElement('button');
                    button.textContent = dp.Puntos;
                    button.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'ml-2', 'rounded-full');

                    btnContainer.appendChild(text);
                    btnContainer.appendChild(button);

                    container.appendChild(btnContainer);
                });

                card.appendChild(container);
            }


            this.pointsDiv.appendChild(card);
        });

    }

    get_allpoints() {
        let data_post = {
            actividadid: this.actividadid,
            action: 'handlerGetAllPoints'
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            data: data_post,
            method: 'POST', // Cambiar a método POST        
            successCallback: this.handlerGetAllPoints.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }

    handlerGetAllPoints(data) {
        if (data.success) {
            this.poinstUsers = data.data.datos.map(usuario => ({
                username: usuario.username,
                nombre: usuario.nombre,
                apaterno: usuario.apaterno,
                amaterno: usuario.amaterno,
                total_puntos: usuario.total_puntos,
                descripcion: usuario.descripcion // Agregar la descripción al mapear los usuarios
            }));
    
            const datos = data.data.datos;
            this.pointsDiv.innerHTML = '';
    
            datos.forEach(dato => {
                const card = document.createElement('div');
                card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'relative', 'flex');
    
                const contentDiv = document.createElement('div');
    
                const username = document.createElement('p');
                username.innerHTML = `<b>SAP:</b> ${dato.username}`;
    
                const nombre = document.createElement('p');
                nombre.innerHTML = `<b>Nombre:</b> ${dato.nombre} ${dato.apaterno} ${dato.amaterno}`;
    
                const totalPuntos = document.createElement('p');
                totalPuntos.innerHTML = `<b>Punto asignado:</b> ${dato.total_puntos}`;
    
                const descripcion = document.createElement('p');
                descripcion.innerHTML = `<b>Descripción:</b> ${dato.descripcion}`;
    
                [username, nombre, totalPuntos, descripcion].forEach(elem => {
                    contentDiv.appendChild(elem);
                });
                card.appendChild(contentDiv);
    
                if (dato.total_puntos == 0) {
                    const container = document.createElement('div');
                    container.classList.add('rounded-md', 'flex', 'flex-col', 'items-center');
                    container.style.width = '65%';
    
                    const titleContainer = document.createElement('div');
                    titleContainer.classList.add('mb-2');
    
                    const title = document.createElement('h3');
                    title.textContent = 'Registrar Puntos';
                    title.classList.add('text-md', 'font-bold', 'text-center');
    
                    titleContainer.appendChild(title);
                    container.appendChild(titleContainer);
                    // Generar botones basados en los datos almacenados globalmente
                    this.datapoints.forEach(dp => {
                        const btnContainer = document.createElement('div');
                        btnContainer.classList.add('flex', 'items-center', 'mb-2');
    
                        const text = document.createElement('p');
                        text.textContent = `Punto por:  ${dp.descripcion}`;
    
                        const button = document.createElement('button');
                        button.textContent = dp.Puntos;
                        button.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'ml-2', 'rounded-full');
    
                        btnContainer.appendChild(text);
                        btnContainer.appendChild(button);
    
                        container.appendChild(btnContainer);
                    });
    
                    card.appendChild(container);
                }
    
                this.pointsDiv.appendChild(card);
            });
    
        } else {
            console.log('Error al obtener los puntos');
        }
    }
    

    handlerAddPoints(data) {
        if (data.success) {
            console.log('Puntos registrados');
        } else {
            console.log('Error al registrar los puntos');
        }
    }


    get_dataPoints() {
        let data_post = {
            actividadid: this.actividadid,
            action: 'handlerGetDataPoints'
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            data: data_post,
            method: 'POST',
            successCallback: this.handlerGetDataPoints.bind(this),
            errorCallback: this.handleRequestError
        });
    }

    handlerGetDataPoints(data) {
        if (data.success) {
            this.datapoints = data.data.datos; // Almacenar el objeto en this.datapoints
            console.log('Datos almacenados globalmente:', this.datapoints); // Opcional: Mostrar los datos almacenados
        } else {
            console.log('Error al registrar los puntos');
        }
    }
    



    handleRequestError = error => {
        console.error(error);
    }

}