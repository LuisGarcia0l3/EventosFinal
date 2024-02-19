<?php
require_once 'modelAdmin.php';

class ControllerAdmin
{
    // Variable privada que almacena una instancia del modelo asociado al controlador
    private $model;

    // Constructor de la clase Controller
    public function __construct()
    {
        // Inicializa la variable $model con una nueva instancia de la clase Model
        $this->model = new ModelAdmin();
    }

/*********************** Función principal para manejar las solicitudes ***********************/
    
    public function handleRequest($data_post)
    {
        $event = isset($data_post['action']) ? $data_post['action'] : '';

        switch ($event) {
            case 'handlerGetAllEvents':
                $this->handlerGetAllEvents($data_post);
                break;
            case 'handlerGetAllActivities':
                $this->handlerGetAllActivities($data_post);
                break;
           
                case 'handlerGetAllPoints':
                    $this->handlerGetAllPoints($data_post);
                    break;
            case 'handlerGetAllAsistence':
                $this->handlerGetAllAsistence($data_post);
                break;

            case 'handlerAddEvents':
                $this->handlerAddEvents($data_post);
                break;
          
            case 'handlerAddActivity':
                $this->handlerAddActivity($data_post);
                break;  
            default:
                break;
                
        }
    }

/**************************************** Manejadores ****************************************/

    private function handlerGetAllEvents($data_post)
    {

        $this->model->handlerGetAllEvents();
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }


    private function handlerGetAllActivities($data_post)
    {
        $eventid = isset($data_post['eventid']) ? $data_post['eventid'] : '';

        $this->model->handlerGetAllActivities($eventid);
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }

    private function handlerGetAllPoints($data_post)
    {
        $actividadid = isset($data_post['actividadid']) ? $data_post['actividadid'] : '';

        $this->model->handlerGetAllPoints($actividadid);
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }
    
    private function handlerGetAllAsistence($data_post)
    {
        $actividadid = isset($data_post['actividadid']) ? $data_post['actividadid'] : '';

        $this->model->handlerGetAllAsistence($actividadid);
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }

    private function handlerAddEvents($data_post)
    {
        $eventData = isset($data_post['eventData']) ? $data_post['eventData'] : '';
        $this->model->handlerAddEvents($eventData);
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }

    private function handlerAddActivity($data_post)
    {
        $activityData = isset($data_post['activityData']) ? $data_post['activityData'] : '';
        $eventid = isset($data_post['eventid']) ? $data_post['eventid'] : '';
        $this->model->handlerAddActivity($activityData, $eventid);
        $data = $this->createResponseData();
        
        echo json_encode($data);
    }
/**************************************** Respuesta ****************************************/

     // Crea y devuelve los datos de respuesta comunes a todas las funciones
     private function createResponseData()
        {
            return array(
                'success' => $this->model->success,
                'data' => array(
                    'message' => $this->model->mensaje,
                    'datos' => $this->model->datos
                )
            );
        }
}


// Obtiene los datos del cuerpo de la solicitud y maneja la solicitud si es un array
$data_post = json_decode(file_get_contents('php://input'), true);
if (is_array($data_post)) {
    $controller = new ControllerAdmin();
    $controller->handleRequest($data_post);
}
?>
