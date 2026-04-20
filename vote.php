<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$candidate_id = $data['candidate_id'];

$json_data = file_get_contents('data.json');
$items = json_decode($json_data, true);

foreach ($items as &$item) {
    if ($item['id'] == $candidate_id) {
        
        if ($item['votes'] < $item['max_votes']) {
            $item['votes']++;
            file_put_contents('data.json', json_encode($items));
            echo json_encode(["status" => "success"]);
            exit;
        } else {
            echo json_encode(["status" => "error", "message" => "This course is full!"]);
            exit;
        }
    }
}
?>