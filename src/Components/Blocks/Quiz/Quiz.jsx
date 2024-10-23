import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import Results from '../Results/Results';

function Quiz({ employeeData }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeSpent, setTimeSpent] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        // Загружаем вопросы из JSON
        fetch('/questions.json')
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);

                // После загрузки вопросов, восстанавливаем сохраненное состояние
                const savedState = JSON.parse(localStorage.getItem('quizState'));
                if (savedState) {
                    setCurrentQuestionIndex(savedState.currentQuestionIndex || 0);
                    setAnswers(savedState.answers || {});
                    setTimeSpent(savedState.timeSpent || 0);
                    setShowResults(savedState.showResults || false);
                }
            });

        // Запускаем таймер, если тест не завершен
        if (!showResults) {
            timerRef.current = setInterval(() => {
                setTimeSpent((prevTime) => prevTime + 1);
            }, 1000);
        }

        // Очищаем таймер при размонтировании компонента или если тест завершен
        return () => clearInterval(timerRef.current);
    }, [showResults]);

    useEffect(() => {
        if (questions.length > 0) {
            // Сохраняем текущее состояние в localStorage при изменении состояния
            const quizState = {
                currentQuestionIndex,
                answers,
                timeSpent,
                showResults
            };
            localStorage.setItem('quizState', JSON.stringify(quizState));
        }
    }, [currentQuestionIndex, answers, timeSpent, showResults, questions]);

    const handleAnswerChange = (event) => {
        const newAnswers = { ...answers, [questions[currentQuestionIndex].id]: event.target.value };
        setAnswers(newAnswers);

        // Обновляем состояние в localStorage сразу после изменения ответа
        localStorage.setItem(
            'quizState',
            JSON.stringify({
                currentQuestionIndex,
                answers: newAnswers,
                timeSpent,
                showResults
            })
        );
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            clearInterval(timerRef.current); // Останавливаем таймер при завершении
            setShowResults(true);
            // Обновляем состояние в localStorage после завершения теста
            localStorage.setItem(
                'quizState',
                JSON.stringify({
                    currentQuestionIndex,
                    answers,
                    timeSpent,
                    showResults: true // Устанавливаем, что тест завершен
                })
            );
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (showResults) {
        return (
            <Results
                questions={questions}
                answers={answers}
                timeSpent={timeSpent}
                employeeData={employeeData}
            />
        );
    }

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Вопрос {currentQuestionIndex + 1} из {questions.length}
            </Typography>
            {currentQuestion && (
                <>
                    <Typography variant="h6">{currentQuestion.question}</Typography>
                    <RadioGroup value={answers[currentQuestion.id] || ''} onChange={handleAnswerChange}>
                        {currentQuestion.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option}
                                control={<Radio />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNextQuestion}
                        style={{ marginTop: '20px' }}
                    >
                        {currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
                    </Button>
                </>
            )}
            <Typography variant="body2" style={{ marginTop: '10px' }}>
                Время на тесте: {Math.floor(timeSpent / 60)} мин {timeSpent % 60} сек
            </Typography>
        </Container>
    );
}

export default Quiz;
