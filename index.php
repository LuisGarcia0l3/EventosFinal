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
        <a href="#" class="text-xl font-bold md:ml-4" onclick="handleMenuOptionClick('Eventos');">Soluciones de pago</a>

        <ul class="hidden md:flex space-x-4">
            <li id="menu-Eventos" class="menu-item"><a href="#" class="hover:text-gray-300">Eventos</a></li>
            <li id="menu-Equipos" class="menu-item"><a href="#" class="hover:text-gray-300">Equipos</a></li>
            <li id="menu-Puntos" class="menu-item"><a href="#" class="hover:text-gray-300">Puntos</a></li>
        </ul>

        <!-- Menú hamburguesa para dispositivos móviles -->
        <div class="md:hidden hidden">
            <button id="menu-toggle" class="text-white focus:outline-none ml-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    </div>
</nav>

<!-- Menú desplegable en dispositivos móviles -->
<div id="mobile-menu" class="md:hidden bg-gray-800 text-white hidden" style="z-index: 20;">
    <ul class="pb-2 px-8">
        <li id="mobile-menu-Eventos" class="mobile-menu-item py-2"><a href="#" class="hover:text-gray-300">Eventos</a></li>
        <li id="mobile-menu-Equipos" class="mobile-menu-item py-2"><a href="#" class="hover:text-gray-300">Equipos</a></li>
        <li id="mobile-menu-Puntos" class="mobile-menu-item py-2"><a href="#" class="hover:text-gray-300">Puntos</a></li>
    </ul>
</div>


    <main id="app-container" class=" pt-16">




    </main>





    <script src="./_content/_js/admin/HttpRequestService.js"></script>
    <script src="./_content/_js/admin/RegisterModule.js"></script>
    <script src="./_content/_js/admin/TeamsModule.js"></script>
    <script src="./_content/_js/admin/RegisterActivityModule.js"></script>
    <script src="./_content/_js/admin/EventsModule.js"></script>
    <script src="./_content/_js/admin/Modal.js"></script>
    <script src="./_content/_js/admin/ActivitiesModule.js"></script>


    <script src="./_content/_js/admin/app.js"></script>

</body>

</html>