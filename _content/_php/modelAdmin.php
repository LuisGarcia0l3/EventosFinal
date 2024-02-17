
<?php

require_once 'DBAbstractModel.php';

class ModelAdmin extends DBAbstractModel
{
    public $success;
    public $mensaje;
    public $datos;

    public function handlerGetAllEvents()
        {
        try {
            $this->query = "SELECT * FROM Evento "; // Tu consulta aquí


            $this->getResultsFromQuery();
            $this->datos = $this->rows;
            if (count($this->rows) >= 1) {

                $this->success = true;
                $this->mensaje = 'Se han encontrado resultados.'.$this->query;
            } else {
                $this->success = false;
                $this->mensaje = 'No se encontró ningún resultado.'. $this->query;
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
                $this->mensaje = 'Se han encontrado resultados.'.$this->query;
            } else {
                $this->success = false;
                $this->mensaje = 'No se encontró ningún resultado.'. $this->query;
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
