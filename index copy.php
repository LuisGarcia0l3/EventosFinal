<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Soluciones</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="./_content/_css/stylesadmin.css" rel="stylesheet">
</head>

<body class="bg-gray-100">

<nav class="bg-gray-800 text-white fixed w-full z-10">
    <div class="container mx-auto flex justify-between px-8 items-center py-4">

        <!-- Logo con margen izquierdo en dispositivos móviles -->
        <a href="#" class="text-xl font-bold md:ml-4">Soluciones de pago</a>

        <!-- Menú de navegación -->
        <ul class="hidden md:flex space-x-4">
            <li id="menu-Eventos" class="menu-item"><a href="#" class="hover:text-gray-300">Eventos</a></li>
            <li id="menu-Equipos" class="menu-item"><a href="#" class="hover:text-gray-300">Equipos</a></li>
            <li id="menu-Puntos" class="menu-item"><a href="#" class="hover:text-gray-300">Puntos</a></li>
        </ul>

        <!-- Menú hamburguesa para dispositivos móviles -->
        <div class="md:hidden">
            <button id="menu-toggle" class="text-white focus:outline-none ml-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    </div>
</nav>

<!-- Menú desplegable en dispositivos móviles -->
<div id="mobile-menu" class="md:hidden bg-gray-800 text-white hidden">
    <ul class="pb-2 px-8">
        <li id="mobile-menu-Eventos" class="mobile-menu-item py-2"><a href="#" class="hover:text-gray-300">Eventos</a></li>
        <li id="mobile-menu-Equipos" class="mobile-menu-item py-2"><a href="#" class="hover:text-gray-300">Equipos</a></li>
        <li id="mobile-menu-Puntos" class="mobile-menu-item py-2"><a href="#" class="hover:text-gray-300">Puntos</a></li>
    </ul>
</div>

    <main id="app-container">




    </main>
    <div class="p-4 pt-16">
        <div class="pt-6">
            <h2 class="text-2xl font-bold">Eventos</h2>
        </div>
        <div class="flex items-center my-6">
            <input type="text" placeholder="Buscar" class="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button class="bg-gray-300 rounded-r-lg py-2 px-4 focus:outline-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm9.7 4.3l-4.1-4.1a6 6 0 1 0-1.4 1.4l4.1 4.1a1 1 0 0 0 1.4-1.4z"></path>
                </svg>
            </button>
        </div>


        <div id="Eventos" class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> <!-- Aumentamos el espacio entre las tarjetas -->
           
        </div>
        <!-- Botón para agregar evento -->
        <button id="btn-AddEvent" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md absolute bottom-4 right-4"> <!-- Ajustamos la posición del botón -->
            +
        </button>
    </div>






    <script src="./_content/_js/admin/HttpRequestService.js"></script>
    <script src="./_content/_js/admin/RegisterModule.js"></script>
    <script src="./_content/_js/admin/TeamsModule.js"></script>
    <script src="./_content/_js/admin/EventsModule.js"></script>
    <script src="./_content/_js/admin/Modal.js"></script>


    <script src="./_content/_js/admin/app.js"></script>

</body>

</html>