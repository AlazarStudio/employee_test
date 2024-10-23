<?php
// Устанавливаем заголовок для CORS, чтобы разрешить доступ с других доменов (например, с вашего фронтенда)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Читаем входящие данные JSON
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        // Имя файла для сохранения
        $file = 'results.json';

        // Читаем существующие данные из файла, если он существует
        $currentData = [];
        if (file_exists($file)) {
            $currentData = json_decode(file_get_contents($file), true);
        }

        // Добавляем новые результаты в массив
        $currentData[] = $data;

        // Сохраняем обновленные данные в JSON-файл
        if (file_put_contents($file, json_encode($currentData, JSON_PRETTY_PRINT))) {
            echo json_encode(['status' => 'success', 'message' => 'Результаты сохранены']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Ошибка при сохранении']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Некорректные данные']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неподдерживаемый метод']);
}
?>