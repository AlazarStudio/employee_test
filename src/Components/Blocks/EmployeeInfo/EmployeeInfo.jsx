import React, { useState } from 'react';
import classes from './EmployeeInfo.module.css';
import { Container, TextField, Button, Typography } from '@mui/material';

function EmployeeInfo({ onSubmit }) {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = () => {
        if (name && position && department) {
            const employeeData = {
                name,
                position,
                department,
            };
            onSubmit(employeeData);
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Ввод данных сотрудника
            </Typography>
            <TextField
                label="ФИО"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Должность"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Отдел"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                Начать тест
            </Button>
        </Container>
    );
}

export default EmployeeInfo;
