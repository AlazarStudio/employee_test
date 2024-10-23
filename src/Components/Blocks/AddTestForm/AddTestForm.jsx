import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function AddTestForm() {
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [questionsList, setQuestionsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadQuestions = () => {
        setIsLoading(true);
        fetch('/questions.json', { cache: 'no-store' })
            .then((response) => response.json())
            .then((data) => {
                setQuestionsList(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке вопросов:', error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleAddQuestion = () => {
        if (question && option1 && option2 && option3 && correctAnswer) {
            const newQuestion = {
                id: Date.now(),
                question,
                options: [option1, option2, option3],
                correctAnswer
            };

            fetch('/addQuestions.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuestion),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'success') {
                        alert('Вопрос успешно добавлен!');
                        loadQuestions(); // Перезагружаем вопросы после добавления
                    } else {
                        alert('Ошибка при добавлении вопроса: ' + data.message);
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при добавлении вопроса:', error);
                });

            setQuestion('');
            setOption1('');
            setOption2('');
            setOption3('');
            setCorrectAnswer('');
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    };

    const handleDeleteQuestion = (id) => {
        const updatedQuestions = questionsList.filter((q) => q.id !== id);
        setQuestionsList(updatedQuestions);

        fetch('/updateQuestions.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuestions),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    alert('Вопрос успешно удален!');
                    loadQuestions(); // Перезагружаем вопросы после удаления
                } else {
                    alert('Ошибка при удалении вопроса: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Ошибка при удалении вопроса:', error);
            });
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Управление тестами
            </Typography>
            <TextField
                label="Вопрос"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Вариант 1"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Вариант 2"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Вариант 3"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Правильный ответ"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddQuestion}
                style={{ marginTop: '20px' }}
            >
                Добавить вопрос
            </Button>

            {isLoading ? (
                <Typography variant="body1" style={{ marginTop: '20px' }}>
                    Загрузка вопросов...
                </Typography>
            ) : (
                <List>
                    {questionsList.map((q) => (
                        <ListItem key={q.id}>
                            <ListItemText
                                primary={q.question}
                                secondary={`Варианты: ${q.options.join(', ')} | Правильный ответ: ${q.correctAnswer}`}
                            />
                            <IconButton edge="end" onClick={() => handleDeleteQuestion(q.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}

export default AddTestForm;
