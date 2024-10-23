<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка декодирования JSON: ' . json_last_error_msg()]);
        exit;
    }

    // Проверка на пустой массив данных
    if ($data === null) {
        $data = [];
    }

    $file = 'questions.json';

    // Сохраняем данные (пустой массив также сохранится)
    if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(['status' => 'success', 'message' => 'Вопросы обновлены']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка при сохранении']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неподдерживаемый метод']);
}
?>