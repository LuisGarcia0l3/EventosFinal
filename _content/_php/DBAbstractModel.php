<?php

abstract class DBAbstractModel
{
    private static $db_host = 'localhost';
    private static $db_user = 'root';
    private static $db_pass = '#Jimenez#3#';

    protected $db_name = 'webappsoluciones';
    protected $query;
    protected $rows = array();

    private $conn;

    public function __construct()
    {
        $this->openConnection();
    }

    private function openConnection()
    {
        $this->conn = new mysqli(self::$db_host, self::$db_user, self::$db_pass, $this->db_name);

        if (mysqli_connect_errno()) {
            die('Error al conectar Mysql' . mysqli_connect_errno() . '---' . mysqli_connect_error());
        }

        $this->conn->set_charset('utf8');
        $this->conn->query("SET lc_time_names = 'es_MX'");
    }

    private function closeConnection()
    {
        $this->conn->close();
    }

   protected function executeSingleQuery()
{
    if (!$this->conn->query($this->query)) {
        throw new Exception('Error en la consulta: ' . $this->conn->errno . ' - ' . $this->conn->error);
    }
}

    protected function getResultsFromQuery()
{
    $result = $this->conn->query($this->query);

    if (!$result) {
        throw new Exception('Error en la consulta: ' . $this->conn->errno . ' - ' . $this->conn->error);
    }

    while ($row = $result->fetch_assoc()) {
        $this->rows[] = $row;
    }

    $result->close();
    
}


    public function __destruct()
    {
        $this->closeConnection();
    }

    abstract protected function get();
    abstract protected function set();
    abstract protected function edit();
    abstract protected function delete();
}
?>
