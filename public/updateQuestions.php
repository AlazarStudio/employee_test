<?php
// Устанавливаем заголовок для CORS, чтобы разрешить доступ с других доменов (например, с вашего фронтенда)
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

    if (!empty($data)) {
        $file = 'questions.json';

        // Перезаписываем файл новыми данными
        if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
            echo json_encode(['status' => 'success', 'message' => 'Вопросы обновлены']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Ошибка при сохранении']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Некорректные или пустые данные']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неподдерживаемый метод']);
}
?>