class Activities {

    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container = document.getElementById('app-container');
        this.eventid = null;
        this.URL = './_content/_php/controllerAdmin.php';
    }

    init(eventid) {
        this.container.innerHTML = '';  
        this.eventid = eventid;
        this.PantallaInicio();
        this.get_allactivities();
        this.modal = new Modal();
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
            this.eventos = new EventsModule();
            this.container.innerHTML = '';
            this.eventos.init();
        });
        
        const title = document.createElement('h2');
        title.textContent = 'Actividades';
        title.className = 'text-2xl font-bold pr-16'; 
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
        
        const actividadesDiv = document.createElement('div');
        actividadesDiv.id = 'Actividades';
        actividadesDiv.className = ' overflow-y-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2';
        actividadesDiv.style.maxHeight = 'calc(100vh - 250px)'; // Establece una altura máxima en lugar de una altura fija
actividadesDiv.style.overflowY = 'auto'; // Añade desplazamiento vertical cuando sea necesario

        container.appendChild(actividadesDiv);
        
        const addButton = document.createElement('button');
        addButton.id = 'btn-AddActivity';
        addButton.textContent = '+';
        addButton.className = 'btn-AddEvent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md absolute bottom-4 right-4';
        container.appendChild(addButton);
        addButton.addEventListener('click', () => {
            this.modal.open({
                title: 'Agregar actividad',
                text: 'Contenido del modal',
                htmlContent: `
            <form id="miFormulario" class="w-full max-w-lg mx-auto">
                <div class="mb-4">
                    <label for="titulo" class="block text-gray-700 text-sm font-bold mb-2">Título:</label>
                    <input type="text" id="titulo" name="titulo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                
                <div class="mb-4">
                    <label for="lugar" class="block text-gray-700 text-sm font-bold mb-2">Lugar:</label>
                    <input type="text" id="lugar" name="lugar" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                
                <div class="mb-4">
                    <label for="fechaInicio" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Inicio:</label>
                    <input type="date" id="fechaInicio" name="fechaInicio" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                
                <div class="mb-4">
                    <label for="fechaFinal" class="block text-gray-700 text-sm font-bold mb-2">Fecha Final:</label>
                    <input type="date" id="fechaFinal" name="fechaFinal" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                
            </form>
        `,
                buttons: [
                    { label: 'Aceptar', action: () => { this.validateAndSendActivityData() } },
                    { label: 'Cancelar', action: () => { this.modal.close() } }
                ],
                modalClass: 'mi-clase-modal',
                contentClass: 'mi-clase-contenido'
            });
        });
        this.container.appendChild(container);
    }
    

    validateAndSendActivityData() {
        const titulo = document.getElementById('titulo').value.trim();
        const lugar = document.getElementById('lugar').value.trim();
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFinal = document.getElementById('fechaFinal').value;

        if (!titulo || !lugar || !fechaInicio || !fechaFinal) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinalDate = new Date(fechaFinal);
        if (fechaInicioDate > fechaFinalDate) {
            alert('La fecha de inicio no puede ser mayor que la fecha final.');
            return;
        }

        const activityData = {
            titulo: titulo,
            lugar: lugar,
            fechaInicio: fechaInicio,
            fechaFinal: fechaFinal,
        };
        this.add_activities(activityData);
    }
    
    add_activities(activityData) {
        let data_post = {
            action: 'handlerAddActivity',
            eventid: this.eventid,
            activityData: activityData
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            method: 'POST',
            data: data_post,
            successCallback: this.handlerAddActivity.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }

    handlerAddActivity(data) {
        if (data.success) {
            this.modal.close();
            this.get_allactivities();

        }
    }


    get_allactivities() {
        let data_post = {
            action: 'handlerGetAllActivities',
            eventid: this.eventid
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            method: 'POST',
            data: data_post,
            successCallback: this.handleGetAllActivities.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }

    handleGetAllActivities = data => {
        if (data.success) {
            this.actividadesDiv = document.getElementById('Actividades');
            this.actividadesDiv.innerHTML = '';
    
            data.data.datos.forEach(actividad => {
                const actividadDiv = document.createElement('div');
                actividadDiv.className = 'bg-white rounded-lg shadow-md p-4 relative'; // Agrega la clase 'relative' para posicionar los elementos relativos al contenedor padre
                actividadDiv.setAttribute('data-id', actividad.id);
    
                // Icono de engranaje (SVG)
                const gearIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                gearIcon.setAttribute("class", "w-6 h-6 absolute top-2 right-2 text-gray-400 cursor-pointer");
                gearIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                gearIcon.setAttribute("fill", "none");
                gearIcon.setAttribute("viewBox", "0 0 24 24");
                gearIcon.setAttribute("stroke", "currentColor");
                gearIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h.01M6 12h.01M21 12h.01m-3 0h.01m-3 0h.01m-3 0h.01m-3 0h.01m-3 0h.01m-3 0h.01"></path>
                `;
                actividadDiv.appendChild(gearIcon);
    
                // Menú desplegable
                const menuDiv = document.createElement('div');
                menuDiv.className = 'hidden absolute top-10 right-0 bg-white rounded-md shadow-md py-2'; // Clases para el menú desplegable
                menuDiv.style.zIndex = '10'; // Asegura que el menú desplegable esté sobre otros elementos
                menuDiv.innerHTML = `
                    <div class="px-4 py-2 cursor-pointer hover:bg-gray-100">Editar</div>
                    <div class="px-4 py-2 cursor-pointer hover:bg-gray-100">Eliminar</div>
                `;
                actividadDiv.appendChild(menuDiv);
    
                // Título de la actividad
                const title = document.createElement('h3');
                title.textContent = actividad.Nombre;
                title.className = 'text-xl font-bold mb-4'; // Agrega un margen inferior para separar los botones
                title.style.width = '100%'; // Define el ancho del título
                actividadDiv.appendChild(title);
    
                // Contenedor para las fechas y participantes
                const infoContainer = document.createElement('div');
                infoContainer.className = 'text-gray-600 mb-4'; // Agrega un margen inferior para separar los botones
                infoContainer.style.width = '100%'; // Define el ancho del contenedor
                actividadDiv.appendChild(infoContainer);
    
                // Fecha de inicio
                const FechaI = document.createElement('p');
                FechaI.innerHTML = '<strong>Fecha inicio:</strong> ' + actividad.FechaI;
                infoContainer.appendChild(FechaI);
    
                // Fecha de fin
                const FechaF = document.createElement('p');
                FechaF.innerHTML = '<strong>Fecha fin:</strong> ' + actividad.FechaF;
                infoContainer.appendChild(FechaF);
    
                // Participantes
                const Participantes = document.createElement('p');
                Participantes.innerHTML = '<strong>Participantes:</strong> ' + actividad.Participantes;
                infoContainer.appendChild(Participantes);
    
                // Botones en la parte inferior
                const botonesDiv = document.createElement('div');
                botonesDiv.className = 'flex'; // Utiliza flexbox para que los botones estén en la misma fila
                botonesDiv.style.width = '100%'; // Asegura que el contenedor de botones ocupe el ancho completo
    
                // Botón 1
                const boton1 = document.createElement('button');
                boton1.textContent = 'Registrar Asistencia';
                boton1.className = 'boton bg-white hover:bg-gray-200 focus:bg-gray-300 focus:outline-none p-2 rounded-md rounded-lg shadow-md	mx-2 text-sm bg-gray-100';
                boton1.style.width = '50%'; // Cada botón ocupa el 50% del ancho
                botonesDiv.appendChild(boton1);
                boton1.addEventListener('click', () => {
                    this.registroAsitencia = new RegistroAsitencia();
                    this.registroAsitencia.init(actividad.id , this.eventid);
                    
                }   );

                // Botón 2
                const boton2 = document.createElement('button');
                boton2.textContent = 'Registrar Puntos';
                boton2.className = 'boton bg-white hover:bg-gray-200 focus:bg-gray-300 focus:outline-none p-2 rounded-md rounded-lg shadow-md	mx-2 text-sm bg-gray-100';
                boton2.style.width = '50%'; // Cada botón ocupa el 50% del ancho
                botonesDiv.appendChild(boton2);
                boton2.addEventListener('click', () => {
                    this.registroPuntos = new Points();
                    this.registroPuntos.init(actividad.id , this.eventid);
                });
    
                actividadDiv.appendChild(botonesDiv);
    
                // Evento para mostrar/ocultar el menú desplegable al hacer clic en el icono de engranaje
                gearIcon.addEventListener('click', ()  => {
                    menuDiv.classList.toggle('hidden');
                });
    
                // Evento para ocultar el menú desplegable cuando se hace clic fuera de él
                document.addEventListener('click', (event) => {
                    if (!actividadDiv.contains(event.target)) {
                        menuDiv.classList.add('hidden');
                    }
                });
    
                this.actividadesDiv.appendChild(actividadDiv);
            });
        }
    }
    
    
    
    handleRequestError = error => {
        console.error(error);
    }

}
