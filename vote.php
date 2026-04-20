<?php
header("Content-Type: application/json");

// Capture the POST data sent by JavaScript
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['candidate_id'])) {
    $id = $input['candidate_id'];
    $data = json_decode(file_get_contents('data.json'), true);
    
    // Logic to increment the vote count
    foreach ($data as &$item) {
        if ($item['id'] == $id) {
            $item['votes']++;
            break;
        }
    }
    
    // Save the updated counts back to the file
    file_put_contents('data.json', json_encode($data));
    echo json_encode(["success" => true, "message" => "Vote saved!"]);
}
?>