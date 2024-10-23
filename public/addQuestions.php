<?php
// Устанавливаем заголовок для CORS, чтобы разрешить доступ с других доменов (например, с вашего фронтенда)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $newQuestion = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка декодирования JSON: ' . json_last_error_msg()]);
        exit;
    }

    if (!empty($newQuestion)) {
        $file = 'questions.json';

        // Читаем существующие данные из файла
        $currentData = [];
        if (file_exists($file)) {
            $currentData = json_decode(file_get_contents($file), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                echo json_encode(['status' => 'error', 'message' => 'Ошибка декодирования существующего JSON: ' . json_last_error_msg()]);
                exit;
            }
        }

        // Добавляем новый вопрос к существующим
        $currentData[] = $newQuestion;

        // Сохраняем обновленные данные в JSON-файл
        if (file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT))) {
            echo json_encode(['status' => 'success', 'message' => 'Вопрос добавлен']);
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