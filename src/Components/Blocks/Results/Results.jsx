import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function Results({ questions, answers, timeSpent, employeeData }) {
    const correctAnswersCount = questions.filter(
        (question) => question.correctAnswer === answers[question.id]
    ).length;
    const totalQuestions = questions.length;
    const incorrectAnswersCount = totalQuestions - correctAnswersCount;
    const successRate = ((correctAnswersCount / totalQuestions) * 100).toFixed(2);

    const getAnswerColor = (question, answer) => {
        return question.correctAnswer === answer ? 'green' : 'red';
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Итоги тестирования
            </Typography>
            <Typography variant="h6">
                ФИО: {employeeData.name}
            </Typography>
            <Typography variant="h6">
                Должность: {employeeData.position}
            </Typography>
            <Typography variant="h6">
                Отдел: {employeeData.department}
            </Typography>
            <Typography variant="h6" style={{ marginTop: '10px' }}>
                Время на тесте: {Math.floor(timeSpent / 60)} мин {timeSpent % 60} сек
            </Typography>
            <Typography variant="h6" style={{ marginTop: '10px', color: successRate >= 50 ? 'green' : 'red' }}>
                Правильных ответов: {correctAnswersCount} из {totalQuestions} ({successRate}%)
            </Typography>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Неправильных ответов: {incorrectAnswersCount}
            </Typography>
            <List>
                {questions.map((question) => (
                    <ListItem key={question.id}>
                        <ListItemText
                            primary={question.question}
                            secondary={`Ваш ответ: ${answers[question.id] || 'Нет ответа'}`}
                            style={{ color: getAnswerColor(question, answers[question.id]) }}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Results;
