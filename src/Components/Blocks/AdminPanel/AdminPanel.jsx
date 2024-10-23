import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import TestResults from '../TestResults/TestResults';

function AdminPanel() {
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Проверка сохраненной авторизации
        const savedAuth = localStorage.getItem('isAuthenticated');
        if (savedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            // Загружаем данные из results.json только после авторизации
            fetch('/results.json')
                .then((response) => response.json())
                .then((data) => setResults(data))
                .catch((error) => console.error('Ошибка при загрузке результатов:', error));
        }
    }, [isAuthenticated]);

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
        } else {
            alert('Неверный логин или пароль');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    const handleResultClick = (result) => {
        setSelectedResult(result);
    };

    const handleBackToList = () => {
        setSelectedResult(null);
    };

    if (!isAuthenticated) {
        return (
            <Container maxWidth="sm" style={{ marginTop: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Вход в админ-панель
                </Typography>
                <TextField
                    label="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    style={{ marginTop: '20px' }}
                >
                    Войти
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Админ-панель: Результаты тестирования
            </Typography>
            <Button onClick={handleLogout} variant="contained" style={{ marginBottom: '20px' }}>
                Выйти
            </Button>
            {selectedResult ? (
                <TestResults result={selectedResult} onBack={handleBackToList} />
            ) : (
                <List>
                    {results.map((result, index) => (
                        <ListItem
                            key={index}
                            button
                            onClick={() => handleResultClick(result)}
                        >
                            <ListItemText
                                primary={`${result.employeeData.name} - ${result.employeeData.position}`}
                                secondary={`Дата: ${new Date(result.timestamp).toLocaleString()}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}

export default AdminPanel;
