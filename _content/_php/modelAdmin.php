
<?php

require_once 'DBAbstractModel.php';

class ModelAdmin extends DBAbstractModel
{
    public $success;
    public $mensaje;
    public $datos;


    public function handlerAddEvents($eventData)
    {
        try {
            $this->query = "INSERT INTO Evento (Nombres, FechaI, FechaF, ubicacion, centro_id) VALUES ('$eventData[titulo]', '$eventData[fechaInicio]', '$eventData[fechaFinal]', '$eventData[lugar]', '$eventData[centro]');";
            $this->executeSingleQuery();
            $this->success = true;
            $this->mensaje = 'Se ha agregado el evento correctamente.' . $this->query;
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error en la consulta: ' . $e->getMessage() . $this->query;
        }
    }

    public function handlerAddActivity($activityData, $eventid)
    {
        try {
            $this->query = "INSERT INTO Actividad (Nombre, FechaI, FechaF, evento_id) VALUES ('$activityData[titulo]', '$activityData[fechaInicio]', '$activityData[fechaFinal]','$eventid');";
            $this->executeSingleQuery();
            $this->success = true;
            $this->mensaje = 'Se ha agregado la actividad correctamente.' . $this->query;
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error en la consulta: ' . $e->getMessage() . $this->query;
        }
    }

    public function handlerGetAllEvents()
    {
        try {
            $this->query = "SELECT * FROM Evento "; // Tu consulta aquí


            $this->getResultsFromQuery();
            $this->datos = $this->rows;
            if (count($this->rows) >= 1) {

                $this->success = true;
                $this->mensaje = 'Se han encontrado resultados.' . $this->query;
            } else {
                $this->success = false;
                $this->mensaje = 'No se encontró ningún resultado.' . $this->query;
            }
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function handlerGetAllActivities($evento_id)
    {
        try {
            $this->query = "SELECT A.*, 
            (SELECT COUNT(*) FROM Asistencia AS AST WHERE AST.actividad_id = A.id) AS Participantes
                FROM Actividad AS A
                WHERE A.evento_id = '$evento_id';
                "; // Tu consulta aquí

            $this->getResultsFromQuery();
            $this->datos = $this->rows;
            if (count($this->rows) >= 1) {

                $this->success = true;
                $this->mensaje = 'Se han encontrado resultados.' . $this->query;
            } else {
                $this->success = false;
                $this->mensaje = 'No se encontró ningún resultado.' . $this->query;
            }
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error en la consulta: ' . $e->getMessage();
        }
    }

    public function handlerGetAllPoints($actividadid)
    {
        try {
            $this->query = "SELECT 
            U.username,
            U.nombre,
            U.apaterno,
            U.amaterno,
            P.descripcion,
            COALESCE(SUM(P.Puntos), 0) AS total_puntos
        FROM 
            Usuario U
        LEFT JOIN 
            UsuarioPunto UP ON U.username = UP.username
        LEFT JOIN 
            Punto P ON UP.punto_id = P.id
        JOIN 
            Asistencia A ON U.username = A.username_id
        WHERE 
            A.actividad_id = '$actividadid' 
        GROUP BY 
            U.username, U.nombre, U.apaterno, U.amaterno, P.descripcion;         ";

            $this->getResultsFromQuery();
            $this->datos = $this->rows;
            if (count($this->rows) >= 1) {

                $this->success = true;
                $this->mensaje = 'Se han encontrado resultados.' . $this->query;
            } else {
                $this->success = false;
                $this->mensaje = 'No se encontró ningún resultado.' . $this->query;
            }
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error en la consulta: ' . $e->getMessage();
        }
    }


    public function handlerGetAllAsistence($actividadid)
    {
        try {
            $this->query = "SELECT 
            U.username,
            U.nombre,
            U.apaterno,
            U.amaterno
        FROM 
            Usuario U
        LEFT JOIN 
            UsuarioPunto UP ON U.username = UP.username
        JOIN 
            Asistencia A ON U.username = A.username_id
        WHERE 
            A.actividad_id = '$actividadid' 
        GROUP BY 
            U.username, U.nombre, U.apaterno, U.amaterno       ";


            $this->getResultsFromQuery();
            $this->datos = $this->rows;
            if (count($this->rows) >= 1) {

                $this->success = true;
                $this->mensaje = 'Se han encontrado resultados.' . $this->query;
            } else {
                $this->success = false;
                $this->mensaje = 'No se encontró ningún resultado.' . $this->query;
            }
        } catch (Exception $e) {
            $this->success = false;
            $this->mensaje = 'Error en la consulta: ' . $e->getMessage();
        }
    }
    // Resto de los métodos abstractos de la clase padre


    // Implementación de los métodos abstractos
    public function get()
    {
        // Implementación del método get
    }

    public function set()
    {
        // Implementación del método set
    }

    public function edit()
    {
        // Implementación del método edit
    }

    public function delete()
    {
        // Implementación del método delete
    }



    public function __construct()
    {
        parent::__construct();
    }
}
?>
