<?php

if (isset($_GET['visitas'])) {
  $visitas = $_GET['visitas'];
  $data = array('visitas' => $visitas);
  $data_json = json_encode($data);

  $archivo = fopen("assets/js/contador.json", "w");
  fwrite($archivo, $data_json);
  fclose($archivo);
}

?>
