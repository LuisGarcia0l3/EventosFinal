class RegistroAsitencia {
    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container;
        this.actividadid;
        this.URL = './_content/_php/controllerAdmin.php';
        
    }

    init(container,actividadid) {
        this.container = container;
        this.actividadid = actividadid;
        this.container.innerHTML = '';  
        this.PantallaInicio();
        console.log(container,actividadid);
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
            this.activities = new Activities();
            this.container.innerHTML = '';
            this.activities.init(this.container);
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
        
        const asistenciaDiv = document.createElement('div');
        asistenciaDiv.id = 'Registro de asistencia';
        asistenciaDiv.className = 'mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        container.appendChild(asistenciaDiv);
        
        const addButton = document.createElement('button');
        addButton.id = 'btn-AddRegisterAsistence';
        addButton.textContent = '+';
        addButton.className = 'btn-AddEvent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md absolute bottom-4 right-4';
        container.appendChild(addButton);
        
        this.container.appendChild(container);
    }
    
}