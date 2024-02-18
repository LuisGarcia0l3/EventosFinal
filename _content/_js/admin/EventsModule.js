class EventsModule {

    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container = document.getElementById('app-container');
        this.URL = './_content/_php/controllerAdmin.php';
        this.infoUserContainer = document.getElementById('info_user');
        this.activities = new Activities();
    }

    init() {   
        this.PantallaInicio()
        this.get_allevents()
        this.eventosDiv = document.getElementById('Eventos');
        this.modal = new Modal();
    }


    PantallaInicio() {
        const container = document.createElement('div');
        container.className = 'p-4';
    
        const title = document.createElement('h2');
        title.textContent = 'Eventos';
        title.className = 'text-2xl font-bold';
    
        const searchDiv = document.createElement('div');
        searchDiv.className = 'flex items-center my-6';
    
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar';
        searchInput.className = 'flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500';
    
        const searchButton = document.createElement('button');
        searchButton.className = 'bg-gray-300 rounded-r-lg py-2 px-4 focus:outline-none';
        const searchIcon = document.createElement('svg');
        searchIcon.setAttribute('class', 'w-5 h-5 text-gray-600');
        searchButton.appendChild(searchIcon);
    
        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton);
    
        container.appendChild(title);
        container.appendChild(searchDiv);
    
        const eventosDiv = document.createElement('div');
        eventosDiv.id = 'Eventos';
        eventosDiv.className = 'mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        container.appendChild(eventosDiv);
    
        const addButton = document.createElement('button');
addButton.id = 'btn-AddEvent';
addButton.textContent = '+';
addButton.className = 'btn-AddEvent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md absolute bottom-4 right-4';
container.appendChild(addButton);
addButton.addEventListener('click', () => {
    this.modal.open({
        title: 'A                    gregar Evento',
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
                
                <div class="mb-4">
                    <label for="centro" class="block text-gray-700 text-sm font-bold mb-2">Centro:</label>
                    <select id="centro" name="centro" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="centro1">Pachuca</option>
                        <option value="centro2">Centro 2</option>
</select>
                </div>
                
            </form>
        `,
        buttons: [
            { label: 'Aceptar', action: () => { console.log('Aceptar clicado'); } },
            { label: 'Cancelar', action: () => { this.modal.close() } }
        ],
        modalClass: 'mi-clase-modal',
        contentClass: 'mi-clase-contenido'
    });
});

        this.container.appendChild(container);
    }

    get_allevents() {
        let data_post = {
            action: 'handlerGetAllEvents'
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            method: 'POST',
            data: data_post,
            successCallback: this.handlerGetAllEvents.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }

    handlerGetAllEvents(data) {
        if (data.success) {
            const eventos = data.data.datos;
            eventos.forEach(evento => {
                const divTarjeta = document.createElement('div');
                divTarjeta.className = 'bg-white rounded-lg shadow-lg p-4 mb-4'; // Añadido espacio alrededor de las tarjetas
                divTarjeta.setAttribute('data-id', evento.id);
                //divTarjeta.addEventListener('click',); // Agregar event listener para clic
                divTarjeta.addEventListener('click', () => {this.activities.init(evento.id)});

                const titulo = document.createElement('h3');
                titulo.className = 'text-xl font-bold mb-4';
                titulo.textContent = evento.Nombres;
                divTarjeta.appendChild(titulo);
                
                const ubicacion = document.createElement('span');
                ubicacion.textContent = `Ubicación: ${evento.ubicacion}`;
                divTarjeta.appendChild(ubicacion);
              
                const fechaInicio = document.createElement('div');
                fechaInicio.className = 'flex items-center mt-2';
                const labelInicio = document.createElement('span');
                labelInicio.className = 'font-bold mr-2';
                labelInicio.textContent = 'Fecha inicio:';
                fechaInicio.appendChild(labelInicio);
                const spanInicio = document.createElement('span');
                spanInicio.textContent = evento.FechaI;
                fechaInicio.appendChild(spanInicio);
                divTarjeta.appendChild(fechaInicio);
                
                const fechaFin = document.createElement('div');
                fechaFin.className = 'flex items-center';
                const labelFin = document.createElement('span');
                labelFin.className = 'font-bold mr-2';
                labelFin.textContent = 'Fecha fin:';
                fechaFin.appendChild(labelFin);
                const spanFin = document.createElement('span');
                spanFin.textContent = evento.FechaF;
                fechaFin.appendChild(spanFin);
                divTarjeta.appendChild(fechaFin);
              
                this.eventosDiv.appendChild(divTarjeta); // Añadir la tarjeta al cuerpo del documento (puedes cambiar esto según donde quieras agregar las tarjetas)
            });
        }
    }
    

    handleRequestError = error => {
        console.error(error)
    }


}

