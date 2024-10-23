import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import TestResults from '../TestResults/TestResults';
import AddTestForm from '../AddTestForm/AddTestForm'; // Импортируем форму для добавления тестов

function AdminPanel() {
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAddTestForm, setShowAddTestForm] = useState(false);

    useEffect(() => {
        const savedAuth = localStorage.getItem('isAuthenticated');
        if (savedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/results.json')
                .then((response) => response.json())
                .then((data) => setResults(data))
                .catch((error) => console.error('Ошибка при загрузке результатов:', error));
        }
    }, [isAuthenticated]);

    const handleLogin = () => {
        if (username === 'admin' && password === 'Xj7!qK4m') {
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

    const toggleAddTestForm = () => {
        setShowAddTestForm((prev) => !prev);
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
            <Button
                onClick={toggleAddTestForm}
                variant="contained"
                style={{ marginBottom: '20px', marginLeft: '10px' }}
            >
                {showAddTestForm ? 'Скрыть форму добавления тестов' : 'Добавить новый тест'}
            </Button>
            {showAddTestForm ? (
                <AddTestForm />
            ) : selectedResult ? (
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
