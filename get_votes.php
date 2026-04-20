<?php
header("Content-Type: application/json");
// Read the data from the JSON file
$json_data = file_get_contents('data.json');
echo $json_data; // Return the JSON data to the frontend [cite: 18, 30]
?>