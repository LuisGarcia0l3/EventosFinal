document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Agregar eventos de clic a cada opción del menú principal
document.getElementById('menu-Eventos').addEventListener('click', function () {
    handleMenuOptionClick('Eventos');
});

document.getElementById('menu-Equipos').addEventListener('click', function () {
    handleMenuOptionClick('Equipos');
});

document.getElementById('menu-Puntos').addEventListener('click', function () {
    handleMenuOptionClick('Puntos');
});

// Agregar eventos de clic a cada opción del menú de hamburguesa
document.getElementById('mobile-menu-Eventos').addEventListener('click', function () {
    handleMobileMenuOptionClick('Eventos');
});

document.getElementById('mobile-menu-Equipos').addEventListener('click', function () {
    handleMobileMenuOptionClick('Equipos');
});

document.getElementById('mobile-menu-Puntos').addEventListener('click', function () {
    handleMobileMenuOptionClick('Puntos');
});

// Función para manejar el clic en las opciones del menú principal
function handleMenuOptionClick(option) {
    // Limpiar el contenedor antes de cargar nueva información
    const contenedor = document.getElementById('app-container');
    contenedor.innerHTML = '';

    // Obtener todos los elementos de menú principal
    const menuItems = document.querySelectorAll('.menu-item');

    // Remover la clase 'active' de todos los elementos de menú principal
    menuItems.forEach((item) => {
        item.classList.remove('active');
    });

    // Agregar la clase 'active' al elemento de menú principal correspondiente
    const menuItem = document.getElementById(`menu-${option}`);
    menuItem.classList.add('active');

    // Agregar la clase 'active' al elemento de menú de hamburguesa correspondiente
    const mobileMenuItem = document.getElementById(`mobile-menu-${option}`);
    mobileMenuItem.classList.add('active');

    // Instanciar la clase correspondiente y cargar información en el contenedor
    handleModule(option, contenedor);
}

// Función para manejar el clic en las opciones del menú de hamburguesa
function handleMobileMenuOptionClick(option) {
    // Limpiar el contenedor antes de cargar nueva información
    const contenedor = document.getElementById('app-container');
    contenedor.innerHTML = '';

    // Obtener todos los elementos de menú de hamburguesa
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

    // Remover la clase 'active' de todos los elementos de menú de hamburguesa
    mobileMenuItems.forEach((item) => {
        item.classList.remove('active');
    });

    // Agregar la clase 'active' al elemento de menú de hamburguesa correspondiente
    const mobileMenuItem = document.getElementById(`mobile-menu-${option}`);
    mobileMenuItem.classList.add('active');

    // Instanciar la clase correspondiente y cargar información en el contenedor
    handleModule(option, contenedor);
}

// Función para cargar la información correspondiente en el contenedor
function handleModule(option, contenedor) {
    let module;
    switch (option) {
        case 'Eventos':
            module = new EventsModule();
            break;
        case 'Equipos':
            module = new TeamsModule();
            break;
        case 'Puntos':
            break;
    }

    // Llamar a la función que pinta la información en el contenedor
    if (module) {
        module.init(contenedor);
    }
}


// Establecer la opción "Eventos" como predeterminada al cargar la página
handleMenuOptionClick('Eventos');
