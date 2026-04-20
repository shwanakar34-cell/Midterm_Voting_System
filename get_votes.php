<?php
header("Content-Type: application/json");

$json_data = file_get_contents('data.json');
echo $json_data; 
?>