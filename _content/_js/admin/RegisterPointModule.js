class Points {
    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container = document.getElementById('app-container');
        this.URL = './_content/_php/controllerAdmin.php';
        this.actividadid = null;
        this.eventid = null;

    }

    init(actividadid, eventid) {
        this.actividadid = actividadid;
        this.eventid = eventid;
        this.container.innerHTML = '';
        this.modal = new Modal();
        this.PantallaInicio();
        this.pointsDiv = document.getElementById('RegistroPuntos');

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
        backButton.className = 'text-black font-bold py-2 px-4 rounded-full shadow-md';
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

        const searchButton = document.createElement('button');
        searchButton.className = 'bg-gray-300 rounded-r-lg py-2 px-4 focus:outline-none h-full'; // Agrega la clase h-full para que tenga la misma altura que el input


        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchButton); // Agrega el botón de búsqueda al contenedor de búsqueda

        container.appendChild(searchDiv);

        const pointsDiv = document.createElement('div');
        pointsDiv.id = 'RegistroPuntos';
        pointsDiv.className = 'mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        container.appendChild(pointsDiv);

        const addButton = document.createElement('button');
        addButton.id = 'btn-AddRegisterPoints';
        addButton.textContent = '+';
        addButton.className = 'btn-AddEvent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md absolute bottom-4 right-4';
        container.appendChild(addButton);

        this.container.appendChild(container);
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
            errorCallback: this.handleRequestError
        });
    }

    handlerGetAllPoints(data) {
        if (data.success) {
            const datos = data.data.datos;
            const pointsDiv = document.getElementById('RegistroPuntos');

            // Limpiar el contenido actual del contenedor
            pointsDiv.innerHTML = '';

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

                const totalPuntos = document.createElement('p');
                totalPuntos.textContent = `Punto asignado: ${dato.total_puntos}`;

                const descripcion = document.createElement('p');
                descripcion.textContent = `Descripción: ${dato.descripcion}`;

                [username, nombre, totalPuntos,descripcion].forEach(elem => {
                    contentDiv.appendChild(elem);
                });
                card.appendChild(contentDiv);
                if (dato.total_puntos == 0) {
                    // Crear el contenedor principal
                    const container = document.createElement('div');
                    container.classList.add('border', 'border-gray-300', 'rounded-md', 'flex', 'flex-col', 'items-center'); // Agregar 'flex' para usar flexbox
                    container.style.width = '70%'; // Establecer el ancho al 100%
                    // Crear el contenedor del título
                    const titleContainer = document.createElement('div');
                    titleContainer.classList.add('mb-2'); // Agregar margen inferior
                    // Crear el título
                    const title = document.createElement('h3');
                    title.textContent = 'Registrar Puntos';
                    title.classList.add('text-lg', 'font-bold');
                    // Agregar el título al contenedor del título
                    titleContainer.appendChild(title);
                    // Agregar el contenedor del título al contenedor principal
                    container.appendChild(titleContainer);

                    // Crear el primer contenedor horizontal
                    const firstContainer = document.createElement('div');
                    firstContainer.classList.add('flex', 'items-center', 'mb-2'); // Agregar margen inferior

                    // Crear el texto para el primer contenedor
                    const text1 = document.createElement('p');
                    text1.textContent = 'Texto 1';

                    // Crear el botón para el primer contenedor
                    const button1 = document.createElement('button');
                    button1.textContent = '1';
                    button1.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'ml-2');

                    // Agregar el texto y el botón al primer contenedor
                    firstContainer.appendChild(text1);
                    firstContainer.appendChild(button1);

                    // Agregar el primer contenedor al contenedor principal
                    container.appendChild(firstContainer);

                    // Crear el segundo contenedor horizontal
                    const secondContainer = document.createElement('div');
                    secondContainer.classList.add('flex', 'items-center'); // No se necesita margen inferior

                    // Crear el texto para el segundo contenedor
                    const text2 = document.createElement('p');
                    text2.textContent = 'Texto 2';

                    // Crear el botón para el segundo contenedor
                    const button2 = document.createElement('button');
                    button2.textContent = '2';
                    button2.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'ml-2');

                    // Agregar el texto y el botón al segundo contenedor
                    secondContainer.appendChild(text2);
                    secondContainer.appendChild(button2);

                    // Agregar el segundo contenedor al contenedor principal
                    container.appendChild(secondContainer);

                    // Agregar el contenedor principal a la tarjeta
                    card.appendChild(container);
                }



                // Agregar el div de contenido y el botón a la tarjeta
                pointsDiv.appendChild(card);
            });
        } else {
            console.log('Error al obtener los puntos');
        }
    }


    add_points() {
        let data_post = {
            actividadid: this.actividadid,
            action: 'handlerAddPoints'
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            data: data_post,
            method: 'POST',
            successCallback: this.handlerAddPoints.bind(this),
            errorCallback: this.handleRequestError
        });
    }


    handlerAddPoints(data) {
        if (data.success) {
            console.log('Puntos registrados');
        } else {
            console.log('Error al registrar los puntos');
        }
    }



    handleRequestError = error => {
        console.error(error);
    }

}