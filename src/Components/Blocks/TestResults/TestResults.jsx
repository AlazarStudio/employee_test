import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

function TestResults({ result, onBack }) {
    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Button onClick={onBack} variant="contained" style={{ marginBottom: '20px' }}>
                Назад к списку
            </Button>
            <Typography variant="h5" gutterBottom>
                Результаты для {result.employeeData.name}
            </Typography>
            <Typography variant="h6">
                Должность: {result.employeeData.position}
            </Typography>
            <Typography variant="h6">
                Отдел: {result.employeeData.department}
            </Typography>
            <Typography variant="h6">
                Время на тесте: {Math.floor(result.timeSpent / 60)} мин {result.timeSpent % 60} сек
            </Typography>
            <Typography variant="h6" style={{ marginTop: '10px' }}>
                Правильных ответов: {result.correctAnswersCount} из {result.totalQuestions}
            </Typography>
            <List>
                {result.answers.map((answer, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={answer.question}
                            secondary={`Ответ: ${answer.userAnswer} | Правильный ответ: ${answer.correctAnswer}`}
                            style={{ color: answer.isCorrect ? 'green' : 'red' }}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default TestResults;
